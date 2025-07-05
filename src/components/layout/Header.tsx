"use client";
import { useState } from "react";
import { Search, Bell, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import AvatarDropdown from "../sections/AvatarDropdown";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New follower",
      message: "John Doe started following you",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Track liked",
      message: "Someone liked your track 'Summer Vibes'",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "New comment",
      message: "Sarah commented on your playlist",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Upload complete",
      message: "Your track 'Midnight Dreams' has been uploaded successfully",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <>
      <header className="header-container">
        <div className="header-search-container">
          <Search size={18} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search for Music, Artists..."
            className="header-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="header-nav">
          <Link to="/about" className="header-nav-link">
            About Us
          </Link>
          <Link to="/premium" className="header-nav-link">
            Premium
          </Link>
          <Link to="/upload" className="header-nav-link">
            Upload
          </Link>
        </nav>

        <div className="header-actions">
          <button className="header-icon-btn" onClick={toggleNotifications}>
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="header-notification-badge">{unreadCount}</span>
            )}
          </button>
          {isAuthenticated ? (
            <AvatarDropdown />
          ) : (
            <div className="header-auth-buttons">
              <Link to="/login" className="header-btn header-btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="header-btn header-btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="header-modal-overlay" onClick={closeNotifications}>
          <div
            className="header-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header-modal-header">
              <h3 className="header-modal-title">Notifications</h3>
              <button
                className="header-modal-close"
                onClick={closeNotifications}
              >
                <X size={20} />
              </button>
            </div>
            <div className="header-modal-body">
              {notifications.length > 0 ? (
                <div className="header-notifications-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`header-notification-item ${
                        !notification.read ? "header-notification-unread" : ""
                      }`}
                    >
                      <div className="header-notification-content">
                        <h4 className="header-notification-title">
                          {notification.title}
                        </h4>
                        <p className="header-notification-message">
                          {notification.message}
                        </p>
                        <span className="header-notification-time">
                          {notification.time}
                        </span>
                      </div>
                      {!notification.read && (
                        <div className="header-notification-dot"></div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="header-no-notifications">
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
            <div className="header-modal-footer">
              <button className="header-btn header-btn-secondary header-btn-full">
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
