"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/hooks/useMotionPreference";

const embers = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 7.5) % 84}%`,
  size: 2 + (i % 3),
  delay: i * 0.7,
  duration: 10 + (i % 5) * 2,
  opacity: 0.15 + (i % 4) * 0.08,
}));

export default function FloatingEmbers() {
  const prefersReduced = useReducedMotionPreference();
  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((ember) => (
        <motion.span
          key={ember.id}
          className="absolute rounded-full bg-accent-light"
          style={{
            left: ember.left,
            bottom: "-4%",
            width: ember.size,
            height: ember.size,
            opacity: ember.opacity,
            boxShadow: `0 0 ${ember.size * 4}px rgba(77, 154, 255, 0.5)`,
          }}
          animate={{
            y: [0, -1100],
            x: [0, (ember.id % 2 === 0 ? 1 : -1) * 30, 0],
            opacity: [0, ember.opacity, ember.opacity, 0],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
