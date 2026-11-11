"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  labelColor?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
  labelColor = "text-muted",
}: SectionHeadingProps) {
  const reducedMotion = useReducedMotion();
  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:mb-16 lg:flex-row lg:items-end lg:justify-between 4k:mb-20">
      <div>
        <motion.span {...reveal} transition={{ duration: 0.6 }} className={`eyebrow mb-4 sm:mb-5 ${labelColor}`}>
          {label}
        </motion.span>
        <motion.h2
          {...reveal}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="section-title max-w-4xl font-extrabold text-balance"
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p
          {...reveal}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md text-sm leading-relaxed text-muted text-pretty sm:text-base lg:text-right lg:text-lg 4k:max-w-xl 4k:text-xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
