"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hoverTag, tapScale } from "@/lib/hover";

type TagProps = {
  label: string;
  index?: number;
};

export default function Tag({ label, index = 0 }: TagProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className="cursor-default rounded-full border border-border px-4 py-2 text-sm text-muted"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={reducedMotion ? undefined : hoverTag}
      whileTap={reducedMotion ? undefined : tapScale}
    >
      {label}
    </motion.span>
  );
}
