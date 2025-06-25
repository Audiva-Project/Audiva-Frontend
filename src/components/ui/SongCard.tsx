import { Play, Pause } from "lucide-react"
import type { Song } from "@/types"
import "./SongCard.css"
import { useRef, useState } from "react"

interface SongCardProps {
  song: Song
}

const SongCard = ({ song }: SongCardProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioSrc = song.audioUrl
    ? `http://localhost:8080/identity/audio/${song.audioUrl}`
    : undefined

  const handlePlayClick = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="song-card">
      <div className="song-image-container">
        <img
          src={song.coverUrl || "/placeholder.svg"}
          alt={song.title}
          className="song-image"
        />
        <div className="play-overlay">
          <button className="play-button" onClick={handlePlayClick}>
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={handleAudioEnded}
        />
      </div>
    </div>
  )
}

export default SongCard
