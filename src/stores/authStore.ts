import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import api from "@/utils/api"
import type { User } from "@/types"

const TOKEN_KEY = "auth_token"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null

  login: (identifier: string, password: string) => Promise<void> // 🔄 Đổi email -> identifier
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
  clearUser: () => void
}

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
          set({ isLoading: true, error: null })

          try {
            const response = await api.post("/identity/auth/token", {
              username: identifier,
              password,
            })

            const data = response.data as { result: { token: string } }
            const token = data.result.token
            console.log("Token received:", token)

            localStorage.setItem(TOKEN_KEY, token)

            set({
              token,
              isAuthenticated: true,
            })

            const userResponse = await api.get("/identity/users/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })

            const userData = (userResponse.data as any).result

            const user: User = {
              id: userData.id,
              name: `${userData.firstName} ${userData.lastName}`.trim(),
              email: userData.username,
              avatar: userData.avatar || `https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png`,
            }

            set({ user,
              isLoading: false,
             })
          } catch (error: any) {
            let message = "Đăng nhập không thành công"
            if (error.response?.status === 401) {
              message = "Sai tên đăng nhập hoặc mật khẩu"
            } else if (error.response?.data?.message) {
              message = error.response.data.message
            }

            set({
              error: message,
              isLoading: false,
            })
            throw new Error(message)
          }
        },

        register: async (name, email, password) => {
          set({ isLoading: true, error: null })
          try {
            const response = await api.post("/identity/auth/register", {
              name,
              email,
              password,
            })

            const data = response.data as { token: string; user: { id: string; avatar?: string } }
            const token = data.token
            localStorage.setItem(TOKEN_KEY, token)

            const user: User = {
              id: data.user.id,
              name,
              email,
              avatar:
                data.user.avatar ||
                `/placeholder.svg?text=${name.charAt(0)}`,
            }

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: "Registration failed",
              isLoading: false,
            })
          }
        },

        logout: async() => {
          try {
            const token = useAuthStore.getState().token

            if (token) {
              await api.post("/identity/auth/logout", { token })
            }

            localStorage.removeItem(TOKEN_KEY)

            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            })
          } catch (error) {
            console.error("Logout failed:", error)

            // fallback: vẫn xóa token local và reset store
            localStorage.removeItem(TOKEN_KEY)

            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        },

        setUser: (user) => set(() => ({ user, isAuthenticated: true })),
        setToken: (token) => {
          localStorage.setItem(TOKEN_KEY, token)
          set(() => ({ token }))
        },
        clearUser: () => {
          localStorage.removeItem(TOKEN_KEY)
          set(() => ({
            user: null,
            token: null,
            isAuthenticated: false,
          }))
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "auth-store" }
  )
)
