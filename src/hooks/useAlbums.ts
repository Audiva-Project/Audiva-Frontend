import { useEffect, useState } from "react";
import api from "@/utils/api";

export type Album = {
  id: number;
  title: string;
  thumbnailUrl: string;
};

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/albums");
        setAlbums(response.data as Album[]);
      } catch (err) {
        console.error("Error fetching albums", err);
      }
    };
    fetchArtists();
  }, []);

  return albums;
}
