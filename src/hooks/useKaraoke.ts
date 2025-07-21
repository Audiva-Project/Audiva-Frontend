import api from "@/utils/api";
import { useEffect, useState } from "react";

export interface LyricLine {
  time: number; // giây
  text: string;
}

export const parseLRC = (lrc: string): LyricLine[] => {
  const lines = lrc.split("\n");
  const result: LyricLine[] = [];

  const timeRegex = /\[(\d{2}):(\d{2}\.\d{2})]/;

  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;

      const text = line.replace(timeRegex, "").trim();
      result.push({ time, text });
    }
  }

  return result.sort((a, b) => a.time - b.time);
};

export function useKaraoke(
  songId: number | undefined,
  audioRef: React.RefObject<HTMLAudioElement | null>
) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!songId) return;

    const fetchLyrics = async () => {
      const res = await api.get("/songs/1/lyrics");
      setLyrics(res.data as LyricLine[]);
    };

    fetchLyrics();
  }, [songId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audioRef.current || lyrics.length === 0) return;

      const currentTime = audioRef.current.currentTime;

      for (let i = 0; i < lyrics.length; i++) {
        if (
          currentTime >= lyrics[i].time &&
          (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
        ) {
          setActiveIndex(i);
          break;
        }
      }
    }, 200); // update mỗi 200ms

    return () => clearInterval(interval);
  }, [audioRef, lyrics]);

  return { lyrics, activeIndex };
}
