import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/utils/api";
import type { User } from "@/types";

const TOKEN_KEY = "auth_token";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;

  premium?: boolean | null;
  premiumStartDate?: string | null;
  premiumEndDate?: string | null;

  login: (identifier: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
  }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

type PremiumData = {
  status: string;
  startDate?: string;
  endDate?: string;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null,

        login: async (identifier, password) => {
          set({ isLoading: true, error: null });

          try {
            const response = await api.post("/identity/auth/token", {
              username: identifier,
              password,
            });

            const data = response.data as { result: { token: string } };
            const token = data.result.token;
            console.log("Token received:", token);

            localStorage.setItem(TOKEN_KEY, token);

            set({
              token,
              isAuthenticated: true,
            });

            // const anonymousId = localStorage.getItem("anonymousId");
            // if (anonymousId) {
            //   try {
            //     await api.post(
            //       "/identity/api/history/merge",
            //       { anonymousId },
            //       {
            //         headers: {
            //           Authorization: `Bearer ${token}`,
            //         },
            //       }
            //     );
            //     // Xóa anonymousId sau khi merge thành công
            //     localStorage.removeItem("anonymousId");
            //     document.cookie = "anonymousId=; Max-Age=0; path=/";
            //     console.log("Merged anonymous history into user account");
            //   } catch (err) {
            //     console.warn("Failed to merge anonymous history", err);
            //   }
            //   console.log("Anonymous ID found:", anonymousId);
            // }

            // Fetch user data
            const userResponse = await api.get("/identity/users/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const userData = (userResponse.data as any).result;

            const user: User = {
              id: userData.id,
              name: userData.lastName
                ? `${userData.firstName} ${userData.lastName}`.trim()
                : userData.firstName,
              email: userData.username,
              avatar:
                userData.avatar ||
                `https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png`,
              playlists: userData.playlists,
              premium: userData.premium ?? false,
            };

            set({ user });

            const premiumRes = await api.get("/identity/user-premium/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const premiumData = premiumRes.data as PremiumData;

            const isPremium = !!(
              premiumData &&
              premiumData.status === "SUCCESS" &&
              premiumData.endDate &&
              new Date(premiumData.endDate) > new Date()
            );

            set((state: any) => ({
              user: state.user,
              premium: isPremium,
              premiumStartDate: premiumData?.startDate ?? null,
              premiumEndDate: premiumData?.endDate ?? null,
              isLoading: false,
            }));
          } catch (error: any) {
            let message = "Đăng nhập không thành công";
            if (error.response?.status === 401) {
              message = "Sai tên đăng nhập hoặc mật khẩu";
            } else if (error.response?.data?.message) {
              message = error.response.data.message;
            }

            set({
              error: message,
              isLoading: false,
            });
            throw new Error(message);
          }
        },

        register: async ({ username, password, firstName, lastName, dob }) => {
          set({ isLoading: true, error: null });
          try {
            await api.post("identity/users", {
              username,
              password,
              firstName,
              lastName,
              dob,
            });

            await useAuthStore.getState().login(username, password);
            set({ isLoading: false });
          } catch (error: any) {
            let message = "Registration failed";
            if (error.response?.data?.message) {
              message = error.response.data.message;
            }

            set({
              error: message,
              isLoading: false,
            });
            throw new Error(message);
          }
        },

        logout: async () => {
          try {
            const token = useAuthStore.getState().token;

            if (token) {
              await api.post("/identity/auth/logout", { token });
            }

            localStorage.removeItem(TOKEN_KEY);

            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              premium: null,
              premiumStartDate: null,
              premiumEndDate: null,
            });
          } catch (error) {
            console.error("Logout failed:", error);

            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              premium: null,
              premiumStartDate: null,
              premiumEndDate: null,
            });
          }
        },

        setUser: (user) => set(() => ({ user, isAuthenticated: true })),
        setToken: (token) => {
          // localStorage.setItem(TOKEN_KEY, token)
          set(() => ({ token }));
        },
        clearUser: () => {
          // localStorage.removeItem(TOKEN_KEY)
          set(() => ({
            user: null,
            token: null,
            isAuthenticated: false,
          }));
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          premium: state.premium,
          premiumStartDate: state.premiumStartDate,
          premiumEndDate: state.premiumEndDate,
        }),
      }
    ),
    { name: "auth-store" }
  )
);
