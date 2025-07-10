import { useEffect, useState } from "react";
import "@/components/sections/PlaylistSection.css";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import api from "@/utils/api";

const PlaylistSection = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const fetchPlaylists = async () => {
    try {
      const response = await api.get("/identity/api/playlists");
      setPlaylists(response.data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewPlaylist = async () => {
    const name = prompt("Enter new playlist name:");
    if (!name) return;

    try {
      const formData = new FormData();
      formData.append("name", name);

      await api.post("/identity/api/playlists", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Playlist created!");
      await fetchPlaylists();
      await useAuthStore.getState().refreshUser();
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating playlist.");
    }
  };

  const handleDelete = async (playlistId: number) => {
    if (!token) {
      alert("Bạn cần đăng nhập để thực hiện thao tác này!");
      return;
    }

    if (!window.confirm("Bạn chắc chắn muốn xoá playlist này?")) return;

    try {
      await api.delete(`/identity/api/playlists/${playlistId}`);
      alert("Xoá playlist thành công!");

      await fetchPlaylists();
      await useAuthStore.getState().refreshUser();
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi khi xoá playlist!");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  if (loading) return <p>Loading playlists...</p>;
  if (!playlists.length) return <p>No playlists found.</p>;

  return (
    <div className="playlist-list-section">
      <button className="add-playlist-button" onClick={handleAddNewPlaylist}>
        + Add New Playlist
      </button>

      <div className="playlist-list">
        {playlists.map((playlist) => (
          <section
            key={playlist.id}
            className="playlist-section"
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          >
            <div className="playlist-card">
              <div className="playlist-image-container">
                <img
                  src={`http://localhost:8080/identity/audio/${playlist.thumbnailUrl}`}
                  alt={playlist.name}
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
              <span className="font-medium">{playlist.name}</span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PlaylistSection;
