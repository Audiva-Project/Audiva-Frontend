"use client"

import { useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react"
import "./Player.css"

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(45)
  const [duration] = useState(217)
  const [volume, setVolume] = useState(70)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="player">
      <div className="player-left">
        <div className="current-track">
          <img src="/placeholder.svg?height=56&width=56" alt="Current track" className="track-image" />
          <div className="track-info">
            <div className="track-title">Blinding Lights</div>
            <div className="track-artist">The Weeknd</div>
          </div>
          <button className="like-btn">
            <Heart size={16} />
          </button>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn">
            <Shuffle size={16} />
          </button>
          <button className="control-btn">
            <SkipBack size={20} />
          </button>
          <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn">
            <SkipForward size={20} />
          </button>
          <button className="control-btn">
            <Repeat size={16} />
          </button>
        </div>

        <div className="progress-container">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100}%` }} />
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-container">
          <Volume2 size={18} />
          <div className="volume-bar">
            <div className="volume-fill" style={{ width: `${volume}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
