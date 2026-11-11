"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect } from "react";
import { useMotionEffectsEnabled } from "@/lib/hooks/useMotionPreference";

export default function MouseGlow() {
  const enabled = useMotionEffectsEnabled();
  const mouseX = useSpring(0, { stiffness: 60, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 25 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, mouseX, mouseY]);

  const glow = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(0, 110, 255, 0.09), rgba(38, 222, 129, 0.04) 40%, transparent 70%)`;

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{ background: glow }}
      aria-hidden="true"
    />
  );
}
