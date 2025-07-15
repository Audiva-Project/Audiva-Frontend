import type React from "react";
import { useEffect, useRef, useState } from "react";
import "@/pages/UploadPage.css";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";
import api from "@/utils/api";
import { FiUpload, FiMusic, FiImage, FiCheck } from "react-icons/fi";

type Artist = {
  id: number;
  name: string;
};

const UploadPage: React.FC = () => {
  const [songName, setSongName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useAuthStore((state: AuthState) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/identity/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setArtists(response.data);
        } else {
          console.error("Không lấy được danh sách ca sĩ:", response.statusText);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách ca sĩ:", error);
      }
    };

    if (isAuthenticated) {
      fetchArtists();
    }
  }, [token, isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleArtistSelect = (id: number) => {
    setSelectedArtistIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedArtistNames = artists
    .filter((artist) => selectedArtistIds.includes(artist.id))
    .map((artist) => artist.name)
    .join(", ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName || !file) {
      setMessage("Vui lòng nhập tên bài hát và chọn tệp mp3.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", songName);
    formData.append("audioFile", file);
    if (thumbnail) {
      formData.append("thumbnailFile", thumbnail);
    }
    selectedArtistIds.forEach((id) => {
      formData.append("artistIds", id.toString());
    });

    try {
      const response = await fetch("http://localhost:8080/identity/api/songs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMessage("Tải bài hát thành công!");
        setSongName("");
        setFile(null);
        setThumbnail(null);
        setSelectedArtistIds([]);
      } else {
        setMessage("Tải bài hát thất bại.");
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi khi tải bài hát.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="upload-unauth-container">
        <div className="upload-unauth-content">
          <h1 className="upload-unauth-title">BÀI HÁT CỦA BẠN</h1>
          <p className="upload-unauth-message">
            Bạn cần đăng nhập để đăng tải bài hát của riêng mình
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-wrapper">
      <div className="upload-box">
        <div className="upload-box-header">
          <FiUpload className="upload-box-icon" />
          <h2>Đăng tải bài hát</h2>
        </div>

        <form onSubmit={handleSubmit} className="upload-box-form">
          <div className="upload-form-group">
            <label className="upload-form-label">Tên bài hát</label>
            <div className="upload-input-wrapper">
              <input
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Nhập tên bài hát"
                required
              />
            </div>
          </div>

          <div className="upload-form-group">
            <label className="upload-form-label">Ca sĩ</label>
            <div className="upload-dropdown" ref={dropdownRef}>
              <div className="upload-dropdown-input" onClick={toggleDropdown}>
                <span className="upload-dropdown-value">
                  {selectedArtistNames || "Chọn ca sĩ"}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="upload-dropdown-menu">
                  {artists.map((artist) => (
                    <div
                      key={artist.id}
                      className={`upload-dropdown-item ${
                        selectedArtistIds.includes(artist.id) ? "selected" : ""
                      }`}
                      onClick={() => handleArtistSelect(artist.id)}
                    >
                      <div className="upload-checkbox">
                        {selectedArtistIds.includes(artist.id) && <FiCheck />}
                      </div>
                      <span>{artist.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="upload-form-group">
            <label className="upload-form-label">Tệp nhạc (.mp3)</label>
            <label className="upload-file-upload">
              <div className="upload-file-content">
                <div className="upload-file-inner">
                  <FiMusic className="upload-file-icon" />
                  <span className="upload-file-text">
                    {file ? file.name : "Chọn tệp nhạc"}
                  </span>
                </div>
              </div>
              <input
                type="file"
                accept=".mp3,audio/mp3"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
                required
              />
            </label>
          </div>

          <div className="upload-form-group">
            <label className="upload-form-label">Ảnh bài hát</label>
            <label className="upload-file-upload">
              <div className="upload-file-content">
                <div className="upload-file-inner">
                  <FiImage className="upload-file-icon" />
                  <span className="upload-file-text">
                    {thumbnail ? thumbnail.name : "Chọn ảnh (tùy chọn)"}
                  </span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setThumbnail(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="upload-submit-button"
            disabled={isSubmitting}
          >
            <FiUpload />
            {isSubmitting ? "Đang tải lên..." : "Tải lên"}
          </button>

          {message && (
            <div
              className={`upload-message-box ${
                message.includes("thành công")
                  ? "upload-success"
                  : "upload-error"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
