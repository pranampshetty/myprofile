"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Card from "./Card";
import FadeInView from "./FadeInView";
import HoverGlow from "./HoverGlow";

type SkillBarProps = {
  name: string;
  level: number;
  index?: number;
};

export default function SkillBar({ name, level, index = 0 }: SkillBarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeInView delay={index * 0.08} distance={30}>
      <HoverGlow
        effect="lift"
        className="group rounded-2xl"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Card variant="elevated" className="p-4 transition-colors group-hover:border-accent/40 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium transition-colors group-hover:text-accent-light">{name}</span>
            <motion.span
              className="text-sm text-accent-light"
              animate={{ scale: hovered ? 1.15 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {level}%
            </motion.span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface">
            <motion.div
              className="h-full rounded-full rainbow-bg"
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              animate={{
                width: hovered ? `${Math.min(level + 3, 100)}%` : `${level}%`,
                boxShadow: hovered ? "0 0 12px rgba(0, 110, 255, 0.6)" : "0 0 0px transparent",
              }}
              transition={{ duration: hovered ? 0.3 : 1.2, delay: hovered ? 0 : index * 0.1 }}
            />
          </div>
        </Card>
      </HoverGlow>
    </FadeInView>
  );
}
