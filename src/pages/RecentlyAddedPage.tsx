import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"
import type { AuthState } from "@/stores/authStore"
import api from "@/utils/api"
import type { Song } from "@/types"
import SongCard from "@/components/ui/SongCard"
import "@/components/ui/SongCard.css"
import "./RecentlyAddedPage.css"

const RecentlyAddedPage = () => {
  const token = useAuthStore((state: AuthState) => state.token)
  const [songs, setSongs] = useState<Song[]>([])

  useEffect(() => {
    const fetchRecentlyAdded = async () => {
      if (!token) {
        console.error("No token found. Please login.")
        return
      }

      try {
        const response = await api.get("/identity/api/songs/created-by-me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const content = response.data.result.content
        setSongs(content)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecentlyAdded()
  }, [token])

  return (
    <div>
      <h1 className="section-title">Recently Added</h1>

      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} style={{ marginBottom: "20px" }}>
            <SongCard song={song} showArtist={false} />
            <p className="uploaded-by">
              Uploaded by: {song.createdBy || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyAddedPage
