"use client";

import FadeInView from "./FadeInView";

export type Project = {
  name: string;
  url?: string;
  description: string;
  tags: string[];
  category: string;
};

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const tones = ["#fc5c65", "#006eff", "#fd9644", "#26de81", "#7357eb", "#34e7e4", "#fed330"];

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const tone = tones[index % tones.length];
  const initials = project.name.replace(/\(.*\)/, "").split(/[\s.]+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2);

  const content = (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            background: `radial-gradient(circle at 25% 20%, ${tone}cc 0%, transparent 55%), radial-gradient(circle at 85% 90%, ${tone}66 0%, transparent 50%), linear-gradient(135deg, #111 0%, #1b1b1b 100%)`,
          }}
        />
        <span className="font-display absolute inset-0 grid place-items-center text-[7rem] font-extrabold tracking-tighter text-white/15 transition-transform duration-700 group-hover:scale-95">
          {initials}
        </span>
        <span className="absolute bottom-0 left-0 bg-white px-5 py-2.5 text-sm font-medium text-black">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold sm:text-2xl">{project.name}</h3>
          {project.url ? (
            <span className="text-2xl leading-none text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
              ↗
            </span>
          ) : null}
        </div>
        <p className="mb-6 flex-1 leading-relaxed text-muted">{project.description}</p>

        <p className="mb-3 text-muted">Outcomes</p>
        <div className="grid grid-cols-2 divide-x divide-white/20">
          <div className="pr-4">
            <p className="font-display text-xl font-bold sm:text-2xl">{project.tags[0]}</p>
            <p className="mt-1 text-sm text-muted">Built with</p>
          </div>
          <div className="pl-6">
            <p className="font-display text-xl font-bold sm:text-2xl">{project.url ? "Live" : "Internal"}</p>
            <p className="mt-1 text-sm text-muted">{project.tags.slice(1).join(" · ")}</p>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <FadeInView delay={(index % 3) * 0.1} className="h-full">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} (opens in new tab)`}
          className="block h-full"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </FadeInView>
  );
}
