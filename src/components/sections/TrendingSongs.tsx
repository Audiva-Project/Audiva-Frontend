import { ChevronRight } from "lucide-react";
import TrendingRow from "@/components/ui/TrendingRow";
import "@/components/sections/TrendingSongs.css";
import api from "@/utils/api";

import type { Song } from "@/types";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

interface LayoutContext {
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const TrendingSongs = () => {
  const { songs, setSongs } = useOutletContext<LayoutContext>();

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await api.get("/identity/api/songs");
        const data = response.data as { content?: Song[] };
        const fetchedSongs = data.content || [];

        const sortedSongs = fetchedSongs.sort(
          (a: Song, b: Song) => (b.playCount || 0) - (a.playCount || 0)
        );

        setSongs(sortedSongs);
      } catch (error) {
        console.error("Error fetching trending songs:", error);
      }
    };

    fetchTrendingSongs();
  }, [setSongs]);

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2 className="section-title">
          Trending <span className="title-highlight">Songs</span>
        </h2>
        <button className="view-all-btn">
          Xem thêm
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="trending-table">
        <div className="trending-header">
          <div className="header-cell rank">#</div>
          <div className="header-cell song">Bài hát</div>
          <div className="header-cell album">Album</div>
          <div className="header-cell play">Số lượt nghe</div>
        </div>

        <div className="trending-body">
          {songs.map((song, index) => (
            <TrendingRow
              key={`${song.id}-${index}`}
              song={song}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSongs;
