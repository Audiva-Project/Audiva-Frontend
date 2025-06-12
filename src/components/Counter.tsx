"use client"

import { useCounterStore } from "../stores/counterStore"
import "./Counter.css"

const Counter = () => {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore()

  return (
    <div className="counter">
      <h2>Counter Demo</h2>
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>

      <div className="counter-controls">
        <button onClick={decrement} className="btn btn-danger">
          -1
        </button>
        <button onClick={increment} className="btn btn-success">
          +1
        </button>
        <button onClick={() => incrementBy(5)} className="btn btn-info">
          +5
        </button>
        <button onClick={reset} className="btn btn-warning">
          Reset
        </button>
      </div>

      <p className="counter-info">This counter uses Zustand for state management and persists to localStorage.</p>
    </div>
  )
}

export default Counter
