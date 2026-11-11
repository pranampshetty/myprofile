export const hoverLift = {
  y: -8,
  scale: 1.02,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverLiftSubtle = {
  y: -4,
  scale: 1.01,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverGlow = {
  y: -6,
  boxShadow: "0 20px 50px rgba(0, 110, 255, 0.3), 0 0 0 1px rgba(77, 154, 255, 0.15)",
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverTilt = {
  y: -6,
  rotateX: 4,
  rotateY: -4,
  scale: 1.02,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverScale = {
  scale: 1.03,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverLink = {
  y: -2,
  scale: 1.03,
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverTag = {
  y: -4,
  scale: 1.06,
  boxShadow: "0 10px 28px rgba(0, 110, 255, 0.22)",
  borderColor: "rgba(0, 110, 255, 0.45)",
  backgroundColor: "rgba(0, 110, 255, 0.12)",
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverIcon = {
  scale: 1.12,
  rotate: 8,
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

export const hoverBadge = {
  scale: 1.08,
  backgroundColor: "rgba(0, 110, 255, 0.2)",
  transition: { duration: 0.25 },
};

export const tapScale = {
  scale: 0.97,
  transition: { duration: 0.15 },
};

export const hoverButton = {
  scale: 1.06,
  y: -2,
  boxShadow: "0 16px 40px rgba(0, 110, 255, 0.45)",
  transition: { duration: 0.25 },
};
