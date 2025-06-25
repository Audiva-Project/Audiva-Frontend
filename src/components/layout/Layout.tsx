import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Player from "./Player"
import "./Layout.css"
import { useState } from "react"


const Layout = () => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="main-content">
          <Outlet context={{ currentSong, setCurrentSong, isPlaying, setIsPlaying }} />
        </main>
      </div>
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  )
}

export default Layout
