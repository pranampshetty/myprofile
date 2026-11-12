"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [phase, setPhase] = useState<"off" | "in" | "out">("off");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("pp-splash")) return;
    sessionStorage.setItem("pp-splash", "1");
    setPhase("in");
    const fade = setTimeout(() => setPhase("out"), 480);
    const done = setTimeout(() => setPhase("off"), 820);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, []);

  if (phase === "off") return null;

  return (
    <div className={`splash ${phase === "out" ? "splash-out" : ""}`} aria-hidden>
      <span>pranam</span>
    </div>
  );
}
