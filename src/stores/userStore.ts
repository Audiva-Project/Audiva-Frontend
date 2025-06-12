import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User, Song, Playlist } from "@/types"

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  likeSong: (song: Song) => void
  unlikeSong: (songId: string) => void
  createPlaylist: (name: string, description: string) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })

          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const user: User = {
              id: "1",
              name: "John Doe",
              email,
              avatar: "/placeholder.svg?height=100&width=100&text=JD",
              playlists: [],
              likedSongs: [],
            }

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            })
          } catch (error) {
            set({
              error: "Invalid credentials",
              isLoading: false,
            })
          }
        },

        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
          })
        },

        register: async (name: string, email: string, password: string) => {
          set({ isLoading: true, error: null })

          try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const user: User = {
              id: "1",
              name,
              email,
              avatar: "/placeholder.svg?height=100&width=100&text=" + name.charAt(0),
              playlists: [],
              likedSongs: [],
            }

            set({
              user,
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

        likeSong: (song: Song) => {
          const { user } = get()
          if (!user) return

          const likedSongs = [...user.likedSongs, song]
          set({
            user: { ...user, likedSongs },
          })
        },

        unlikeSong: (songId: string) => {
          const { user } = get()
          if (!user) return

          const likedSongs = user.likedSongs.filter((song) => song.id !== songId)
          set({
            user: { ...user, likedSongs },
          })
        },

        createPlaylist: (name: string, description: string) => {
          const { user } = get()
          if (!user) return

          const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            description,
            coverUrl: "/placeholder.svg?height=200&width=200&text=Playlist",
            songs: [],
            createdAt: new Date().toISOString(),
          }

          const playlists = [...user.playlists, newPlaylist]
          set({
            user: { ...user, playlists },
          })
        },
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    { name: "user-store" },
  ),
)
