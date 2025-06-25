import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import "./PlaylistSection.css";
import React from "react";

interface Title {
    main: string;
    highlight: string;
}

interface PlaylistSectionProps {
  title: Title;
  playlists: Array<any>;
  //onViewAllClick?: () => void;
}

const PlaylistSection: React.FC<PlaylistSectionProps> = ({title, playlists}) => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    {title.main}<span className="title-highlight">{title.highlight}</span>
                </h2>
                <button className="view-all-btn">
                    View All
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="genres-grid">
                {playlists.map((playlist) => (
                    <GenreCard key={playlist.id} genre={playlist} />
                ))}
            </div>
        </section>
    );
};

export default PlaylistSection;
