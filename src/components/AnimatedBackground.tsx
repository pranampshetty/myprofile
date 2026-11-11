"use client";

import { motion } from "framer-motion";
import ParticleCanvas from "./effects/ParticleCanvas";
import MouseGlow from "./effects/MouseGlow";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="aurora-layer opacity-60" />
      <ParticleCanvas />
      <MouseGlow />
      <div className="perspective-grid" />

      <motion.div
        className="light-orb light-orb-1"
        animate={{ x: [0, 100, -60, 0], y: [0, -80, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="light-orb light-orb-2"
        animate={{ x: [0, -120, 70, 0], y: [0, 90, -40, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="vignette-overlay" />
    </div>
  );
}
