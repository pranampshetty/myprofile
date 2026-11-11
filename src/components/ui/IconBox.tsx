"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverBadge, hoverIcon } from "@/lib/hover";
import Icon, { type IconName } from "./Icon";

type IconBoxProps = {
  icon: IconName;
  size?: "sm" | "md" | "lg";
  gradient?: string;
  className?: string;
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: 18 },
  md: { box: "h-12 w-12", icon: 24 },
  lg: { box: "h-14 w-14", icon: 28 },
};

export default function IconBox({
  icon,
  size = "md",
  gradient = "from-accent to-accent-cyan",
  className = "",
}: IconBoxProps) {
  const reducedMotion = useReducedMotion();
  const { box, icon: iconSize } = sizeMap[size];

  return (
    <motion.div
      className={`flex ${box} items-center justify-center rounded-xl bg-gradient-to-br ${gradient} ${className}`}
      whileHover={reducedMotion ? undefined : hoverIcon}
      transition={{ duration: 0.3 }}
    >
      <Icon name={icon} size={iconSize} className="text-white" />
    </motion.div>
  );
}

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className={`inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light ${className}`}
      whileHover={reducedMotion ? undefined : hoverBadge}
    >
      {children}
    </motion.span>
  );
}
