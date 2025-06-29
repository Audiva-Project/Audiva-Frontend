"use client"

import { useState } from "react"
import axios from "axios"
import { useAuthStore } from "../stores/authStore"
import "./UserProfile.css"

const UserProfile = () => {
  const { user, token, setUser, clearUser } = useAuthStore()

  const [userId, setUserId] = useState("user123")
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUser(response.data)
    } catch (err) {
      setError("Failed to fetch user")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = () => {
    if (user) {
      setEditName(user.name)
      setEditEmail(user.email)
      setEditMode(true)
    }
  }

  const handleSaveUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.put(
        `/api/users/${user?.id}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUser(response.data)
      setEditMode(false)
    } catch (err) {
      setError("Failed to update user")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditName("")
    setEditEmail("")
  }

  return (
    <div className="user-profile">
      <h2>User Profile Demo</h2>

      <div className="user-controls">
        <div className="input-group">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="user-input"
          />
          <button onClick={handleFetchUser} disabled={isLoading} className="btn btn-primary">
            {isLoading ? "Loading..." : "Fetch User"}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {user && (
        <div className="user-card">
          {user.avatar && (
            <img src={user.avatar} alt={`${user.name}'s avatar`} className="user-avatar" />
          )}

          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-actions">
                <button onClick={handleSaveUser} className="btn btn-success">
                  Save
                </button>
                <button onClick={handleCancelEdit} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-id">ID: {user.id}</p>

              <div className="user-actions">
                <button onClick={handleEditUser} className="btn btn-info">
                  Edit
                </button>
                <button onClick={clearUser} className="btn btn-danger">
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="user-info-text">
        This demo shows async state management with Zustand, including loading states and error handling.
      </p>
    </div>
  )
}

export default UserProfile
