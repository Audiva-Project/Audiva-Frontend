import React, { useEffect, useState } from "react";
import { getListeningHistory } from "@/utils/listeningHistory";
import SongCard from "@/components/ui/SongCard";
import "@/pages/HistoryPage.css";

type HistoryItem = {
    song: {
        id: number;
        title: string;
        audioUrl: string;
        thumbnailUrl: string;
        artists: { id: number; name: string }[];
        artist: string;
        album: string;
        releaseDate: string;
    };
    listenedAt: string;
};

const HistoryPage: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await getListeningHistory();
            setHistory(data);
        };
        fetchHistory();
    }, []);
    //localStorage.removeItem("anonymousId");

    return (
        <div className="history-page">
            <h1 className="history-heading">History</h1>
            {history.length === 0 ? (
                <p className="history-empty">No listening history yet.</p>
            ) : (
                <div className="songs-grid">
                    {history.map((item) => (
                        <SongCard
                            key={`${item.song.id}-${item.listenedAt}`}
                            song={{
                                ...item.song,
                                artist:
                                    item.song.artist ??
                                    (item.song.artists && item.song.artists.length > 0
                                        ? item.song.artists[0].name
                                        : ""),
                                album: item.song.album ?? "",
                                releaseDate: item.song.releaseDate ?? "",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HistoryPage;
