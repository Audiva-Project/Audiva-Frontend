import { Link } from "react-router-dom";
import "./PopularArtist.css";
import { Artist } from "@/types";
import { ChevronRight } from "lucide-react";

interface ArtistSectionProps {
  title: {
    main: string;
    highlight: string;
  };
  artists: Artist[];
  limit?: number;
}

const PopularArtist: React.FC<ArtistSectionProps> = ({ title, artists, limit }) => {
  const displayArtist = limit ? artists.slice(0, limit) : artists;

  return (
    <section className="music-genres-section">
      <div className="section-header">
        <h2 className="section-title">
          {title.main}{" "}
          <span className="title-highlight">{title.highlight}</span>
        </h2>
        {limit && (
          <Link to="/artists" className="view-all-btn">
            Xem thêm <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className="artist-list">
        {displayArtist.map((artist) => (
          <div className="artist-card" key={artist.id}>
            <Link to={`/artists/${artist.id}`} className="artist-link">
              <div className="artist-image-container">
                <img
                  src={
                    artist.avatar
                      ? `http://localhost:8080/identity/audio/${artist.avatar}`
                      : "/default-avatar.png"
                  }
                  alt={artist.name}
                  className="artist-image"
                />
              </div>
              <div className="artist-info">
                <h4 className="artist-name">{artist.name}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularArtist;
