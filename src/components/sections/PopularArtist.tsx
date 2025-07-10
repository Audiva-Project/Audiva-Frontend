import { Link } from "react-router-dom";
import "./PopularArtist.css";
import { Artist } from "@/types";

interface ArtistSectionProps {
  title: {
    main: string;
    highlight: string;
  };
  artists: Artist[];
}

const PopularArtist: React.FC<ArtistSectionProps> = ({ title, artists }) => {
  return (
    <section className="music-genres-section">
      <div className="section-header">
        <h1 className="artist-heading">TOP NGHỆ SĨ</h1>
        {/* <h2 className="section-title">
          {title.main}{" "}
          <span className="title-highlight">{title.highlight}</span>
        </h2> */}
        {/* // <button className="view-all-btn">
        //   View All
        //   <ChevronRight size={16} />
        // </button> */}
      </div>
      <div className="artist-list">
        {artists.map((artist) => (
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
