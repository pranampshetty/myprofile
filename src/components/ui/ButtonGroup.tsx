import type { ReactNode } from "react";

type ButtonGroupProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export default function ButtonGroup({
  children,
  className = "",
  label = "Primary actions",
}: ButtonGroupProps) {
  return (
    <div
      className={`inline-flex w-full flex-col items-stretch gap-1 rounded-2xl border border-border bg-surface/70 p-1.5 shadow-lg shadow-black/20 backdrop-blur-xl sm:w-auto sm:flex-row sm:items-center sm:gap-0 sm:rounded-full ${className}`}
      role="group"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function ButtonGroupDivider() {
  return (
    <span
      className="hidden h-8 w-px shrink-0 bg-border/80 sm:block"
      aria-hidden="true"
    />
  );
}
