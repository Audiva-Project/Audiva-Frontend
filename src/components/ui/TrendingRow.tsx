import { Pause, Play } from "lucide-react"
import type { Song } from "@/types"
import "./TrendingRow.css"
import { useOutletContext } from "react-router-dom"

interface TrendingRowProps {
  song: Song
  rank: number
}

interface OutletContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const TrendingRow = ({ song, rank }: TrendingRowProps) => {
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useOutletContext<OutletContextType>();
  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;

  const handlePlayClick = async () => {
    if (isCurrent) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      try {
        await fetch(`http://localhost:8080/identity/api/songs/${song.id}/play`, {
          method: "POST",
        });
        console.log("Play count increased!");
      } catch (err) {
        console.error("Play count error:", err);
      }
    }
  };

  return (
    <div className="trending-row">
      <div className="row-cell rank">
        <span className="rank-number">{rank}</span>
      </div>

      <div className="row-cell song-info">
        <img
          src={
            song.thumbnailUrl
              ? `http://localhost:8080/identity/audio/${song.thumbnailUrl}`
              : "/placeholder.svg"
          }
          alt={song.title}
          className="song-thumbnail"
        />
        <div className="song-details">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
        <button className="play-btn-small" onClick={handlePlayClick}>
          {isThisPlaying ? (
            <Pause size={14} fill="currentColor" />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </button>
      </div>

      <div className="row-cell album">{song.album?.title || song.albumTitle || 'Unknown Album'}</div>
      <div className="row-cell play">{song.playCount}</div>

    </div>
  )
}

export default TrendingRow
