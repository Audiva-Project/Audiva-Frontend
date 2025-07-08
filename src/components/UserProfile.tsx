"use client";

import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, token, setUser, clearUser } = useAuthStore();

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="user-profile">
        <h2>User Profile</h2>
        <p>No user data found. Please log in.</p>
      </div>
    );
  }

  const handleEdit = () => {
    setEditName(user.name || "");
    setEditEmail(user.email || "");
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setError(null);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `/api/users/${user.id}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setEditMode(false);
    } catch (err) {
      setError("Failed to update user info.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h2>Your Profile</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="user-card">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="user-avatar"
          />
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
              <button onClick={handleSave} disabled={isLoading} className="btn btn-success">
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCancel} className="btn btn-secondary">
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
              <button onClick={handleEdit} className="btn btn-info">
                Edit
              </button>
              <button onClick={clearUser} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
