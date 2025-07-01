import { Play, Pause } from "lucide-react"
import type { Song } from "@/types"
import { Link, useOutletContext } from "react-router-dom"
import "./SongCard.css"

interface OutletContextType {
  currentSong: Song | null
  setCurrentSong: (song: Song) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
}

const SongCard = ({ song, showArtist = true }: { song: Song, showArtist?: boolean }) => {
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
        {showArtist && ( // 👈 wrap artist section
          <p className="song-artist">
            {song.artists && song.artists.length > 0
              ? song.artists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    to={`/artists/${artist.id}`}
                    className="artist-link"
                  >
                    {artist.name}
                    {index < song.artists.length - 1 ? ", " : ""}
                  </Link>
                ))
              : "Unknown Artist"}
          </p>
        )}
      </div>
    </div>
  )
}

export default SongCard
