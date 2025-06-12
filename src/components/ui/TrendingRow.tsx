import { Play } from "lucide-react"
import type { Song } from "@/types"
import "./TrendingRow.css"

interface TrendingRowProps {
  song: Song
  rank: number
}

const TrendingRow = ({ song, rank }: TrendingRowProps) => {
  return (
    <div className="trending-row">
      <div className="row-cell rank">
        <span className="rank-number">{rank}</span>
      </div>

      <div className="row-cell song-info">
        <img src={song.coverUrl || "/placeholder.svg"} alt={song.title} className="song-thumbnail" />
        <div className="song-details">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
        <button className="play-btn-small">
          <Play size={14} fill="currentColor" />
        </button>
      </div>

      <div className="row-cell date">{song.releaseDate}</div>
      <div className="row-cell album">{song.album}</div>
      <div className="row-cell time">{song.duration}</div>
    </div>
  )
}

export default TrendingRow
