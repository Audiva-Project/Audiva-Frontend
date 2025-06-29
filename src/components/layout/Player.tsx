// Player.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from "lucide-react"
import type { Song } from "@/types"
import "./Player.css"

interface PlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const Player = ({ currentSong, isPlaying, setIsPlaying }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="player">
      <div className="player-left">
        <div className="current-track">
          {/* <img src={`http://localhost:8080/identity/audio/${currentSong?.thumbnailUrl}`}/> */}
          <div className="track-info">
            <div className="track-title">{currentSong?.title || "No song selected"}</div>
            <div className="track-artist">{currentSong?.artist || "Unknown Artist"}</div>
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

      {currentSong?.audioUrl && (
        <audio
          ref={audioRef}
          src={`http://localhost:8080/identity/audio/${currentSong.audioUrl}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
    </div>
  )
}

export default Player
