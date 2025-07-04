import { ChevronRight } from "lucide-react";
import GenreCard from "@/components/ui/GenreCard";
import "./PlaylistSection.css";

interface TopAlbumsProps {
    albums: { id: number; title: string; thumbnailUrl: string }[];
}

const TopAlbums: React.FC<TopAlbumsProps> = ({ albums }) => {
    return (
        <section className="music-genres-section">
            <div className="section-header">
                <h2 className="section-title">
                    Top <span className="title-highlight">Albums</span>
                </h2>
                <button className="view-all-btn">
                    View All
                    <ChevronRight size={16} />
                </button>
            </div>
            <div className="genres-grid">
                {albums.map((album) => (
                    <GenreCard
                        key={album.id}
                        genre={{
                            id: album.id.toString(),
                            name: album.title,
                            thumbnailUrl: album.thumbnailUrl,
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default TopAlbums;
