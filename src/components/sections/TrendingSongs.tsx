import { ChevronRight } from "lucide-react"
import TrendingRow from "@/components/ui/TrendingRow"
import { trendingSongs } from "@/data/mockData"
import "./TrendingSongs.css"

const TrendingSongs = () => {
  return (
    <section className="trending-section">
      <div className="section-header">
        <h2 className="section-title">
          Trending <span className="title-highlight">Songs</span>
        </h2>
        <button className="view-all-btn">
          View All
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="trending-table">
        <div className="trending-header">
          <div className="header-cell rank">#</div>
          <div className="header-cell song">Song</div>
          <div className="header-cell date">Release Date</div>
          <div className="header-cell album">Album</div>
          <div className="header-cell time">Time</div>
        </div>

        <div className="trending-body">
          {trendingSongs.map((song, index) => (
            <TrendingRow key={song.id} song={song} rank={index + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingSongs
