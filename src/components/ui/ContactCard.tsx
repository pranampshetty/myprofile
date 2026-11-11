"use client";

import { motion } from "framer-motion";
import { getExternalLinkProps } from "@/lib/links";
import Card from "./Card";
import FadeInView from "./FadeInView";
import HoverGlow from "./HoverGlow";
import IconBox from "./IconBox";
import type { IconName } from "./Icon";

type ContactCardProps = {
  icon: IconName;
  label: string;
  value: string;
  href?: string | null;
  gradient?: string;
  delay?: number;
};

const valueClasses =
  "block break-all text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent-light sm:text-base";

export default function ContactCard({
  icon,
  label,
  value,
  href,
  gradient = "from-accent to-accent-light",
  delay = 0,
}: ContactCardProps) {
  return (
    <FadeInView delay={delay} className="w-full min-w-0">
      <HoverGlow effect="lift" className="group rounded-2xl">
        <Card
          variant="glass"
          glow
          className="flex w-full min-w-0 items-start gap-3 p-4 sm:items-center sm:gap-4 sm:p-5 md:gap-5 md:p-6"
        >
          <motion.div className="shrink-0" whileHover={{ scale: 1.12, rotate: 8 }} transition={{ duration: 0.3 }}>
            <IconBox icon={icon} size="sm" gradient={gradient} className="sm:hidden" />
            <IconBox icon={icon} size="md" gradient={gradient} className="hidden sm:flex md:hidden" />
            <IconBox icon={icon} size="lg" gradient={gradient} className="hidden md:flex" />
          </motion.div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="mb-0.5 text-xs text-muted transition-colors group-hover:text-accent-cyan sm:text-sm">
              {label}
            </p>
            {href ? (
              <a href={href} className={valueClasses} {...getExternalLinkProps(href)}>
                {value}
              </a>
            ) : (
              <p className={`${valueClasses} break-words`}>{value}</p>
            )}
          </div>
        </Card>
      </HoverGlow>
    </FadeInView>
  );
}
