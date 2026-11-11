"use client";

import { motion } from "framer-motion";
import { useReducedMotionPreference } from "@/lib/hooks/useMotionPreference";

const cubes = [
  { top: "18%", left: "12%", size: 44, rotate: 22, delay: 0, duration: 18 },
  { top: "32%", right: "10%", size: 56, rotate: -15, delay: 2, duration: 22 },
  { top: "55%", left: "6%", size: 36, rotate: 40, delay: 4, duration: 20 },
  { top: "48%", right: "18%", size: 48, rotate: -28, delay: 1, duration: 24 },
  { top: "68%", left: "22%", size: 32, rotate: 12, delay: 3, duration: 19 },
  { top: "24%", left: "38%", size: 28, rotate: -35, delay: 5, duration: 21 },
  { top: "72%", right: "8%", size: 40, rotate: 18, delay: 2.5, duration: 23 },
];

function Cube({ size, rotate }: { size: number; rotate: number }) {
  const half = size / 2;
  const face = (transform: string) => ({
    width: size,
    height: size,
    transform,
    background:
      "linear-gradient(135deg, rgba(0, 110, 255, 0.12) 0%, rgba(38, 222, 129, 0.08) 100%)",
    border: "1px solid rgba(77, 154, 255, 0.25)",
    boxShadow: "inset 0 0 20px rgba(0, 110, 255, 0.15)",
  });

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotate}deg) rotateY(${rotate * 1.4}deg)`,
      }}
    >
      <div className="absolute" style={face(`translateZ(${half}px)`)} />
      <div className="absolute" style={face(`rotateY(180deg) translateZ(${half}px)`)} />
      <div className="absolute" style={face(`rotateY(90deg) translateZ(${half}px)`)} />
      <div className="absolute" style={face(`rotateY(-90deg) translateZ(${half}px)`)} />
      <div className="absolute" style={face(`rotateX(90deg) translateZ(${half}px)`)} />
      <div className="absolute" style={face(`rotateX(-90deg) translateZ(${half}px)`)} />
    </div>
  );
}

export default function FloatingCubes() {
  const prefersReduced = useReducedMotionPreference();
  if (prefersReduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: 900 }}
      aria-hidden="true"
    >
      {cubes.map((cube, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: cube.top,
            left: cube.left,
            right: cube.right,
          }}
          animate={{
            y: [0, -18, 8, 0],
            x: [0, 12, -8, 0],
            rotateZ: [0, 6, -4, 0],
          }}
          transition={{
            duration: cube.duration,
            repeat: Infinity,
            delay: cube.delay,
            ease: "easeInOut",
          }}
        >
          <Cube size={cube.size} rotate={cube.rotate} />
        </motion.div>
      ))}
    </div>
  );
}
