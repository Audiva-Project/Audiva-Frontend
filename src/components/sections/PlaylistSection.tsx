import { useEffect, useState } from "react";
import "@/components/sections/PlaylistSection.css";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

const PlaylistSection = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state: AuthState) => state.token);
  const navigate = useNavigate();
  const handleAddNewPlaylist = async () => {
    const name = prompt("Enter new playlist name:");
    if (!name) return;

    try {
      // const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("name", name);
      const response = await fetch(
        "http://localhost:8080/identity/api/playlists",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Playlist created!");
        // Gọi lại GET để refresh list
        const newPlaylists = await fetch(
          "http://localhost:8080/identity/api/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        setPlaylists(newPlaylists);
      } else {
        alert("Failed to create playlist.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating playlist.");
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem('access_token');
    fetch("http://localhost:8080/identity/api/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading playlists...</p>;
  if (!playlists.length) return <p>No playlists found.</p>;

  return (
    <div className="playlist-list-section">
      <button className="add-playlist-button" onClick={handleAddNewPlaylist}>
        + Add New Playlist
      </button>

      <div className="playlist-list">
        {playlists.map((playlist) => {
          const { name } = playlist;

          return (
            <section
              key={playlist.id}
              className="playlist-section"
              onClick={() => navigate(`/playlist/${playlist.id}`)}
            >
              <div className="playlist-card">
                <div className="playlist-image-container">
                  <img
                    src={`http://localhost:8080/identity/audio/${playlist.thumbnailUrl}`}
                    alt={name}
                    className="playlist-image"
                  />
                </div>
                <span className="font-medium">{name}</span>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistSection;