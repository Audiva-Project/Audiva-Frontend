import { ChevronRight } from "lucide-react";
import TrendingRow from "../ui/TrendingRow";
import { Song } from "@/types";

interface PopularSongProps {
    songs: Song[]
}

const PopularSong: React.FC<PopularSongProps> = ({ songs }) => {
    return (
        <section className="trending-section">
            <div className="section-header">
                <h2 className="section-title">
                    Popular <span className="title-highlight">Songs</span>
                </h2>
                <button className="view-all-btn">
                    Xem thêm
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="trending-table">
                <div className="trending-header">
                    <div className="header-cell rank">#</div>
                    <div className="header-cell song">Song</div>
                    <div className="header-cell album">Album</div>
                    <div className="header-cell play">Số người nghe</div>
                </div>

                <div className="trending-body">
                    {songs.map((song, index) => (
                        <TrendingRow key={song.id} song={song} rank={index + 1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularSong;
