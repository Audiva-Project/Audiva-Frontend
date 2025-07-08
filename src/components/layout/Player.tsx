"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Heart,
  VolumeX,
  Download,
  Mic,
  ListMusic,
} from "lucide-react";
import type { Song } from "@/types";
import "./Player.css";
import { logListening } from "@/utils/listeningHistory";
import { AuthState, useAuthStore } from "@/stores/authStore";
import { useKaraoke } from "@/hooks/useKaraoke";
import KaraokeOverlay from "../sections/KaraokeOverlay";

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setCurrentSong: (song: Song) => void;
  songs: Song[];
}

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
}: PlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAddedToPlaylist, setIsAddedToPlaylist] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const { lyrics, activeIndex } = useKaraoke(currentSong?.id, audioRef);

  type RepeatMode = "off" | "repeat-one" | "repeat-all";
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const token = useAuthStore((state: AuthState) => state.token);
  const user = useAuthStore((state) => state.user);
  const isPremiumUser = useAuthStore((state) => state.premium);

  const favoriteId = user?.playlists?.find(
    (p) => p.name?.toLowerCase() === "favoritelist"
  )?.id;
  const playlistId = user?.playlists?.find(
    (p) => p.name?.toLowerCase() === "playlist"
  )?.id;

  const handleAddToFavorites = async () => {
    if (!token) return alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    if (!favoriteId) return alert("Favorite Playlist ID không tồn tại!");
    if (!currentSong) return alert("Không có bài hát nào được chọn!");

    try {
      const response = await fetch(
        `http://localhost:8080/identity/api/playlists/${favoriteId}/add/${currentSong.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Đã thêm bài hát vào Favorites!");
        setIsLiked(true);
      } else {
        alert("Thêm bài hát thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleAddToPlaylist = async () => {
    if (!token) return alert("Bạn cần đăng nhập để sử dụng tính năng này!");
    if (!playlistId) return alert("Playlist ID không tồn tại!");
    if (!currentSong) return alert("Không có bài hát nào được chọn!");

    try {
      const response = await fetch(
        `http://localhost:8080/identity/api/playlists/${playlistId}/add/${currentSong.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Đã thêm bài hát vào Playlist!");
        setIsAddedToPlaylist(true);
      } else {
        alert("Thêm bài hát thất bại!");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      switch (prev) {
        case "off":
          return "repeat-one";
        case "repeat-one":
          return "repeat-all";
        case "repeat-all":
          return "off";
      }
    });
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          if (currentSong?.id) logListening(currentSong.id, token || "");
        })
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current && !isSeeking)
      setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    if (repeatMode === "repeat-one") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleSkipForward();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) =>
    seek(e.clientX);
  const handleSeekStart = () => setIsSeeking(true);
  const handleSeekMove = (e: MouseEvent) => isSeeking && seek(e.clientX);
  const handleSeekEnd = () => setIsSeeking(false);

  useEffect(() => {
    if (isSeeking) {
      document.addEventListener("mousemove", handleSeekMove);
      document.addEventListener("mouseup", handleSeekEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleSeekMove);
      document.removeEventListener("mouseup", handleSeekEnd);
    };
  }, [isSeeking]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = repeatMode === "repeat-one";
  }, [repeatMode]);

  const seek = (clientX: number) => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(offsetX, rect.width));
    const seekTime = (clampedX / rect.width) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleShuffle = () => setIsShuffling(!isShuffling);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (volume > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  }, [volume]);

  const handleSkipForward = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex(
      (s) => Number(s.id) === Number(currentSong.id)
    );
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handleSkipBack = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  useEffect(() => {
    setIsLiked(false);
    setIsAddedToPlaylist(false);
  }, [currentSong]);

  useEffect(() => {
    console.log("Current song changed:", currentSong);
    if (!audioRef.current || isPremiumUser || !currentSong?.premium) return;
    const checkTime = () => {
      if (audioRef.current && audioRef.current.currentTime >= 30) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    const interval = setInterval(checkTime, 500);
    return () => clearInterval(interval);
  }, [isPremiumUser, currentSong?.premium, isPlaying]);

  // reset trạng thái khi đổi bài
  useEffect(() => {
    setIsLiked(false)
    setIsAddedToPlaylist(false)
  }, [currentSong])

  return (
    <div className="player">
      {/* Left */}
      <div className="player-left">
        <div className="current-track">
          <div className="track-image">
            {currentSong?.thumbnailUrl && (
              <img
                src={`http://localhost:8080/identity/audio/${currentSong.thumbnailUrl}`}
                alt={currentSong.title}
              />
            )}
          </div>
          <div className="track-info">
            <div className="track-title">
              {currentSong?.title || "No song selected"}
            </div>
            <div className="track-artist">
              {currentSong &&
                currentSong.artists &&
                currentSong.artists.length > 0
                ? currentSong.artists.map((a) => a.name).join(", ")
                : "Unknown Artist"}
            </div>
          </div>
        </div>
      </div>

      {/* Center */}
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn" onClick={toggleShuffle}>
            <Shuffle size={16} color={isShuffling ? "#1db954" : "white"} />
          </button>
          <button className="control-btn" onClick={handleSkipBack}>
            <SkipBack size={20} />
          </button>
          <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn" onClick={handleSkipForward}>
            <SkipForward size={20} />
          </button>
          <button className="control-btn">
            <Repeat
              size={16}
              color={repeatMode !== "off" ? "#1db954" : "white"}
              style={{
                transform:
                  repeatMode === "repeat-one" ? "rotate(360deg)" : "none",
                transition: "transform 0.3s",
              }}
              onClick={toggleRepeat}
            />
          </button>
        </div>

        <div className="progress-container">
          <span className="time-text">{formatTime(currentTime)}</span>
          <div
            className="progress-bar"
            ref={progressBarRef}
            onClick={handleSeekClick}
            onMouseDown={handleSeekStart}
          >
            <div
              className="progress-fill"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            {!isPremiumUser && currentSong?.premium && duration > 0 && (
              <div
                className="premium-marker"
                style={{ left: `${(30 / duration) * 100}%` }}
              />
            )}
          </div>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="player-right">
        <button className="like-btn" onClick={handleAddToFavorites}>
          <Heart
            size={16}
            color={isLiked ? "#1db954" : "white"}
            fill={isLiked ? "#1db954" : "none"}
          />
        </button>
        <button className="upload-btn" onClick={handleAddToPlaylist}>
          <ListMusic
            size={18}
            color={isAddedToPlaylist ? "#1db954" : "white"}
            fill={isAddedToPlaylist ? "#1db954" : "none"}
          />
        </button>
        <button className="download-btn">
          <a
            href={`http://localhost:8080/identity/api/songs/${currentSong?.id}/download`}
            download
          >
            <Download size={18} />
          </a>
        </button>
        <button className="karaoke-btn" onClick={() => setShowLyrics(!showLyrics)}>
          <Mic size={18} color={showLyrics ? "#1db954" : "white"} />
        </button>
        {showLyrics && (
          <KaraokeOverlay
            song={currentSong}
            lyrics={lyrics}
            activeIndex={activeIndex}
            onClose={() => setShowLyrics(false)}
          />
        )}

        <div className="volume-container">
          <button onClick={toggleMute} className="volume-icon">
            {isMuted ? (
              <VolumeX size={25} color="#a855f7" />
            ) : (
              <Volume2 size={25} color="white" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>

      {currentSong?.audioUrl && (
        <audio
          key={currentSong?.id}
          ref={audioRef}
          src={`http://localhost:8080/identity/audio/${currentSong.audioUrl}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}
    </div>
  );
};

export default Player;
