import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import "./PlaylistSection.css";
import { Link } from "react-router-dom";

interface TopAlbumsProps {
    albums: { id: number; title: string; thumbnailUrl: string }[];
    title?: string;
}

const TopAlbums: React.FC<TopAlbumsProps> = ({ albums, title }) => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    {title ?? (
                        <>Top <span className="title-highlight">Albums</span></>
                    )}
                </h2>
                <button className="view-all-btn">
                    <Link to="/albums" className="view-all-btn">
                        View All
                        <ChevronRight size={16} />
                    </Link>
                </button>
            </div>
            <div className="genres-grid">
                {albums.map((album) => (
                    <Link to={`/albums/${album.id}`} key={album.id} className="album-link">
                        <GenreCard
                            genre={{
                                id: album.id.toString(),
                                name: album.title,
                                thumbnailUrl: album.thumbnailUrl,
                            }}
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default TopAlbums;
