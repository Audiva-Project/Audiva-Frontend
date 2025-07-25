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
  logout: () => Promise<void>;

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
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        token: null,

        login: async (identifier, password) => {
          set({ isLoading: true, error: null });

          try {
            const response = await api.post("/auth/token", {
              username: identifier,
              password,
            });

            const data = response.data as { result: { token: string } };
            const token = data.result.token;

            localStorage.setItem(TOKEN_KEY, token);

            set({
              token,
              isAuthenticated: true,
            });

            const userResponse = await api.get("/users/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const userData = (userResponse.data as any).result;

            const premiumRes = await api.get("/user-premium/me", {
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
              premium: isPremium,
            };

            set({ user });
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

            await get().login(username, password);
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
            const token = get().token;
            if (token) {
              await api.post("/auth/logout", { token });
            }
          } catch (error) {
            console.warn("Logout API call failed", error);
          }

          localStorage.removeItem(TOKEN_KEY);

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            premium: false,
            premiumEndDate: null,
            premiumStartDate: null,
          });
        },

        setUser: (user) => set({ user, isAuthenticated: true }),
        setToken: (token) => {
          localStorage.setItem(TOKEN_KEY, token);
          set({ token });
        },
        clearUser: () => {
          localStorage.removeItem(TOKEN_KEY);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
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
