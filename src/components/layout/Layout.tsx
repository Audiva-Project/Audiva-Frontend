import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Player from "./Player"
import "./Layout.css"
import { useState } from "react"


import type { Song } from "@/types"

const Layout = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [songs, setSongs] = useState<Song[]>([])

  console.log(songs) // Add this line to define songs

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="main-content">
          <Outlet context={{
            currentSong,
            setCurrentSong,
            isPlaying,
            setIsPlaying,
            songs,
            setSongs
          }} />
        </main>
      </div>
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
      />
    </div>
  )
}

export default Layout
