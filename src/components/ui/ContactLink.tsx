"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { hoverLink, tapScale } from "@/lib/hover";
import { getExternalLinkProps } from "@/lib/links";
import Icon, { type IconName } from "./Icon";

type ContactLinkProps = {
  icon: IconName;
  href: string;
  children: ReactNode;
  className?: string;
};

export default function ContactLink({ icon, href, children, className = "" }: ContactLinkProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`flex items-center gap-2 transition-colors ${className}`}
      {...getExternalLinkProps(href)}
      whileHover={reducedMotion ? undefined : { ...hoverLink, x: 3 }}
      whileTap={reducedMotion ? undefined : tapScale}
    >
      <motion.span
        whileHover={reducedMotion ? undefined : { rotate: 12, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon name={icon} size={16} />
      </motion.span>
      {children}
    </motion.a>
  );
}
