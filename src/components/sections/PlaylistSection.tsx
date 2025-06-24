import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import { playlists } from "@/data/mockData";
import "./PlaylistSection.css";

const PlaylistSection = () => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    Playlist <span className="title-highlight">Mood</span>
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
