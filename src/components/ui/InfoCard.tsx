"use client";

import HoverGlow from "./HoverGlow";
import Card from "./Card";
import FadeInView from "./FadeInView";

type InfoCardProps = {
  label: string;
  value: string;
  delay?: number;
};

export default function InfoCard({ label, value, delay = 0 }: InfoCardProps) {
  return (
    <FadeInView delay={delay}>
      <HoverGlow effect="lift" className="group rounded-xl">
        <Card variant="elevated" className="p-4 transition-colors group-hover:border-white/25">
          <p className="text-[10px] uppercase tracking-wider text-muted">
            {label}
          </p>
          <p className="mt-1 break-all text-sm font-medium">
            {value}
          </p>
        </Card>
      </HoverGlow>
    </FadeInView>
  );
}
