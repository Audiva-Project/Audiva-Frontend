import { ChevronRight } from "lucide-react";
import { artist } from "@/data/mockData";
import "./PopularArtist.css";

const PopularArtist = () => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    Popular <span className="title-highlight">Artists</span>
                </h2>
                <button className="view-all-btn">
                    View All
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="songs-grid">
                {artist.map((artist) => (
                    <div className="artist-card">
                        <div className="artist-image-container">
                            <img
                                src={artist.coverUrl}
                                alt={artist.name}
                                className="artist-image"
                            />
                        </div>
                        <div className="artist-info">
                            <h3 className="artist-name">{artist.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularArtist;
