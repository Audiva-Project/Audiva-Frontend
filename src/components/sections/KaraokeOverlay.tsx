import { useEffect, useRef } from "react";
import { LyricLine } from "@/hooks/useKaraoke";
import "./KaraokeOverlay.css";

interface KaraokeOverlayProps {
    song: any;
    lyrics: LyricLine[];
    activeIndex: number;
    onClose: () => void;
}

export default function KaraokeOverlay({
    song,
    lyrics,
    activeIndex,
    onClose,
}: KaraokeOverlayProps) {
    const lyricsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = lyricsRef.current;
        const activeLine = container?.querySelector(".karaoke-line.active");
        if (activeLine && container) {
            activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [activeIndex]);

    return (
        <div className="karaoke-overlay">
            <div className="karaoke-left">
                {song?.thumbnailUrl && (
                    <img
                        src={`http://localhost:8080/identity/audio/${song.thumbnailUrl}`}
                        alt="Background"
                        className="karaoke-img"
                    />
                )}
            </div>

            <div className="karaoke-right">
                <button className="karaoke-close-btn" onClick={onClose}>
                    ✕
                </button>
                <div className="karaoke-lyrics" ref={lyricsRef}>
                    {lyrics.map((line, idx) => (
                        <p
                            key={idx}
                            className={`karaoke-line ${idx === activeIndex ? "active" : ""}`}
                        >
                            {line.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );

}
