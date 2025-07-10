
import { useEffect, useRef } from "react";
import { LyricLine } from "@/hooks/useKaraoke";
import "@/components/sections/LyricSongSection.css";

interface Props {
  lyrics: LyricLine[];
  activeIndex: number;
}

export default function LyricSongSection({ lyrics, activeIndex }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeLine = activeLineRef.current;
      const offsetTop =
        activeLine.offsetTop - container.offsetHeight / 2 + activeLine.offsetHeight / 2;

      container.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  return (
    <div className="karaoke-container" ref={containerRef}>
      {lyrics.map((line, idx) => (
        <p
          key={idx}
          ref={idx === activeIndex ? activeLineRef : null}
          className={`karaoke-line ${idx === activeIndex ? "active" : ""}`}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}