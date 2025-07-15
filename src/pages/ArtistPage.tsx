import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import { useAuthStore } from "@/stores/authStore";
import type { AuthState } from "@/stores/authStore";
import PopularArtist from "@/components/sections/PopularArtist";

type Artist = {
  id: number;
  name: string;
  avatar?: string;
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
    <PopularArtist title={{ main: "", highlight: "" }} artists={artists} />
  );
};

export default ArtistPage;
