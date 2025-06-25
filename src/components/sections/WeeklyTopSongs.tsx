import { ChevronRight } from "lucide-react"
import SongCard from "@/components/ui/SongCard"
import { weeklyTopSongs } from "@/data/mockData"
import "./SongsSection.css"
import api from "@/utils/api"

const WeeklyTopSongs = () => {

  const fetchUsers = async () => {
    try {
      const response = await api.get("/identity/users")
      console.log("Users fetched successfully:", response.data);
    }
    catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  fetchUsers()
  return (
    <section className="songs-section">
      <div className="section-header">
        <h2 className="section-title">
          Weekly Top <span className="title-highlight">Songs</span>
        </h2>
        <button className="view-all-btn">
          View All
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="songs-grid">
        {weeklyTopSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}

export default WeeklyTopSongs
