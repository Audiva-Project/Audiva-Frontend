import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import SongCard from "@/components/ui/SongCard";
import { useAuthStore } from "@/stores/authStore";
import api from "@/utils/api";

interface Song {
  id: number;
  title: string;
  audioUrl: string;
  thumbnailUrl: string;
  artists: { id: number; name: string }[];
  album: string;
  releaseDate: string;
}

interface LayoutContext {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const SongInPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  const { setSongs: setLayoutSongs } = useOutletContext<LayoutContext>();

  useEffect(() => {
    if (!id) return;

    const fetchSongsInPlaylist = async () => {
      try {
        const response = await api.get(`/playlists/${id}/songs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSongs(response.data);
        setLayoutSongs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongsInPlaylist();
  }, [id, token]);

  if (loading) return <p>Loading songs...</p>;

  return (
    <div>
      <h1>Playlist Details</h1>
      {songs.length === 0 ? (
        <p>No songs found in this playlist.</p>
      ) : (
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} playlistId={Number(id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongInPlaylistPage;
