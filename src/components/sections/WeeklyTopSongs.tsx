import { ChevronRight } from "lucide-react"
import SongCard from "@/components/ui/SongCard"
import { weeklyTopSongs } from "@/data/mockData"
import "./SongsSection.css"

import { useEffect, useState } from "react"
import axios from "axios"

import type { Song } from "@/types"

const WeeklyTopSongs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  useEffect(() => {
    axios.get<Song[]>("http://localhost:8080/identity/api/songs",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJodXkyIiwiZXhwIjoxNzU0MjM1MjMyLCJpYXQiOjE3NTA5OTUyMzIsImp0aSI6IjcwNDhjMDBkLTFiNjgtNGRlNC1iMmZhLTQ3Nzk1MmFhOGJkYSIsInNjb3BlIjoiUk9MRV9BRE1JTiBBUFBST1ZFX1BPU1QgQ1JFQVRFX0RBVEEifQ.AbVy-6jugVVykKBzOKfxL0JaSiXHoC4SazUagU5Zaf9KdvekfK89hTskGUxWB86D4QpBe7vxzE49Mmnfkio4dA`,
        },
      }
    )
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error loading songs:", err))
  }, [])
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
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  )
}

export default WeeklyTopSongs
