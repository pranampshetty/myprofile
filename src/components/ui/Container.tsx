import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  xl: "max-w-[1400px] 3xl:max-w-[1600px] 4k:max-w-[1800px]",
  full: "max-w-full",
};

export default function Container({ children, className = "", size = "md" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-10 4k:px-12 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
}
