import { Play, Pause } from "lucide-react"
import type { Song } from "@/types"
// import { usePlayerStore } from "@/stores/usePlayerStore"
import { useOutletContext } from "react-router-dom"
import "./SongCard.css"

interface OutletContextType {
  currentSong: Song | null
  setCurrentSong: (song: Song) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const SongCard = ({ song }: { song: Song }) => {
  const { setCurrentSong, setIsPlaying, currentSong, isPlaying } = useOutletContext<OutletContextType>()

  const isCurrent = currentSong?.id === song.id
  const isThisPlaying = isCurrent && isPlaying

  const handlePlayClick = () => {
    if (isCurrent) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  const thumbnailUrl = song.thumbnailUrl
    ? `http://localhost:8080/identity/audio/${song.thumbnailUrl}`
    : "/placeholder.svg"

  return (
    <div className="song-card">
      <div className="song-image-container">
        <img src={thumbnailUrl} alt={song.title} className="song-image" />
        <div className="play-overlay">
          <button className="play-button" onClick={handlePlayClick}>
            {isThisPlaying ? (
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
      </div>
    </div>
  )
}

export default SongCard
