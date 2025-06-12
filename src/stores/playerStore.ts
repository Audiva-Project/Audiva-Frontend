import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Song } from "@/types"

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  queue: Song[]

  // Actions
  setCurrentSong: (song: Song) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setCurrentTime: (time: number) => void
  nextSong: () => void
  previousSong: () => void
  addToQueue: (song: Song) => void
  clearQueue: () => void
}

export const usePlayerStore = create<PlayerState>()(
  devtools(
    (set, get) => ({
      currentSong: null,
      isPlaying: false,
      volume: 70,
      currentTime: 0,
      duration: 0,
      queue: [],

      setCurrentSong: (song: Song) => {
        set(
          {
            currentSong: song,
            isPlaying: true,
            currentTime: 0,
          },
          false,
          "setCurrentSong",
        )
      },

      togglePlay: () => {
        const { isPlaying } = get()
        set({ isPlaying: !isPlaying }, false, "togglePlay")
      },

      setVolume: (volume: number) => {
        set({ volume }, false, "setVolume")
      },

      setCurrentTime: (currentTime: number) => {
        set({ currentTime }, false, "setCurrentTime")
      },

      nextSong: () => {
        const { queue, currentSong } = get()
        if (queue.length === 0) return

        const nextSong = queue[0]
        const newQueue = queue.slice(1)

        set(
          {
            currentSong: nextSong,
            queue: newQueue,
            isPlaying: true,
            currentTime: 0,
          },
          false,
          "nextSong",
        )
      },

      previousSong: () => {
        // Implementation for previous song logic
        console.log("Previous song")
      },

      addToQueue: (song: Song) => {
        const { queue } = get()
        set({ queue: [...queue, song] }, false, "addToQueue")
      },

      clearQueue: () => {
        set({ queue: [] }, false, "clearQueue")
      },
    }),
    { name: "player-store" },
  ),
)
