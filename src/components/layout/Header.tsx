"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import AvatarDropdown from "../sections/AvatarDropdown"
import "./Header.css"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login") // hoặc "/" tuỳ theo UX
  }

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
          Về chúng tôi
        </Link>
        <Link to="/premium" className="nav-link">
          Premium
        </Link>
        <Link to="/upload" className="nav-link">
          Upload
        </Link>
      </nav>

      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
        </button>

        {isAuthenticated ? (
          <AvatarDropdown />
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
