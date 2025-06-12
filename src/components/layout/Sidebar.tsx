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

        <div className="nav-section">
          <h3 className="section-title">YOUR FAVORITES</h3>

          <button className="nav-item">
            <Heart size={20} />
            <span>Your playlist</span>
          </button>

          <button className="nav-item add-playlist">
            <ListMusic size={20} />
            <span>Add playlist</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </button>

        <button className="nav-item">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
