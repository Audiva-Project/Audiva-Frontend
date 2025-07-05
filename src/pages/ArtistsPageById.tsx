import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistImageSection from "@/components/sections/ArtistImageSection";
import PlaylistSection from "@/components/sections/PlaylistSection";
import PopularArtist from "@/components/sections/PopularArtist";
import PopularSong from "@/components/sections/PopularSong";
import TopAlbums from "@/components/sections/TopAlbums";
import { artist, playlists } from "@/data/mockData";
import { Artist } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";

export default function ArtistsPageById() {
  const { id } = useParams<{ id: string }>();
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const token = useAuthStore((state: AuthState) => state.token);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/identity/artists/${id}`,
          {
            // headers: {
            //   "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`
            // }
          }
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

  if (!artistData) return <p>Loading artist...</p>;

  return (
    <div className="page-container">
      <ArtistImageSection
        imgUrl={`http://localhost:8080/identity/audio/${artistData.avatar}`}
        name={artistData.name}
      />
      <PopularSong
        songs={artistData.albums.flatMap((album) =>
          album.songs.map((song) => ({
            ...song,
            album: album.title, // Gán tên album
          }))
        )}
      />
      <PlaylistSection />
      <TopAlbums albums={artistData.albums} />
      <PopularArtist
        title={{
          main: `${artistData.name} Fans `,
          highlight: "Also Listen To",
        }}
        artists={artist}
      />
    </div>
  );
}
