"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { hoverGlow, hoverLift, hoverScale, hoverTilt, tapScale } from "@/lib/hover";

type HoverEffect = "lift" | "glow" | "tilt" | "scale" | "none";

type HoverGlowProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  effect?: HoverEffect;
  className?: string;
};

const effects = {
  lift: hoverLift,
  glow: hoverGlow,
  tilt: hoverTilt,
  scale: hoverScale,
  none: {},
};

export default function HoverGlow({
  children,
  effect = "glow",
  className = "",
  ...props
}: HoverGlowProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`hover-shine ${className}`}
      whileHover={!reducedMotion && effect !== "none" ? effects[effect] : undefined}
      whileTap={reducedMotion ? undefined : tapScale}
      style={effect === "tilt" ? { transformPerspective: 1000 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
