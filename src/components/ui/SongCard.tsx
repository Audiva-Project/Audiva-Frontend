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

const SongCard = ({
  song,
  showArtist = true,
}: {
  song: Song;
  showArtist?: boolean;
}) => {
  const { setCurrentSong, setIsPlaying, currentSong, isPlaying } =
    useOutletContext<OutletContextType>();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const token = useAuthStore((state: AuthState) => state.token);

  const user = useAuthStore((state) => state.user);

  const playlistId = user?.playlists?.find(
    (p) => p.name?.toLocaleLowerCase() === "playlist"
  )?.id;
  const favoriteId = user?.playlists?.find(
    (p) => p.name?.toLocaleLowerCase() === "favoritelist"
  )?.id;

  // console.log("playlistId:", playlistId)
  // console.log("favoriteId:", favoriteId)

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
        alert("Song added successfully!");
      } else {
        alert("Failed to add song.");
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

  const handlePlayClick = () => {
    if (isCurrent) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
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
                <li onClick={() => handleAddTo(playlistId)}>Add to Playlist</li>
                <li onClick={() => handleAddTo(favoriteId)}>
                  Add to Favorites list
                </li>
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
                  <Link
                    key={artist.id}
                    to={`/artists/${artist.id}`}
                    className="artist-link"
                  >
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
