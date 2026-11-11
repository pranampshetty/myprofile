"use client";

import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import Magnetic from "@/components/effects/Magnetic";
import RainbowSwirl from "@/components/effects/RainbowSwirl";
import { Button, Container } from "@/components/ui";

const ease = [0.22, 1, 0.36, 1] as const;

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Ticker() {
  const reducedMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.ticker.length), 2200);
    return () => clearInterval(id);
  }, [reducedMotion]);

  const [a, b, c] = profile.ticker[i];

  return (
    <div className="relative mx-auto h-9 overflow-hidden text-lg sm:h-10 sm:text-2xl" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="absolute inset-x-0"
        >
          <span className="gradient-text">
            {a} × {b} → {c}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const liveCount = profile.projects.filter((p) => p.url).length;
const industries = new Set(profile.projects.map((p) => p.category)).size;
const skill = (name: string) => `${profile.skills.find((s) => s.name.startsWith(name))?.level ?? 0}%`;

const cards = [
  {
    brand: profile.career.company,
    badge: "Experience",
    tone: "#fc5c65",
    value: profile.experienceYears,
    sub: "Years full-time",
    note: profile.title,
    metrics: [
      ["Since", profile.career.fullTimeStart],
      ["Intern", profile.career.internPeriod.split(" – ")[0]],
    ],
    href: "#experience",
  },
  {
    brand: "Portfolio",
    badge: "Shipped",
    tone: "#4d9aff",
    value: String(profile.projects.length),
    sub: "Production web apps",
    note: "Healthcare · E-com · FinTech · EdTech",
    metrics: [
      ["Live", String(liveCount)],
      ["Industries", String(industries)],
    ],
    href: "#projects",
  },
  {
    brand: "React.js",
    badge: "Core",
    tone: "#26de81",
    value: skill("React"),
    sub: "Proficiency",
    note: "Primary framework",
    metrics: [
      ["Next.js", skill("Next")],
      ["TypeScript", skill("JavaScript / TypeScript")],
    ],
    href: "#skills",
  },
  {
    brand: "Stack",
    badge: "Modern",
    tone: "#fd9644",
    value: String(profile.skillTags.length),
    sub: "Core technologies",
    note: "React, Next.js, TypeScript, Tailwind",
    metrics: [
      ["Styling", "Tailwind"],
      ["Motion", "Framer"],
    ],
    href: "#skills",
  },
];

export default function Hero() {
  const words = "Frontend Engineering Done Right.".split(" ");

  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40 4k:pt-52">
      <RainbowSwirl className="pointer-events-none absolute left-1/2 top-[58%] w-[80rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]" />

      <Container size="xl" className="relative text-center">
        <h1 className="hero-display mx-auto mb-6 max-w-5xl text-[clamp(2.25rem,5.5vw,4.5rem)] sm:mb-8">
          {words.map((w, i) => (
            <motion.span
              key={w}
              className="mr-[0.25em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
          <Ticker />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I&apos;m {profile.name} — a {profile.title} at {profile.career.company}, crafting fast, accessible,
          pixel-perfect products for real businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease }}
          className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Magnetic strength={0.2}>
            <Button href="#contact" variant="primary">
              Get In Touch
            </Button>
          </Magnetic>
          <a href="#projects" className="cw-link">
            See my work
          </a>
          <a href="/resume" className="cw-link">
            View resume
          </a>
        </motion.div>

        <div className="mt-14 grid gap-4 text-left sm:mt-20 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => (
            <motion.a
              key={card.brand}
              href={card.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.7, ease }}
              className="cw-card group flex flex-col p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5 text-muted">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-md text-xs font-bold"
                    style={{ color: card.tone, background: `${card.tone}22` }}
                  >
                    {card.brand[0]}
                  </span>
                  {card.brand}
                </span>
                <span className="cw-badge" style={{ color: card.tone, background: `${card.tone}22` }}>
                  {card.badge}
                </span>
              </div>
              <p className="font-display text-5xl font-medium tracking-tight">
                <CountUp value={card.value} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider" style={{ color: card.tone }}>
                {card.sub}
              </p>
              <p className="mt-1 text-sm text-muted">{card.note}</p>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-border pt-4">
                <div className="flex gap-6">
                  {card.metrics.map(([k, v], j) => (
                    <div key={k}>
                      <p className="text-[10px] uppercase tracking-wider text-muted">{k}</p>
                      <p className="mt-1 text-sm" style={j ? { color: card.tone } : undefined}>
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted transition-colors group-hover:text-foreground">View →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
