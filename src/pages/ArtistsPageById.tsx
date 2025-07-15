import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistImageSection from "@/components/sections/ArtistImageSection";
import PopularSong from "@/components/sections/PopularSong";
import TopAlbums from "@/components/sections/TopAlbums";
import { Artist } from "@/types";
import api from "@/utils/api";

export default function ArtistsPageById() {
  const { id } = useParams<{ id: string }>();
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [popularSongs, setPopularSongs] = useState([]);

  // ✅ Luôn luôn đặt hook ở đầu
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/identity/artists/${id}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setArtistData(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    if (id) fetchArtist();
  }, [id]);

  useEffect(() => {
    const fetchPopularSongs = async () => {
      try {
        const response = await api.get(`/identity/api/songs/artist/${id}`);
        setPopularSongs(response.data.result.content);
      } catch (error) {
        console.error("Error fetching popular songs:", error);
      }
    };

    if (id) fetchPopularSongs();
  }, [id]);

  if (!artistData) return <p>Loading artist...</p>;

  return (
    <div className="page-container">
      <ArtistImageSection
        imgUrl={`http://localhost:8080/identity/audio/${artistData.avatar}`}
        name={artistData.name}
      />

      {popularSongs.length > 0 && <PopularSong songs={popularSongs} />}

      {artistData.albums && artistData.albums.length > 0 && (
        <TopAlbums albums={artistData.albums} />
      )}
    </div>
  );
}
