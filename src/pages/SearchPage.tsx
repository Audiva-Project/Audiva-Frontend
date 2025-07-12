"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { searchAll } from "@/utils/searchApi"
import { Song, Album, Artist } from "@/types"
import "./SearchPage.css"
import SongCard from "@/components/ui/SongCard"
import PopularArtist from "@/components/sections/PopularArtist"
import GenreCard from "@/components/ui/GenreCard"

export default function SearchPage() {
  const location = useLocation()
  const keyword = new URLSearchParams(location.search).get("query") || ""

  const [songs, setSongs] = useState<Song[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [artists, setArtists] = useState<Artist[]>([])

  const [activeTab, setActiveTab] = useState<"all" | "songs" | "albums" | "artists">("all")

  useEffect(() => {
    if (keyword) {
      searchAll(keyword).then((res) => {
        const result = res as { songs?: Song[]; albums?: Album[]; artists?: Artist[] }
        setSongs(result.songs || [])
        setAlbums(result.albums || [])
        setArtists(result.artists || [])
      })
    }
  }, [keyword])

  const renderSongs = () => (
    <div className="card-grid">
      {songs.map(song => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  )

  const renderAlbums = () => (
    <div className="genres-grid">
      {albums.map((album) => (
        <Link to={`/albums/${album.id}`} key={album.id} className="album-link">
          <GenreCard
            genre={{
              id: album.id.toString(),
              name: album.title,
              thumbnailUrl: album.thumbnailUrl,
            }}
          />
        </Link>
      ))}
    </div>
  )

  const renderArtists = () => (
    <PopularArtist
      title={{ main: "", highlight: "" }}
      artists={artists}
    />
  )

  return (
    <div className="search-page">
      <h1>Kết quả tìm kiếm cho: "{keyword}"</h1>

      <div className="tabs">
        <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>Tất cả</button>
        <button className={activeTab === "songs" ? "active" : ""} onClick={() => setActiveTab("songs")}>Bài hát</button>
        <button className={activeTab === "albums" ? "active" : ""} onClick={() => setActiveTab("albums")}>Playlist/Album</button>
        <button className={activeTab === "artists" ? "active" : ""} onClick={() => setActiveTab("artists")}>Nghệ sĩ/OA</button>
      </div>

      {activeTab === "all" && (
        <>
          <h2>Bài hát</h2>
          {songs.length ? renderSongs() : <p>Không tìm thấy bài hát nào.</p>}

          <h2>Playlist/Album</h2>
          {albums.length ? renderAlbums() : <p>Không tìm thấy album nào.</p>}

          <h2>Nghệ sĩ</h2>
          {artists.length ? renderArtists() : <p>Không tìm thấy nghệ sĩ nào.</p>}
        </>
      )}

      {activeTab === "songs" && (
        <>
          {songs.length ? renderSongs() : <p>Không tìm thấy bài hát nào.</p>}
        </>
      )}

      {activeTab === "albums" && (
        <>
          <h2>Playlist/Album</h2>
          {albums.length ? renderAlbums() : <p>Không tìm thấy album nào.</p>}
        </>
      )}

      {activeTab === "artists" && (
        <>
          {artists.length ? renderArtists() : <p>Không tìm thấy nghệ sĩ nào.</p>}
        </>
      )}
    </div>
  )
}
