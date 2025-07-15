import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import PopularArtist from "@/components/sections/PopularArtist";
import Banner from "@/components/sections/Banner";

type Artist = {
  id: number;
  name: string;
  avatar?: string;
  bio?: string;
};

const ArtistPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      <Banner
        title="Khám Phá Nghệ Sĩ"
        subtitle="Tìm hiểu về những nghệ sĩ yêu thích của bạn và khám phá âm nhạc mới"
      />

      <div className="artist-content">
        <PopularArtist
          title={{ main: "Nghệ Sĩ", highlight: "Nổi Bật" }}
          artists={artists}
        />
      </div>
    </div>
  );
};

export default ArtistPage;
