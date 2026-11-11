"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useReducedMotionPreference(): boolean {
  const reducedMotion = useReducedMotion();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return Boolean(reducedMotion ?? prefersReduced);
}

export function useMotionEffectsEnabled(minWidth = 768): boolean {
  const prefersReduced = useReducedMotionPreference();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => setEnabled(window.innerWidth >= minWidth && !prefersReduced);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [minWidth, prefersReduced]);

  return enabled;
}
