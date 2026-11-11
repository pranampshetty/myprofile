"use client";

import FlyingCode from "@/components/effects/FlyingCode";

export default function HeroVideoBackground() {
  return (
    <div className="hero-code-bg pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-code-bg__base" />
      <FlyingCode />
      <div className="hero-code-bg__grid" />
      <div className="hero-code-bg__glow" />
      <div className="hero-code-bg__gradient" />
      <div className="hero-code-bg__vignette" />
    </div>
  );
}
