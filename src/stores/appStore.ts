import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface AppState {
  isLoading: boolean
  theme: "light" | "dark"
  language: "vi" | "en"
  setLoading: (loading: boolean) => void
  setTheme: (theme: "light" | "dark") => void
  setLanguage: (language: "vi" | "en") => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      isLoading: false,
      theme: "light",
      language: "vi",

      setLoading: (isLoading: boolean) => set({ isLoading }, false, "setLoading"),

      setTheme: (theme: "light" | "dark") => set({ theme }, false, "setTheme"),

      setLanguage: (language: "vi" | "en") => set({ language }, false, "setLanguage"),

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === "light" ? "dark" : "light"
        set({ theme: newTheme }, false, "toggleTheme")
      },
    }),
    {
      name: "app-store",
    },
  ),
)
