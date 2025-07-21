import { useEffect, useRef, useState } from "react";
import { LyricLine } from "@/hooks/useKaraoke";
import "./KaraokeOverlay.css";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
} from "lucide-react";
import { Song } from "@/types";

interface KaraokeOverlayProps {
  song: Song;
  lyrics: LyricLine[];
  activeIndex: number;
  onClose: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function KaraokeOverlay({
  song,
  lyrics,
  activeIndex,
  onClose,
  audioRef,
}: KaraokeOverlayProps) {
  const lyricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState<
    "off" | "repeat-one" | "repeat-all"
  >("off");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const currentTime = audioRef.current?.currentTime || 0;
  const duration = audioRef.current?.duration || 0;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const toggleRepeat = () => {
    if (!audioRef.current) return;

    const nextMode =
      repeatMode === "off"
        ? "repeat-one"
        : repeatMode === "repeat-one"
        ? "repeat-all"
        : "off";

    setRepeatMode(nextMode);
    audioRef.current.loop = nextMode === "repeat-one";
  };

  const toggleShuffle = () => setIsShuffling(!isShuffling);

  // 🟢 Thanh progress bar: click để tua
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));

    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  // 🟢 Tự động scroll lyric
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
            src={`${song.thumbnailUrl}`}
            alt="Background"
            className="karaoke-img"
          />
        )}

        <div className="player-controls">
          <button className="control-btn" onClick={toggleShuffle}>
            <Shuffle size={16} color={isShuffling ? "#1db954" : "white"} />
          </button>
          <button className="control-btn" onClick={skipBackward}>
            <SkipBack size={20} />
          </button>
          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn" onClick={skipForward}>
            <SkipForward size={20} />
          </button>
          <button className="control-btn" onClick={toggleRepeat}>
            <Repeat
              size={16}
              color={repeatMode !== "off" ? "#1db954" : "white"}
              style={{
                transform:
                  repeatMode === "repeat-one" ? "rotate(360deg)" : "none",
                transition: "transform 0.3s",
              }}
            />
          </button>
        </div>

        <div className="karaoke-progress-container">
          <span>{formatTime(currentTime)}</span>
          <div
            className="karaoke-progress-bar"
            ref={progressBarRef}
            onClick={handleSeek}
          >
            <div
              className="karaoke-progress-fill"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
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
