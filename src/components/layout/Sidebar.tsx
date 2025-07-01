import { Link, NavLink } from "react-router-dom"
import { Home, Compass, Users, Clock, Play, Heart, ListMusic, Settings, LogOut, Upload } from "lucide-react"
import "@/components/layout/Sidebar.css"

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
          <h3 className="logo">Library</h3>
          <Link to="recently-added" className="nav-item">
            <Upload size={20} />
            <span>Recently Added</span>
          </Link>
          <Link to ="/history" className="nav-item">
            <Clock size={20} />
            <span>History</span>
          </Link>
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
