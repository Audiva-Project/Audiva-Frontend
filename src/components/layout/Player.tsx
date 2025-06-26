"use client"

import { useEffect, useRef, useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Heart
} from "lucide-react"
import type { Song } from "@/types"
import "./Player.css"

interface PlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const Player = ({ currentSong, isPlaying, setIsPlaying }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isSeeking, setIsSeeking] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current && !isSeeking) {
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

  const seek = (clientX: number) => {
    if (!audioRef.current || !progressBarRef.current || !duration) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const clampedX = Math.max(0, Math.min(offsetX, rect.width))
    const seekTime = (clampedX / rect.width) * duration

    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    seek(e.clientX)
  }

  const handleSeekStart = () => {
    setIsSeeking(true)
  }

  const handleSeekMove = (e: MouseEvent) => {
    if (isSeeking) {
      seek(e.clientX)
    }
  }

  const handleSeekEnd = () => {
    setIsSeeking(false)
  }

  useEffect(() => {
    if (isSeeking) {
      document.addEventListener("mousemove", handleSeekMove)
      document.addEventListener("mouseup", handleSeekEnd)
    }
    return () => {
      document.removeEventListener("mousemove", handleSeekMove)
      document.removeEventListener("mouseup", handleSeekEnd)
    }
  }, [isSeeking])

  return (
    <div className="player">
      <div className="player-left">
        <div className="current-track">
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
          <div
            className="progress-bar"
            ref={progressBarRef}
            onClick={handleSeekClick}
            onMouseDown={handleSeekStart}
          >
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
