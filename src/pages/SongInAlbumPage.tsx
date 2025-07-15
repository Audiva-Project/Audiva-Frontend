import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import SongInAlbumSection from "@/components/sections/SongInAlbumSection";
import { Song } from "@/types";

interface Album {
  id: number;
  title: string;
  songs: Song[];
}

interface LayoutContext {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const SongInAlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const { setSongs } = useOutletContext<LayoutContext>();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/identity/api/albums/${id}`
        );
        console.log(response.data);
        const data = response.data as { result: Album };
        setAlbum(data.result);
        setSongs(data.result.songs || []);
      } catch (error) {
        console.error("Error fetching album:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!album) return <p>Album not found!</p>;

  return <SongInAlbumSection albumTitle={album.title} songs={album.songs} />;
};

export default SongInAlbumPage;
