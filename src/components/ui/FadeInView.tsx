"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

type FadeInViewProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
  duration?: number;
};

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

export default function FadeInView({
  children,
  direction = "up",
  delay = 0,
  distance,
  className = "",
  duration = 0.6,
}: FadeInViewProps) {
  const base = offsets[direction];
  const initial = {
    opacity: 0,
    ...(base.x !== undefined ? { x: distance ?? base.x } : {}),
    ...(base.y !== undefined ? { y: distance ?? base.y } : {}),
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
