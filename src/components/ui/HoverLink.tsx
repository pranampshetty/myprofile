"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverLink, tapScale } from "@/lib/hover";

type HoverLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export default function HoverLink({
  href,
  children,
  className = "",
  external = false,
}: HoverLinkProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`interactive-link group relative inline-block text-sm text-muted transition-colors hover:text-foreground ${className}`}
      whileHover={reducedMotion ? undefined : hoverLink}
      whileTap={reducedMotion ? undefined : tapScale}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 rainbow-bg transition-all duration-300 group-hover:w-full" />
    </motion.a>
  );
}
