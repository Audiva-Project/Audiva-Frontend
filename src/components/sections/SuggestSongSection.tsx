"use client";

import { useState, useEffect } from "react";
import type { Song } from "@/types";
import api from "@/utils/api";
import { useOutletContext } from "react-router-dom";
import "./SuggestSongSection.css";

interface OutletContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SuggetSongSection = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } =
    useOutletContext<OutletContextType>();

  const getRandomSongs = (songs: Song[]) => {
    const shuffled = [...songs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 9);
  };

  const fetchAllSongs = async () => {
    let all: Song[] = [];
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      const response = await api.get(`/identity/api/songs?page=${page}&size=50`);
      const data = response.data as { content: Song[]; last: boolean };
      const pageSongs: Song[] = Array.isArray(data.content) ? data.content : [];
      all = all.concat(pageSongs);
      hasMore = !data.last;
      page++;
    }

    return all;
  };

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
        await fetch(`http://localhost:8080/identity/api/songs/${song.id}/play`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Error increasing play count:", error);
      }
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
          {suggestedSongs.map((song) => (
            <div
              key={song.id}
              className={`suggest-item ${currentSong?.id === song.id ? "playing" : ""
                }`}
              onClick={() => handlePlay(song)}
            >
              <img
                className="suggest-thumb"
                src={`http://localhost:8080/identity/audio/${song.thumbnailUrl}`}
                alt={song.title}
              />
              <div className="suggest-info">
                <div className="suggest-song-title">{song.title}</div>
                <div className="suggest-song-artist">
                  {song.artists.map((a) => a.name).join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SuggetSongSection;
