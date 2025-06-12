"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="header">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search for Music, Artists..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="header-nav">
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <Link to="/premium" className="nav-link">
          Premium
        </Link>
      </nav>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="auth-buttons">
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
