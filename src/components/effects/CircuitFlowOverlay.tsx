"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/lib/hooks/useMotionPreference";

type Branch = {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  hue: number;
};

function buildTree(
  startX: number,
  startY: number,
  angle: number,
  length: number,
  depth: number,
  spread: number,
): { x: number; y: number }[] {
  const endX = startX + Math.cos(angle) * length;
  const endY = startY + Math.sin(angle) * length;
  const points = [{ x: startX, y: startY }, { x: endX, y: endY }];

  if (depth <= 0 || length < 12) return points;

  const branchCount = depth > 2 ? 2 : 1;
  for (let i = 0; i < branchCount; i++) {
    const branchAngle = angle + (i === 0 ? -spread : spread) + (Math.random() - 0.5) * 0.15;
    const child = buildTree(endX, endY, branchAngle, length * 0.72, depth - 1, spread * 0.85);
    points.push(...child.slice(1));
  }

  return points;
}

export default function CircuitFlowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let branches: Branch[] = [];
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBranches();
    };

    const initBranches = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      branches = Array.from({ length: 5 }, (_, i) => {
        const rootX = w * (0.2 + i * 0.15);
        const rootY = h * 0.92;
        const points = buildTree(rootX, rootY, -Math.PI / 2 + (Math.random() - 0.5) * 0.3, h * 0.22, 5, 0.45);
        return {
          points,
          progress: Math.random(),
          speed: 0.0015 + Math.random() * 0.002,
          hue: i % 2 === 0 ? 265 : 190,
        };
      });
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      time += 1;

      for (const branch of branches) {
        branch.progress = (branch.progress + branch.speed) % 1;

        ctx.beginPath();
        ctx.moveTo(branch.points[0].x, branch.points[0].y);
        for (let i = 1; i < branch.points.length; i++) {
          ctx.lineTo(branch.points[i].x, branch.points[i].y);
        }
        ctx.strokeStyle = `hsla(${branch.hue}, 80%, 65%, 0.08)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const pulseIndex = Math.floor(branch.progress * (branch.points.length - 1));
        const pulse = branch.points[pulseIndex];
        if (pulse) {
          const glow = ctx.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 14);
          glow.addColorStop(0, `hsla(${branch.hue}, 90%, 70%, 0.35)`);
          glow.addColorStop(1, `hsla(${branch.hue}, 90%, 70%, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${branch.hue}, 100%, 85%, 0.9)`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
