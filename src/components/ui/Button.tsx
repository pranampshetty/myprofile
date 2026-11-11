"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hoverButton, tapScale } from "@/lib/hover";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  inGroup?: boolean;
  groupPosition?: "start" | "middle" | "end";
};

type ButtonAsButton = BaseProps &
  Omit<React.ComponentProps<typeof motion.button>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.ComponentProps<typeof motion.a>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-white font-semibold text-black hover:bg-accent hover:text-white",
  secondary:
    "border border-border text-foreground hover:border-accent/50 hover:bg-surface-elevated",
  ghost: "text-muted hover:text-foreground",
};

const groupVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-white font-semibold text-black hover:bg-accent hover:text-white",
  secondary:
    "border-0 bg-transparent text-foreground/90 hover:bg-white/5 hover:text-foreground",
  ghost: "border-0 bg-transparent text-foreground/90 hover:bg-white/5 hover:text-foreground",
};

const hoverByVariant = {
  primary: hoverButton,
  secondary: { scale: 1.04, y: -2, borderColor: "rgba(0, 110, 255, 0.5)" },
  ghost: { scale: 1.03, y: -1 },
};

const groupPositionClasses = {
  start: "sm:rounded-l-full",
  middle: "border-t border-border/60 sm:border-t-0 sm:border-l sm:rounded-none",
  end: "border-t border-border/60 sm:border-t-0 sm:border-l sm:rounded-r-full",
};

const groupHover = {
  primary: { scale: 1.02 },
  secondary: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  ghost: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  icon,
  fullWidth = false,
  inGroup = false,
  groupPosition = "start",
  href,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();
  const classes = `relative inline-flex items-center justify-center gap-2 overflow-hidden text-sm font-medium transition-colors ${
    inGroup
      ? `w-full rounded-xl px-6 py-3.5 sm:w-auto sm:px-7 sm:py-3.5 ${groupPositionClasses[groupPosition]}`
      : "rounded-full px-8 py-4"
  } ${inGroup ? groupVariantClasses[variant] : variantClasses[variant]} ${
    fullWidth && !inGroup ? "w-full" : ""
  } ${className}`;

  const hoverProps = {
    whileHover: reducedMotion ? undefined : inGroup ? groupHover[variant] : hoverByVariant[variant],
    whileTap: reducedMotion ? undefined : tapScale,
  };

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

    if (isExternal) {
      return (
        <motion.a href={href} className={classes} {...hoverProps} {...(props as object)}>
          <span className="relative z-10 flex items-center gap-2">
            {icon}
            {children}
          </span>
        </motion.a>
      );
    }

    return (
      <motion.div className={inGroup ? "w-full sm:w-auto" : undefined} {...hoverProps}>
        <Link href={href} className={classes}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {icon}
            {children}
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={(props as ButtonAsButton).type ?? "button"}
      className={classes}
      {...hoverProps}
      {...(props as object)}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}
