"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import "./AuthPages.css"

const SignupPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dob, setDob] = useState("") // YYYY-MM-DD format
  const [localError, setLocalError] = useState("")

  const { register, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError("")

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }

    try {
      await register({
        username,
        password,
        firstName,
        lastName,
        dob,
      })
      navigate("/")
    } catch (err) {
      console.error("Registration failed:", err)
    }
  }

  const displayError = localError || error

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-logo">Melodies</h1>
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Join the music community</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {displayError && <div className="error-message">{displayError}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
  <div className="form-group half-width">
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      id="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="Enter your first name"
      className="form-input"
      required
    />
  </div>

  <div className="form-group half-width">
    <label htmlFor="lastName">Last Name</label>
    <input
      type="text"
      id="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      placeholder="Enter your last name"
      className="form-input"
      required
    />
  </div>
</div>


          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
