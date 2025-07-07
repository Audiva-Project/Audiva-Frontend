import { useEffect, useState } from "react";
import { Search, Bell, X, Trash2, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import AvatarDropdown from "../sections/AvatarDropdown";
import api from "@/utils/api";
import type { Notification as NotificationBase } from "@/types";

type Notification = NotificationBase & {
  read: boolean;
  time: string;
  details: string;
};

import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setSelectedNotification(null);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
    setSelectedNotification(null);
  };

  const deleteNotification = (notificationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }
  };

  const viewNotificationDetails = (
    notification: Notification,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const goBackToList = () => {
    setSelectedNotification(null);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  useEffect(() => {
    // if user exists, fetch notifications
    if (!user) return;
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/identity/api/notifications/me");
        const data = (res.data as { result: Notification[] }).result;
        const enriched = data.map((item: Notification) => ({
          ...item,
          read: item.isRead,
          time: formatTimeAgo(item.createdDate),
          details: item.message,
        }));
        setNotifications(enriched);
      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };
    fetchNotifications();
  }, []);

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

      {showNotifications && (
        <div className="header-modal-overlay" onClick={closeNotifications}>
          <div
            className="header-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="header-modal-header">
              <h3 className="header-modal-title">
                {selectedNotification ? (
                  <div className="header-modal-title-with-back">
                    <button className="header-back-btn" onClick={goBackToList}>
                      ←
                    </button>
                    Thông báo chi tiết
                  </div>
                ) : (
                  "Thông báo"
                )}
              </h3>
              <button
                className="header-modal-close"
                onClick={closeNotifications}
              >
                <X size={20} />
              </button>
            </div>

            <div className="header-modal-body">
              {selectedNotification ? (
                <div className="header-notification-details">
                  <div className="header-notification-details-header">
                    <h4 className="header-notification-details-title">
                      {selectedNotification.title}
                    </h4>
                    <span className="header-notification-details-time">
                      {selectedNotification.time}
                    </span>
                  </div>
                  <div className="header-notification-details-content">
                    <p>{selectedNotification.details}</p>
                  </div>
                </div>
              ) : notifications.length > 0 ? (
                <div className="header-notifications-list">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`header-notification-item ${
                        !notification.read ? "header-notification-unread" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
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

                      <div className="header-notification-actions">
                        <button
                          className="header-notification-action-btn"
                          onClick={(e) =>
                            viewNotificationDetails(notification, e)
                          }
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="header-notification-action-btn header-notification-delete-btn"
                          onClick={(e) =>
                            deleteNotification(notification.id, e)
                          }
                          title="Delete notification"
                        >
                          <Trash2 size={16} />
                        </button>
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

            {!selectedNotification && notifications.length > 0 && (
              <div className="header-modal-footer">
                <button
                  className="header-btn header-btn-secondary header-btn-full"
                  onClick={markAllAsRead}
                >
                  Đánh dấu tất cả là đã đọc
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
