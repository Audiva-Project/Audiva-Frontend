import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";
import api from "@/utils/api";
import type { Song } from "@/types";
import SongCard from "@/components/ui/SongCard";
import "@/components/ui/SongCard.css";
import "./RecentlyAddedPage.css";

const RecentlyAddedPage = () => {
  const token = useAuthStore((state: AuthState) => state.token);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchRecentlyAdded = async () => {
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      try {
        const response = await api.get("/songs/created-by-me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const content = response.data.result.content;
        setSongs(content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentlyAdded();
  }, [token]);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="recently-page">
        <h1 className="recently-heading">BÀI HÁT CỦA BẠN</h1>
        <p className="recently-message">
          Bạn cần đăng nhập để đăng tải các bài hát của bạn.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="section-title">BÀI HÁT CỦA BẠN</h1>

      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} style={{ marginBottom: "20px" }}>
            <SongCard song={song} showArtist={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedPage;
