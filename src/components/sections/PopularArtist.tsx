import { ChevronRight } from "lucide-react";
import "./PopularArtist.css";

interface ArtistSectionProps {
    title: {
        main: string;
        highlight: string;
    };
    artists: Array<any>;
    // onViewAllClick?: () => void;
}

const PopularArtist: React.FC<ArtistSectionProps> = ({title, artists}) => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    {title.main} <span className="title-highlight">{title.highlight}</span>
                </h2>
                <button className="view-all-btn">
                    View All
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="songs-grid">
                {artists.map((artist) => (
                    <div key={artist.id} className="artist-card">
                        <div className="artist-image-container">
                            <img
                                src={`http://localhost:8080/identity/audio/${artist.avatar}`}
                                alt={artist.name}
                                className="artist-image"
                            />
                        </div>
                        <div className="artist-info">
                            <h4 className="artist-name">{artist.name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularArtist;
