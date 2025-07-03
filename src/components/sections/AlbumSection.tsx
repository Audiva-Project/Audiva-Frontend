import { Album, Song } from "@/types"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import SongCard from "../ui/SongCard"
import axios from "axios"
import { useOutletContext } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import type { AuthState } from "@/stores/authStore"

interface AlbumSectionProps {
  albumId: number
}

interface LayoutContext {
  songs: Song[]
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>
}

const AlbumSection = ({ albumId }: AlbumSectionProps) => {
  const [localSongs, setLocalSongs] = useState<Song[]>([])
  const [albumTitle, setAlbumTitle] = useState<string>("")
  const { setSongs } = useOutletContext<LayoutContext>()
  const album4songs = localSongs.slice(0, 4)
  const token = useAuthStore((state: AuthState) => state.token)
  useEffect(() => {
    axios.get<{ code: number, result: Album }>(
      `http://localhost:8080/identity/api/albums/${albumId}`,
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`
      //   },
      // }
    )
      .then((res) => {
        const fetchedSongs = res.data.result.songs || []
        setLocalSongs(fetchedSongs)
        setAlbumTitle(res.data.result.title || "Untitled Album")
        setSongs(prev => [...prev, ...fetchedSongs])
      })
      .catch((err) => console.error("Error loading songs:", err))
  }, [albumId])

  return (
    <section className="songs-section">
      <div className="section-header">
        <h2 className="section-title">{albumTitle}</h2>
        <button className="view-all-btn">
          View All
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="songs-grid">
        {album4songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}

export default AlbumSection
