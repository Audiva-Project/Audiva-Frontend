import { ChevronRight } from "lucide-react"
import SongCard from "@/components/ui/SongCard"
import "./SongsSection.css"

import { useEffect, useState } from "react"
import axios from "axios"

import type { Song } from "@/types"
import type { Album } from "@/types"

const WeeklyTopSongs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [albumTitle, setAlbumTitle] = useState<string>("")

  useEffect(() => {
    axios.get<{ code: number, result: Album }>(
      "http://localhost:8080/identity/api/albums/1",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJodXkyIiwiZXhwIjoxNzU0MzI2NzMzLCJpYXQiOjE3NTEwODY3MzMsImp0aSI6IjEyM2Q0ZjAyLTYwMjMtNGZkOS1hZmFmLTJiNjBmYjlkYmQ0MCIsInNjb3BlIjoiIn0.69FsbyNBB6hthrctgzDn-20CPwu0HIBDz4mxefruuSnj7OQDyEXl9EHbknKKV0idmE_RIMWdeO1l8pdIQKdahw`,
        },
      }
    )
      .then((res) => {
        console.log("Album:", res.data.result);
        console.log("Songs:", res.data.result.songs);

        setSongs(res.data.result.songs || []);
        setAlbumTitle(res.data.result.title || "Untitled Album");
      })
      .catch((err) => console.error("Error loading songs:", err));
  }, []);

  return (
    <section className="songs-section">
      <div className="section-header">
        <h2 className="section-title">
          {albumTitle && (
            <>
              {albumTitle}
            </>
          )}
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
  );
};

export default WeeklyTopSongs;
