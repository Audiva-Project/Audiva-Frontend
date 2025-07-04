"use client";

import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import "./AuthPages.css";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [customError, setCustomError] = useState("");
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCustomError("");
      await login(identifier, password);
      if (useAuthStore.getState().isAuthenticated) {
        navigate("/");
      }
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
      setCustomError("Bạn đã nhập sai tên đăng nhập hoặc mật khẩu.");
    }
  };

  return (
    <div className="auth-page">
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
          <h1 className="auth-logo">Audiva</h1>
          <h2 className="auth-title">Chào mừng quay trở lại</h2>
          <p className="auth-subtitle">
            Đăng nhập để tiếp tục hành trình âm nhạc của bạn
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {customError && <div className="error-message">{customError}</div>}

          <div className="form-group">
            <label htmlFor="identifier">Tên đăng nhập hoặc Email</label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Nhập tên đăng nhập hoặc email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={isLoading}
          >
            <span className="btn-icon">♪</span>
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="auth-link">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
