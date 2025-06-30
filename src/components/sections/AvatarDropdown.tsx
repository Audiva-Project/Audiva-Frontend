"use client"

import { useState, useRef, useEffect } from "react"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate } from "react-router-dom"
import "./AvatarDropdown.css"

const DEFAULT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIyUAZwjVzqpQBqBREJUtZWs2_Vk_AgOJZ6Q&s"

export default function AvatarDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

    const avatarUrl = user?.avatar ||
    localStorage.getItem("user_avatar") ||
    DEFAULT_AVATAR

    const displayName = user?.name || "ADMIN"

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleProfileClick = () => {
        navigate("/profile")
        setIsOpen(false)
    }

    const handleLogoutClick = () => {
        logout()
        navigate("/login")
        setIsOpen(false)
    }

    return (
        <div className="avatar-dropdown-container" ref={dropdownRef}>
        {/* Avatar Button */}
       <button
        className="avatar-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        >
            <div className="avatar">
                <img
                src={avatarUrl}
                alt="User Avatar"
                className="avatar-image"
                />
            </div>
            {/* <span className="admin-text">{displayName}</span> */}
            <svg
                className={`chevron ${isOpen ? "chevron-up" : "chevron-down"}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                display= "none"
            >
                <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </button>
        {/* Dropdown Menu */}
        {isOpen && (
            <div className="dropdown-menu">
            <div className="dropdown-arrow"></div>
            <button className="dropdown-item" onClick={handleProfileClick}>
                <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                    fill="currentColor"
                />
                <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor" />
                </svg>
                Profile
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item logout-item" onClick={handleLogoutClick}>
                <svg className="dropdown-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11 5L14 8L11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Logout
            </button>
            </div>
        )}
        </div>
    )
    }
