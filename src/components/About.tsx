"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { aboutDetails } from "@/data/site";
import { slideInLeft, slideInRight } from "@/lib/animations";
import RainbowSwirl from "@/components/effects/RainbowSwirl";
import { InfoCard, PageSection, ProfileAvatar } from "@/components/ui";

function PillarSlider() {
  const reducedMotion = useReducedMotion();
  const [i, setI] = useState(0);
  const pillar = profile.pillars[i];

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.pillars.length), 5000);
    return () => clearInterval(id);
  }, [reducedMotion, i]);

  return (
    <div className="cw-panel relative mt-16 overflow-hidden rounded-2xl border border-border px-6 py-12 sm:mt-24 sm:px-12 sm:py-16 lg:px-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[18rem] sm:min-h-[16rem]"
        >
          <p className="eyebrow mb-6 text-muted">{pillar.kicker}</p>
          <h3 className="mb-4 text-3xl font-light tracking-wide sm:text-5xl">{pillar.title}</h3>
          <p className="mb-6 max-w-md text-lg sm:text-xl">{pillar.lead}</p>
          <p className="mb-8 max-w-xl text-sm tracking-wide text-muted sm:text-base">{pillar.body}</p>
          <a href="#projects" className="cw-link">
            Learn more
          </a>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-end justify-between">
        <span className="cw-number text-6xl sm:text-8xl">{String(i + 1).padStart(2, "0")}</span>
        <div className="flex gap-2 pb-2" role="tablist" aria-label="Pillars">
          {profile.pillars.map((p, j) => (
            <button
              key={p.title}
              role="tab"
              aria-selected={i === j}
              aria-label={p.title}
              onClick={() => setI(j)}
              className={`h-2 rounded-full transition-all duration-500 ${i === j ? "w-7 bg-accent" : "w-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <PageSection
      id="about"
      label="About Me"
      title={
        <>
          Interfaces for the <span className="accent-italic">next billion.</span>
        </>
      }
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="relative flex aspect-[4/3] items-center justify-center"
          variants={slideInLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <RainbowSwirl className="absolute inset-0 h-full w-full" />
          <div className="relative">
            <ProfileAvatar src={profile.profileImage} alt={profile.name} size="lg" showRings={false} />
          </div>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h3 className="mb-2 text-2xl font-bold sm:text-3xl 4k:text-4xl">{profile.name}</h3>
          <p className="mb-6 text-lg">
            <span className="gradient-text">{profile.title}</span>
          </p>
          <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg 4k:text-xl">{profile.summary}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {aboutDetails.map((info, i) => (
              <InfoCard key={info.label} label={info.label} value={info.value} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>

      <PillarSlider />
    </PageSection>
  );
}
