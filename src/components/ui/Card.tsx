import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
  glow?: boolean;
};

const variantClasses = {
  default: "rounded-2xl border border-border bg-surface-elevated",
  glass: "rounded-2xl glass",
  elevated: "rounded-xl border border-border bg-surface-elevated",
};

export default function Card({
  children,
  className = "",
  variant = "default",
  glow = false,
}: CardProps) {
  return (
    <div className={`${variantClasses[variant]} ${glow ? "glow-border" : ""} ${className}`}>
      {children}
    </div>
  );
}
