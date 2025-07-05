import { useEffect, useState } from "react";
import "@/components/sections/PlaylistSection.css";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Recycle, Trash } from "lucide-react";

const PlaylistSection = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state: AuthState) => state.token);
  console.log("Token in PlaylistSection:", token);

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
  const handleDelete = async (playlistId: number) => {
    if (!token) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này!");
      return;
    }

    if (!window.confirm("Bạn chắc chắn muốn xoá playlist này?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/identity/api/playlists/${playlistId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Xoá playlist thành công!");
        window.location.reload();
      } else {
        alert("Xoá playlist thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi!");
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
  // if (!playlists.length) return <p>No playlists found.</p>;

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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(playlist.id);
                    }}
                    className="delete-btn"
                  >
                    <Trash size={18} />
                  </button>
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
