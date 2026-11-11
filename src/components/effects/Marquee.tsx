"use client";

import type { CSSProperties } from "react";

type MarqueeProps = {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
};

export default function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`marquee-container overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex gap-8 whitespace-nowrap ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item flex shrink-0 items-center gap-8">
            <span>{item}</span>
            <span className="text-accent/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
