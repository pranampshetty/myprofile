"use client";

import type { ReactNode } from "react";
import Card from "./Card";
import HoverGlow from "./HoverGlow";

type GlassCardProps = {
  children: ReactNode;
  effect?: "lift" | "glow" | "tilt" | "scale";
  className?: string;
  cardClassName?: string;
};

export default function GlassCard({
  children,
  effect = "glow",
  className = "",
  cardClassName = "",
}: GlassCardProps) {
  return (
    <HoverGlow effect={effect} className={`rounded-2xl ${className}`}>
      <Card variant="glass" glow className={cardClassName}>
        {children}
      </Card>
    </HoverGlow>
  );
}
