import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";

type Artist = {
  id: number;
  name: string;
  avatarUrl?: string;
  bio?: string;
};

const ArtistPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useAuthStore((state: AuthState) => state.token);

  useEffect(() => {
    fetch("http://localhost:8080/identity/artists", {
      // headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`
      // }
    })
      .then((res) => res.json())
      .then((data) => {
        setArtists(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading artists...</div>;

  return (
    <div className="artist-page">
      <h1 className="section-title">Artists List</h1>
      <div className="artist-list">
        {artists.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <Link
              key={artist.id}
              to={`/artists/${artist.id}`}
              className="artist-link"
            >
              <div className="artist-image-container">
                <img
                  src={
                    artist.avatarUrl ? artist.avatarUrl : "/default-avatar.png"
                  }
                  alt={artist.name}
                  className="artist-image"
                />
              </div>
              <h2 className="artist-name">{artist.name}</h2>
              <p className="artist-bio">{artist.bio}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
