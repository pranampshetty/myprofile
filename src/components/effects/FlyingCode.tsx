"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/lib/hooks/useMotionPreference";

const CODE_SNIPPETS = [
  [
    "const App = () => {",
    "  const [data, setData] = useState();",
    "  return <Component />;",
    "};",
  ],
  [
    "export default function Page() {",
    "  return (",
    "    <main className='hero'>",
    "      <Hero />",
    "    </main>",
    "  );",
    "}",
  ],
  [
    "useEffect(() => {",
    "  fetch('/api/data')",
    "    .then(res => res.json())",
    "    .then(setData);",
    "}, []);",
  ],
  [
    "interface Props {",
    "  title: string;",
    "  children: ReactNode;",
    "}",
  ],
  [
    "const theme = {",
    "  colors: {",
    "    accent: '#006eff',",
    "    cyan: '#26de81',",
    "  },",
    "};",
  ],
  [
    "<motion.div",
    "  initial={{ opacity: 0 }}",
    "  animate={{ opacity: 1 }}",
    "  transition={{ duration: 0.8 }}",
    "/>",
  ],
  [
    "async function getData() {",
    "  const res = await fetch(url);",
    "  return res.json();",
    "}",
  ],
  [
    "type Skill = {",
    "  name: string;",
    "  level: number;",
    "};",
  ],
  [
    "npm run build",
    "git commit -m 'feat: ui'",
    "npm run dev",
  ],
  [
    "tailwind.config = {",
    "  theme: { extend: {} },",
    "};",
  ],
  [
    "import { motion } from",
    "  'framer-motion';",
  ],
  [
    "export const metadata = {",
    "  title: 'Portfolio',",
    "};",
  ],
];

const MATRIX_CHARS = "01{}[]();=<>/constletvarfn=>ReactuseStateuseEffect".split("");

type FloatingBlock = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  lines: string[];
  width: number;
  height: number;
};

type MatrixColumn = {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  fontSize: number;
};

function createBlock(w: number, h: number): FloatingBlock {
  const lines = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
  const z = 0.25 + Math.random() * 0.75;
  const lineHeight = 14;
  const padding = 10;
  const blockWidth = Math.max(...lines.map((l) => l.length)) * 7.2 + padding * 2;
  const blockHeight = lines.length * lineHeight + padding * 2;

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    z,
    vx: (Math.random() - 0.5) * 0.35 * z,
    vy: (Math.random() - 0.5) * 0.28 * z,
    rotation: (Math.random() - 0.5) * 0.5,
    rotationSpeed: (Math.random() - 0.5) * 0.0016,
    lines,
    width: blockWidth,
    height: blockHeight,
  };
}

function createColumns(w: number, h: number, count: number): MatrixColumn[] {
  return Array.from({ length: count }, () => {
    const colLen = 8 + Math.floor(Math.random() * 14);
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.4 + Math.random() * 1.2,
      fontSize: 10 + Math.floor(Math.random() * 4),
      chars: Array.from({ length: colLen }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      ),
    };
  });
}

function drawCodeBlock(
  ctx: CanvasRenderingContext2D,
  block: FloatingBlock,
  time: number,
) {
  const scale = 0.65 + block.z * 0.75;
  const alpha = 0.14 + block.z * 0.32;
  const rot = block.rotation + Math.sin(time * 0.0004 + block.x) * 0.15;

  ctx.save();
  ctx.translate(block.x, block.y);
  ctx.rotate(rot);
  ctx.scale(scale, scale);

  const w = block.width;
  const h = block.height;
  const radius = 6;

  ctx.fillStyle = `rgba(15, 15, 22, ${alpha * 1.8})`;
  ctx.strokeStyle = `rgba(0, 110, 255, ${alpha * 1.4})`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, radius);
  ctx.fill();
  ctx.stroke();

  ctx.font = "11px var(--font-geist-mono), monospace";
  const lineHeight = 14;
  const startY = -h / 2 + 14;

  block.lines.forEach((line, i) => {
    let x = -w / 2 + 10;
    const y = startY + i * lineHeight;

    const tokens = line.split(/(\s+|[{}();=<>[\],.'"`])/);
    for (const token of tokens) {
      if (!token) continue;
      if (/^(const|let|var|function|return|export|default|import|async|await|type|interface)$/.test(token)) {
        ctx.fillStyle = `rgba(77, 154, 255, ${alpha * 2.2})`;
      } else if (/^['"`].*['"`]$/.test(token) || /^[#][0-9a-fA-F]{3,8}$/.test(token)) {
        ctx.fillStyle = `rgba(38, 222, 129, ${alpha * 2})`;
      } else if (/^[A-Z][a-zA-Z]*$/.test(token) || /^<[A-Za-z]/.test(token)) {
        ctx.fillStyle = `rgba(115, 87, 235, ${alpha * 1.8})`;
      } else if (/^[{}();=<>[\]]+$/.test(token)) {
        ctx.fillStyle = `rgba(139, 139, 158, ${alpha * 1.5})`;
      } else {
        ctx.fillStyle = `rgba(200, 200, 215, ${alpha * 1.6})`;
      }
      ctx.fillText(token, x, y);
      x += ctx.measureText(token).width;
    }
  });

  ctx.restore();
}

export default function FlyingCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotionPreference();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let blocks: FloatingBlock[] = [];
    let columns: MatrixColumn[] = [];
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const isMobile = w < 768;
      const blockCount = prefersReduced ? 3 : isMobile ? 7 : 12;
      const colCount = prefersReduced ? 0 : isMobile ? 22 : 36;

      blocks = Array.from({ length: blockCount }, () => createBlock(w, h));
      columns = createColumns(w, h, colCount);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      time += 16;

      ctx.clearRect(0, 0, w, h);

      for (const col of columns) {
        col.y += col.speed;
        if (col.y > h + col.chars.length * col.fontSize) {
          col.y = -col.chars.length * col.fontSize;
          col.x = Math.random() * w;
        }

        ctx.font = `${col.fontSize}px var(--font-geist-mono), monospace`;
        col.chars.forEach((char, i) => {
          const y = col.y + i * col.fontSize;
          if (y < -20 || y > h + 20) return;
          const fade = 1 - i / col.chars.length;
          ctx.fillStyle = `rgba(0, 110, 255, ${fade * 0.18})`;
          ctx.fillText(char, col.x, y);
        });
      }

      for (const block of blocks) {
        block.x += block.vx;
        block.y += block.vy;
        block.rotation += block.rotationSpeed;

        const margin = 80;
        if (block.x < -margin) block.x = w + margin;
        if (block.x > w + margin) block.x = -margin;
        if (block.y < -margin) block.y = h + margin;
        if (block.y > h + margin) block.y = -margin;

        drawCodeBlock(ctx, block, time);
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    if (!prefersReduced) draw();
    else {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      blocks.forEach((b) => drawCodeBlock(ctx, b, 0));
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
