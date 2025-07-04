import { Play } from "lucide-react"
import type { Song } from "@/types"
import "./TrendingSongRow.css"

interface TrendingSongRowProps {
  song: Song
  index: number
}

const TrendingSongRow = ({ song, index }: TrendingSongRowProps) => {
  return (
    <div className="trending-row">
      <div className="trending-cell index">{index}</div>
      <div className="trending-cell song-details">
        <img src={song.thumbnailUrl || "/placeholder.svg"} alt={song.title} className="song-thumbnail" />
        <div className="song-text">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
        <button className="play-button-small">
          <Play size={16} />
        </button>
      </div>
      <div className="trending-cell release-date">{song.releaseDate}</div>
      <div className="trending-cell album">{song.album?.title}</div>
      <div className="trending-cell duration">{song.playCount}</div>
    </div>
  )
}

export default TrendingSongRow
