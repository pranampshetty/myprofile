"use client";

import { useReducedMotionPreference } from "@/lib/hooks/useMotionPreference";

const stars = [
  { top: "8%", left: "70%", delay: 0, duration: 2.8 },
  { top: "22%", left: "15%", delay: 4, duration: 2.2 },
  { top: "45%", left: "85%", delay: 8, duration: 3.1 },
  { top: "65%", left: "40%", delay: 12, duration: 2.5 },
  { top: "35%", left: "55%", delay: 16, duration: 2.9 },
];

export default function ShootingStars() {
  const prefersReduced = useReducedMotionPreference();
  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={`${star.top}-${star.delay}`}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
