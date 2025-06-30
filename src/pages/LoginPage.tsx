"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import "./AuthPages.css"

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("") // có thể là username hoặc email
  const [password, setPassword] = useState("")
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(identifier, password)
      if (useAuthStore.getState().isAuthenticated) {
        navigate("/")
      }
    } catch (err) {
      console.error("Login failed:", err)
    }
  }

  return (
    <div className="auth-page">
      {/* Background Music Elements */}
      <div className="bg-music-elements">
        <div className="floating-note note-1">♪</div>
        <div className="floating-note note-2">♫</div>
        <div className="floating-note note-3">♬</div>
        <div className="floating-note note-4">♩</div>
        <div className="vinyl-record"></div>
      </div>

      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo-icon">🎵</div>
          <h1 className="auth-logo">Melodies</h1>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Sign in to continue your musical journey</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email or username"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={isLoading}>
            <span className="btn-icon">♪</span>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
