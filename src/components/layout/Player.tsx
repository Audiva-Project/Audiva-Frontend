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
  Heart,
  VolumeX
} from "lucide-react"
import type { Song } from "@/types"
import "./Player.css"

interface PlayerProps {
  currentSong: Song | null
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  setCurrentSong: (song: Song) => void
  songs: Song[]
}

const Player = ({ currentSong, isPlaying, setIsPlaying, setCurrentSong, songs }: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  // loop songs
  type RepeatMode = "off" | "repeat-one" | "repeat-all"
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off")

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "off":
          return "repeat-one"
        case "repeat-one":
          return "repeat-all"
        case "repeat-all":
          return "off"
      }
    })
  }

  // play/pause audio 
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
    if (repeatMode === "repeat-one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }
    } else {
      handleSkipForward()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeatMode === "repeat-one"
    }
  }, [repeatMode])

  const seek = (clientX: number) => {
    if (!audioRef.current || !progressBarRef.current || !duration) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const clampedX = Math.max(0, Math.min(offsetX, rect.width))
    const seekTime = (clampedX / rect.width) * duration
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling)
  }

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  // Mute/Unmute
  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted
      audioRef.current.muted = newMuted
      setIsMuted(newMuted)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      if (volume > 0 && isMuted) {
        audioRef.current.muted = false
        setIsMuted(false)
      }
    }
  }, [volume])

  // skip/back songs
  const handleSkipForward = () => {
    if (!currentSong || songs.length === 0) return
    if (isShuffling) {
      let randomIndex = Math.floor(Math.random() * songs.length)
      if (songs.length > 1) {
        randomIndex = Math.floor(Math.random() * songs.length)
      }
      setCurrentSong(songs[randomIndex])
      setIsPlaying(true)
    } else {
      const currentIndex = songs.findIndex(
        (s) => Number(s.id) === Number(currentSong.id)
      )
      if (currentIndex === -1) {
        console.warn('Current song not found in songs list.')
        return
      }
      const nextIndex = (currentIndex + 1) % songs.length
      // console.log(`Skipping from index ${currentIndex} to ${nextIndex}`)
      setCurrentSong(songs[nextIndex])
      setIsPlaying(true)
    }
  }

  const handleSkipBack = () => {
    if (!currentSong || songs.length === 0) return

    const currentIndex = songs.findIndex((s) => s.id === currentSong.id)
    if (currentIndex === -1) return

    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrentSong(songs[prevIndex])
    setIsPlaying(true)
  }

  return (
    <div className="player">
      <div className="player-left">
        <div className="current-track">
          <div className="track-image">
            {currentSong?.thumbnailUrl && (
              <img
                src={`http://localhost:8080/identity/audio/${currentSong.thumbnailUrl}`}
                alt={currentSong.title}
              />
            )}
          </div>
          <div className="track-info">
            <div className="track-title">{currentSong?.title || "No song selected"}</div>
            <div className="track-artist">
              {currentSong?.artists && currentSong.artists.length > 0
                ? currentSong.artists.map(artist => artist.name).join(", ")
                : "Unknown Artist"}
            </div>
          </div>
          <button className="like-btn">
            <Heart size={16} />
          </button>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" onClick={toggleShuffle}>
            <Shuffle size={16} color={isShuffling ? "#1db954" : "white"} />
          </button>
          <button className="control-btn" onClick={handleSkipBack}>
            <SkipBack size={20} />
          </button>
          <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn" onClick={handleSkipForward}>
            <SkipForward size={20} />
          </button>
          <button className="control-btn">
            <Repeat
              size={16}
              color={repeatMode !== "off" ? "#1db954" : "white"}
              style={{
                transform: repeatMode === "repeat-one" ? "rotate(360deg)" : "none",
                transition: "transform 0.3s"
              }}
              onClick={toggleRepeat}
            />
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
          <button onClick={toggleMute} className="volume-icon">
            {isMuted ? <VolumeX size={25} color="#a855f7" /> : <Volume2 size={25} color="white" />}
          </button>
          {/* <div className="volume-bar">
            <div className="volume-fill" style={{ width: `${volume}%` }} />
          </div> */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>

      {
        currentSong?.audioUrl && (
          <audio
            key={currentSong?.id}
            ref={audioRef}
            src={`http://localhost:8080/identity/audio/${currentSong.audioUrl}`}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
          />
        )
      }
    </div >
  )
}

export default Player
