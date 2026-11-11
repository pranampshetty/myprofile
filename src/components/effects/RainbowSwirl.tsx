"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

const colors = ["#34e7e4", "#fc5c65", "#fd9644", "#fed330", "#26de81", "#7357eb"];

export default function RainbowSwirl({ className = "" }: { className?: string }) {
  const id = useId();
  const reducedMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 400 220" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          {colors.map((c, i) => (
            <stop key={c} offset={i / (colors.length - 1)} stopColor={c} />
          ))}
          {!reducedMotion && (
            <animateTransform attributeName="gradientTransform" type="rotate" from="0 200 110" to="360 200 110" dur="12s" repeatCount="indefinite" />
          )}
        </linearGradient>
      </defs>
      <motion.path
        d="M200 110 C170 50 70 40 60 110 C50 180 170 170 200 110 C230 50 350 40 340 110 C330 180 230 170 200 110 Z"
        stroke={`url(#${id})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reducedMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
