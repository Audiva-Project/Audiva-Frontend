import { NavLink } from "react-router-dom"
import { Home, Compass, Users, Clock, Play, Heart, ListMusic, Settings, LogOut } from "lucide-react"
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Melodies</h1>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <NavLink to="/" className="nav-item" end>
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/discover" className="nav-item">
            <Compass size={20} />
            <span>Discover</span>
          </NavLink>

          <NavLink to="/artists" className="nav-item">
            <Users size={20} />
            <span>Artists</span>
          </NavLink>
          <NavLink to="/albums" className="nav-item">
            <ListMusic size={20} />
            <span>Albums</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3 className="section-title">LIBRARY</h3>

          <button className="nav-item">
            <Clock size={20} />
            <span>Recently Added</span>
          </button>

          <button className="nav-item">
            <Play size={20} />
            <span>Most played</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
