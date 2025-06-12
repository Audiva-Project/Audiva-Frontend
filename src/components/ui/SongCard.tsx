import { Play } from "lucide-react"
import type { Song } from "@/types"
import "./SongCard.css"

interface SongCardProps {
  song: Song
}

const SongCard = ({ song }: SongCardProps) => {
  return (
    <div className="song-card">
      <div className="song-image-container">
        <img src={song.coverUrl || "/placeholder.svg"} alt={song.title} className="song-image" />
        <div className="play-overlay">
          <button className="play-button">
            <Play size={20} fill="currentColor" />
          </button>
        </div>
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>
    </div>
  )
}

export default SongCard
