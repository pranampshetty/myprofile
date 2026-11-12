"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { profile } from "@/data/profile";
import { navLinks } from "@/data/site";
import Magnetic from "@/components/effects/Magnetic";
import { hoverLink, tapScale } from "@/lib/hover";
import { Button, Container, Icon } from "@/components/ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 no-print sm:px-5 sm:pt-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl rounded-full border border-white/15 bg-[#0a0a0b]/80 shadow-[0_10px_38px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        <Container size="full">
          <nav className="flex items-center justify-between py-2.5 sm:py-3">
            <motion.a
              href="#home"
              className="text-base font-bold tracking-tight sm:text-lg 4k:text-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-foreground">{profile.firstName}</span>
              <span className="text-accent">.</span>
            </motion.a>

            <ul className="hidden items-center gap-4 xl:flex xl:gap-6 2xl:gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <motion.a
                    href={link.href}
                    className="nav-link-hover group relative text-[11px] font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground xl:text-xs 4k:text-sm"
                    whileHover={reducedMotion ? undefined : hoverLink}
                    whileTap={reducedMotion ? undefined : tapScale}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <div className="hidden xl:block">
              <Magnetic strength={0.2}>
                <Button href="/resume" variant="primary" className="!px-4 !py-2 !text-xs xl:!px-5 xl:!text-sm 4k:!px-6 4k:!py-2.5 4k:!text-base">
                  View Resume
                </Button>
              </Magnetic>
            </div>

            <motion.button
              className="text-foreground xl:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              whileHover={reducedMotion ? undefined : { scale: 1.1 }}
              whileTap={reducedMotion ? undefined : tapScale}
            >
              <Icon name={open ? "close" : "menu"} size={24} />
            </motion.button>
          </nav>
        </Container>
      </motion.div>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className={`mx-auto max-w-6xl overflow-hidden rounded-3xl glass xl:hidden ${open ? "mt-2" : ""}`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6 sm:py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-foreground sm:text-base"
                whileHover={reducedMotion ? undefined : { x: 6, color: "var(--foreground)" }}
                whileTap={reducedMotion ? undefined : tapScale}
              >
                {link.label}
              </motion.a>
            </li>
          ))}
          <li className="pt-2">
            <Button href="/resume" variant="primary" fullWidth>
              View Resume
            </Button>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
