"use client";

import { useState, useEffect } from "react";
import { Crown, MoreHorizontal, Star } from "lucide-react";
import type { Song } from "@/types";
import api from "@/utils/api";
import { useOutletContext } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import "@/components/sections/SuggestSongSection.css";

interface OutletContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SuggestSongSection = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenuId, setShowMenuId] = useState<number | null>(null);

  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } =
    useOutletContext<OutletContextType>();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // Fetch all songs
  const fetchAllSongs = async () => {
    let all: Song[] = [];
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await api.get(
        `/identity/api/songs?page=${page}&size=50`
      );
      const data = response.data as { content: Song[]; last: boolean };
      all = all.concat(data.content || []);
      hasMore = !data.last;
      page++;
    }
    return all;
  };

  // Load all songs once
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songs = await fetchAllSongs();
        setAllSongs(songs);
        setSuggestedSongs(getRandomSongs(songs));
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenuId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const getRandomSongs = (songs: Song[]) => {
    const shuffled = [...songs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  };

  const handleRefresh = () => {
    if (allSongs.length > 0) {
      setSuggestedSongs(getRandomSongs(allSongs));
    }
  };

  const handlePlay = async (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      try {
        await fetch(
          `http://localhost:8080/identity/api/songs/${song.id}/play`,
          {
            method: "POST",
          }
        );
      } catch (error) {
        console.error("Error increasing play count:", error);
      }
    }
  };

  const handleAddTo = async (playlistId: number, songId: number) => {
    console.log("Add to:", playlistId, songId);
    if (!token) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/identity/api/playlists/${playlistId}/add/${songId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Bài hát được thêm thành công!");
      } else {
        alert("Bài hát đã tồn tại trong playlist.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setShowMenuId(null);
    }
  };

  return (
    <section className="suggest-section">
      <div className="suggest-header">
        <h2 className="section-title">🎧 Gợi Ý Bài Hát</h2>
        <button onClick={handleRefresh} className="suggest-refresh">
          🔄 Làm mới
        </button>
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : suggestedSongs.length === 0 ? (
        <p>Không có bài hát gợi ý.</p>
      ) : (
        <div className="suggest-list">
          {suggestedSongs.map((song) => {
            const isCurrent = currentSong?.id === song.id;
            const isThisPlaying = isCurrent && isPlaying;
            return (
              <div key={song.id} className="suggest-item">
                <img
                  className="suggest-thumb"
                  src={`http://localhost:8080/identity/audio/${song.thumbnailUrl}`}
                  alt={song.title}
                  onClick={() => handlePlay(song)}
                />
                <div className="suggest-info" onClick={() => handlePlay(song)}>
                  <div className="suggest-song-title flex items-center gap-1">
                    {song.title}
                    {song.premium && (
                      <Crown
                        size={16}
                        color="#facc15"
                        className="text-yellow-400 premium-icon"
                      />
                    )}
                  </div>
                  <div className="suggest-song-artist">
                    {song.artists.map((a) => a.name).join(", ")}
                  </div>
                </div>

                <div className="suggest-actions">
                  <button
                    className="more-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenuId(showMenuId === song.id ? null : song.id);
                    }}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {showMenuId === song.id && (
                    <div
                      className="options-popup"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ul>
                        {(user?.playlists || []).map((playlist) => (
                          <li
                            key={playlist.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddTo(playlist.id, song.id);
                            }}
                          >
                            Add to {playlist.name}
                          </li>
                        ))}
                        {(!user?.playlists || user.playlists.length === 0) && (
                          <li>(Chưa có playlist)</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SuggestSongSection;
