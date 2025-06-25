import { ChevronRight } from "lucide-react"
import SongCard from "@/components/ui/SongCard"
import "./SongsSection.css"

const NewReleaseSongs = () => {
  return (
    <section className="songs-section">
      <div className="section-header">
        <h2 className="section-title">
          New Release <span className="title-highlight">Songs</span>
        </h2>
        <button className="view-all-btn">
          View All
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="songs-grid">
        {/* {newReleaseSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))} */}
      </div>
    </section>
  )
}

export default NewReleaseSongs
