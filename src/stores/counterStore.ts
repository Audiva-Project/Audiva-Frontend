import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementBy: (value: number) => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 }), false, "increment"),
        decrement: () => set((state) => ({ count: state.count - 1 }), false, "decrement"),
        reset: () => set({ count: 0 }, false, "reset"),
        incrementBy: (value: number) => set((state) => ({ count: state.count + value }), false, "incrementBy"),
      }),
      {
        name: "counter-storage",
      },
    ),
    {
      name: "counter-store",
    },
  ),
)
