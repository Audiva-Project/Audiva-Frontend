import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Compass,
  Users,
  Clock,
  Play,
  Heart,
  ListMusic,
  Settings,
  LogOut,
  Upload,
} from "lucide-react";
import "@/components/layout/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="logo">Audiva</h1>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <NavLink to="/" className="nav-item" end>
            <Home size={20} />
            <span>Trang chủ</span>
          </NavLink>

          <NavLink to="/artists" className="nav-item">
            <Users size={20} />
            <span>Nghệ sĩ</span>
          </NavLink>

          <NavLink to="/albums" className="nav-item">
            <ListMusic size={20} />
            <span>Albums</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3 className="logo">Thư viện</h3>
          <Link to="/playlist" className="nav-item">
            <Heart size={20} />
            <span>Playlist</span>
          </Link>
          <Link to="/history" className="nav-item">
            <Clock size={20} />
            <span>Bài hát đã nghe</span>
          </Link>
          <Link to="recently-added" className="nav-item">
            <Upload size={20} />
            <span>Bài hát của bạn</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
