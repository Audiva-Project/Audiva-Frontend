import PlaylistlistSection from "@/components/sections/PlaylistSection";
import { useAuthStore } from "@/stores/authStore";
import "@/pages/PlaylistPage.css";

const PlaylistPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="playlist-page">
        <h1 className="playlist-heading">PLAYLIST CỦA BẠN</h1>
        <p className="playlist-message">
          Bạn cần đăng nhập để thêm vào danh sách phát và tạo danh sách phát của
          riêng bạn.
        </p>
      </div>
    );
  }

  return (
    <div className="playlist-page">
      <h1 className="playlist-heading">PLAYLIST CỦA BẠN</h1>
      <PlaylistlistSection />
    </div>
  );
};

export default PlaylistPage;
