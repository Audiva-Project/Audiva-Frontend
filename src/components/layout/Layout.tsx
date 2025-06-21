import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Player from "./Player"
import "./Layout.css"
import Footer from "./Footer"

const Layout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <Player />
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
