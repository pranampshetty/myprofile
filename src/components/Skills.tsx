"use client";

import { profile } from "@/data/profile";
import { FadeInView, PageSection, SkillBar, Tag } from "@/components/ui";

export default function Skills() {
  return (
    <PageSection
      id="skills"
      label="Expertise"
      sectionClassName="section-padding-bottom-compact"
      title={
        <>
          Tools I <span className="accent-italic">master.</span>
        </>
      }
    >
      <div className="mb-10 grid gap-4 sm:mb-16 sm:grid-cols-2 sm:gap-6 lg:gap-8 4k:grid-cols-2 4k:gap-10">
        {profile.skills.map((skill, index) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
        ))}
      </div>

      <FadeInView className="flex flex-wrap justify-center gap-3">
        {profile.skillTags.map((tag, i) => (
          <Tag key={tag} label={tag} index={i} />
        ))}
      </FadeInView>
    </PageSection>
  );
}
