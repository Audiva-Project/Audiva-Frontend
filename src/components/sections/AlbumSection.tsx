import { Album, Song } from "@/types"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import SongCard from "../ui/SongCard"
import axios from "axios"

interface AlbumSectionProps {
  albumId: number
}

const AlbumSection = ({ albumId }: AlbumSectionProps) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [albumTitle, setAlbumTitle] = useState<string>("")

  useEffect(() => {
    axios.get<{ code: number, result: Album }>(
      `http://localhost:8080/identity/api/albums/${albumId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJodXkyIiwiZXhwIjoxNzU0MzM5MTIwLCJpYXQiOjE3NTEwOTkxMjAsImp0aSI6IjI1ZWNiOTBmLWI1NGQtNDE4OC04OWVjLWI2MDkxMzMyM2NkOSIsInNjb3BlIjoiIn0.Gma3ok8K54kAc9UJLm94PIpxDX_qCkr7lyEBo60rKT7cMoFsAHVBXD1kQGiq2FW18VUojn5zxmRVylSW2wAarw`,
        },
      }
    )
      .then((res) => {
        setSongs(res.data.result.songs || [])
        setAlbumTitle(res.data.result.title || "Untitled Album")
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
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}

export default AlbumSection
