import AlbumSection from "@/components/sections/AlbumSection";
import Banner from "@/components/sections/Banner";
import "@/components/sections/SongsSection.css";
import api from "@/utils/api";
import { useEffect, useState } from "react";

type Album = { id: string | number; [key: string]: any };

const AlbumPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data as Album[]);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <div className="album-page">
      <Banner
        title="Thư Viện Album"
        subtitle="Khám phá những album hay nhất từ các nghệ sĩ yêu thích của bạn"
      />
      {albums.map((album) => (
        <AlbumSection key={album.id} albumId={Number(album.id)} />
      ))}
    </div>
  );
};

export default AlbumPage;
