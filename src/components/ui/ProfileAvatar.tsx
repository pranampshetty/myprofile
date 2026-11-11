"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ProfileAvatarProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  showRings?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { container: "h-24 w-24", rings: ["h-32 w-32", "h-40 w-40"] },
  md: { container: "h-40 w-40", rings: ["h-48 w-48", "h-56 w-56"] },
  lg: { container: "h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64 4k:h-72 4k:w-72", rings: ["h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 4k:h-80 4k:w-80", "h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96 4k:h-[28rem] 4k:w-[28rem]"] },
};

export default function ProfileAvatar({
  src,
  alt,
  size = "md",
  showRings = true,
  className = "",
}: ProfileAvatarProps) {
  const { container, rings } = sizeMap[size];

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {showRings && (
        <>
          <motion.div
            className={`absolute ${rings[0]} rounded-full border border-dashed border-accent/30`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute ${rings[1]} rounded-full border border-dashed border-accent-cyan/20`}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute ${rings[1]} rounded-full`}
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/60" />
          </motion.div>
        </>
      )}
      <motion.div
        className={`relative z-10 ${container} overflow-hidden rounded-full border-[6px] border-black shadow-2xl shadow-black`}
        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 110, 255, 0.5)" }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 256px, 320px"
          priority
        />
      </motion.div>
    </div>
  );
}
