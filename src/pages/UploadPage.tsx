import React, { useState } from "react";
import "./UploadPage.css"; 
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore"

const UploadPage: React.FC = () => {
  const [songName, setSongName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const token = useAuthStore((state: AuthState) => state.token)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName || !file) {
      setMessage("Please input song name and select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("title", songName);
    formData.append("audioFile", file);
    if (thumbnail) {
      formData.append("thumbnailFile", thumbnail);
    }

    try {
      const response = await fetch("http://localhost:8080/identity/api/songs", {
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`
        },
        body: formData,
      });
      if (response.ok) {
        setMessage("Upload successful!");
        setSongName("");
        setFile(null);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Song</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div>
          <label>
            Song Name:
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            File mp3:
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
        <div>
          <label>
            Song Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              // @ts-ignore
              setThumbnail(e.target.files[0]);
            }
              }}
            />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadPage;
