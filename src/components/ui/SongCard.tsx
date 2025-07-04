import { Play, Pause, MoreHorizontal } from "lucide-react";
import type { Song } from "@/types";
import { Link, useOutletContext } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./SongCard.css";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";

interface OutletContextType {
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const SongCard = ({ song, showArtist = true, playlistId }: { song: Song; showArtist?: boolean, playlistId?: number }) => {
  const { setCurrentSong, setIsPlaying, currentSong, isPlaying } =
    useOutletContext<OutletContextType>();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const token = useAuthStore((state: AuthState) => state.token);
  const user = useAuthStore((state) => state.user);
  
  const defaultPlaylistId = user?.playlists?.find((p) => p.name?.toLowerCase() === "playlist")?.id;
  const defaultFavoriteId = user?.playlists?.find((p) => p.name?.toLowerCase() === "favoritelist")?.id;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddTo = async (playlistId: number | undefined) => {
    if (!token) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }
    if (!playlistId) {
      alert("Playlist ID không tồn tại!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/identity/api/playlists/${playlistId}/add/${song.id}`,
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
      setShowMenu(false);
    }
  };
  const handleRemoveFromPlaylist = async () => {
    if (!token) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }
    if (!playlistId) {
      alert("Playlist ID không tồn tại!");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/identity/api/playlists/${playlistId}/remove/${song.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.ok) {
        alert("Bài hát đã được xoá khỏi playlist");
        window.location.reload(); // hoặc gọi callback để cập nhật list
      } else {
        alert("Xoá thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setShowMenu(false);
    }
  };


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const isCurrent = currentSong?.id === song.id;
  const isThisPlaying = isCurrent && isPlaying;

  const handlePlayClick = async () => {
    if (isCurrent) {
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

  const thumbnailUrl = song.thumbnailUrl
    ? `http://localhost:8080/identity/audio/${song.thumbnailUrl}`
    : "/placeholder.svg";

  return (
    <div className="song-card">
      <div className="song-image-container">
        <img src={thumbnailUrl} alt={song.title} className="song-image" />
        <div className="play-overlay" ref={menuRef}>
          <button className="play-button" onClick={handlePlayClick}>
            {isThisPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>
          <button className="more-options-button" onClick={toggleMenu}>
            <MoreHorizontal size={20} fill="currentColor" />
          </button>
          {showMenu && (
            <div className="options-popup">
              <ul>
                {user?.playlists?.map((playlist) => (
                  <li key={playlist.id} onClick={() => handleAddTo(playlist.id)}>
                    Add to {playlist.name}
                  </li>
                ))}
                {playlistId && (
                  <li onClick={handleRemoveFromPlaylist}>
                    Remove from this playlist
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        {showArtist && (
          <p className="song-artist">
            {song.artists && song.artists.length > 0
              ? song.artists.map((artist, index) => (
                <Link key={artist.id} to={`/artists/${artist.id}`} className="artist-link">
                  {artist.name}
                  {index < song.artists.length - 1 ? ", " : ""}
                </Link>
              ))
              : "Unknown Artist"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SongCard;
