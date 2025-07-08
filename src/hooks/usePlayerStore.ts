import { create } from "zustand"
import type { Song } from "@/types"

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  play: (song: Song) => void
  pause: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  isPlaying: false,
  play: (song) => set({ currentSong: song, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
}))
