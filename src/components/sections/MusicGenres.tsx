<<<<<<< HEAD
import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import { genres } from "@/data/mockData";
import "./MusicGenres.css";

const MusicGenres = () => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    Music <span className="title-highlight">Genres</span>
                </h2>
                <button className="view-all-btn">
                    Xem thêm
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="genres-grid">
                {genres.map((genre) => (
                    <GenreCard key={genre.id} genre={genre} />
                ))}
            </div>
        </section>
    );
};

export default MusicGenres;
=======
import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import { genres } from "@/data/mockData";
import "./MusicGenres.css";

const MusicGenres = () => {
  return (
    <section className="music-genres-section">
      <div className="section-header">
        <h2 className="section-title">
          Music <span className="title-highlight">Genres</span>
        </h2>
        <button className="view-all-btn">
          View All
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="genres-grid">
        {genres.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </section>
  );
};

export default MusicGenres;
>>>>>>> c0e832ac768acf1ed0ac675b1767b24540ea0898
