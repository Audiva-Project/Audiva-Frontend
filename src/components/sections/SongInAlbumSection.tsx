import React from "react";
import "@/components/sections/SongInAlbumSection.css";
import SongCard from "@/components/ui/SongCard";
import { Song } from "@/types";

interface SongInAlbumSectionProps {
  albumTitle: string;
  songs: Song[];
}

const SongInAlbumSection: React.FC<SongInAlbumSectionProps> = ({
  albumTitle,
  songs,
}) => {
  return (
    <div className="song-in-album-section">
      <h2 className="album-title">{albumTitle}</h2>
      <div className="songs-grid">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongInAlbumSection;
