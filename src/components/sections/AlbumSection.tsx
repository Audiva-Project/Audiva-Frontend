import { Album, Song } from "@/types";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import SongCard from "../ui/SongCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "@/utils/api";

interface AlbumSectionProps {
  albumId: number;
}

interface LayoutContext {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const AlbumSection = ({ albumId }: AlbumSectionProps) => {
  const [localSongs, setLocalSongs] = useState<Song[]>([]);
  const [albumTitle, setAlbumTitle] = useState<string>("");
  const { setSongs } = useOutletContext<LayoutContext>();
  const album4songs = localSongs.slice(0, 4);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<{ code: number; result: Album }>(`/albums/${albumId}`)
      .then((res) => {
        const fetchedSongs = res.data.result.songs || [];
        setLocalSongs(fetchedSongs);
        setAlbumTitle(res.data.result.title || "Untitled Album");
        setSongs((prev) => [...prev, ...fetchedSongs]);
      })
      .catch((err) => console.error("Error loading songs:", err));
  }, [albumId]);

  const handleViewAllClick = () => {
    navigate(`/albums/${albumId}`);
  };

  return (
    <section className="songs-section">
      <div className="section-header">
        <h2 className="section-title">{albumTitle}</h2>
        <button className="view-all-btn" onClick={handleViewAllClick}>
          Xem thêm
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="songs-grid">
        {album4songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default AlbumSection;
