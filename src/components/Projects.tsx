"use client";

import { profile } from "@/data/profile";
import { PageSection, ProjectCard } from "@/components/ui";

export default function Projects() {
  return (
    <PageSection
      id="projects"
      label="Portfolio"
      title={
        <>
          Global <span className="accent-italic">Impact</span>
        </>
      }
      description="Production and development web applications built with React.js across healthcare, e-commerce, fintech, and more."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3 4k:gap-x-12">
        {profile.projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </PageSection>
  );
}
