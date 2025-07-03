import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "@/components/ui/SongCard";
import { useAuthStore } from "@/stores/authStore";

interface Song {
  id: number;
  title: string;
  audioUrl: string;
  thumbnailUrl: string;
  artists: { id: number; name: string }[];
  album: string;
  releaseDate: string;
}

const SongInPlaylistPage = () => {
  const { id } = useParams<{ id: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!id) return;

    const fetchSongsInPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/identity/api/playlists/${id}/songs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch songs");

        const data = await response.json();
        console.log("Songs in playlist:", data);
        setSongs(data);
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
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SongInPlaylistPage;
