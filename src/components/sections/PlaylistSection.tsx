import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import api from "@/utils/api";
import { Playlist } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import BaseModal from "@/components/ui/BaseModal";
import "@/components/sections/PlaylistSection.css";

const PlaylistSection = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const fetchPlaylists = useCallback(async () => {
    try {
      const res = await api.get("/playlists");
      setPlaylists(res.data as Playlist[]);
    } catch (err) {
      console.error("Failed to fetch playlists:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleCreatePlaylist = async () => {
    if (!name || !thumbnailFile) {
      return alert("Vui lòng nhập tên và chọn ảnh thumbnail!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("thumbnail", thumbnailFile);

    try {
      await api.post("/playlists", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Playlist created!");
      setIsModalOpen(false);
      setName("");
      setThumbnailFile(null);
      fetchPlaylists();
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi tạo playlist.");
    }
  };

  const handleDelete = async (playlistId: number) => {
    if (!token) return alert("Bạn cần đăng nhập để thực hiện thao tác này!");
    if (!window.confirm("Bạn chắc chắn muốn xoá playlist này?")) return;

    try {
      await api.delete(`/playlists/${playlistId}`);
      alert("Xoá playlist thành công!");
      fetchPlaylists();
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi xoá playlist!");
    }
  };

  const renderContent = () => {
    if (loading) return <p>Đang tải playlists...</p>;
    if (!playlists.length) return <p>Không tìm thấy playlists.</p>;

    return (
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
                  src={playlist.thumbnailUrl}
                  alt={playlist.name}
                  className="playlist-image"
                />
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(Number(playlist.id));
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
              <span className="font-medium">{playlist.name}</span>
            </div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className="playlist-list-section">
      <button
        className="add-playlist-button"
        onClick={() => setIsModalOpen(true)}
      >
        + Thêm Playlist mới
      </button>

      <BaseModal
        isOpen={isModalOpen}
        title="Thêm Playlist mới"
        onClose={() => setIsModalOpen(false)}
      >
        <input
          type="text"
          placeholder="Tên playlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleCreatePlaylist}>Tạo Playlist</button>
      </BaseModal>

      {renderContent()}
    </div>
  );
};

export default PlaylistSection;
