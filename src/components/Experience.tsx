"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import {
  Badge,
  ExternalLink,
  FadeInView,
  GlassCard,
  Icon,
  IconBox,
  PageSection,
} from "@/components/ui";

export default function Experience() {
  return (
    <PageSection
      id="experience"
      label="Career"
      title={
        <>
          Where I <span className="accent-italic">build &amp; ship.</span>
        </>
      }
    >
      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-px opacity-60 [background:linear-gradient(to_bottom,#34e7e4,#fc5c65,#fd9644,#fed330,#26de81,#7357eb)] sm:left-6 md:left-1/2" />

        {profile.experience.map((exp, index) => (
          <FadeInView
            key={exp.role}
            direction={index % 2 === 0 ? "left" : "right"}
            distance={50}
            delay={index * 0.2}
            duration={0.7}
            className={`relative mb-12 flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="hidden md:block md:w-1/2" />

            <motion.div
              className="absolute left-4 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/50 sm:left-6 sm:h-4 sm:w-4 md:left-1/2"
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
            >
              <div className="h-2 w-2 rounded-full bg-white" />
            </motion.div>

            <div
              className={`ml-10 sm:ml-14 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"}`}
            >
              <GlassCard cardClassName="p-4 sm:p-6 lg:p-8 4k:p-10">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    <IconBox
                      icon="briefcase"
                      gradient="from-accent/20 to-accent-cyan/20"
                      className="[&_svg]:text-accent-light"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      {exp.companyUrl ? (
                        <ExternalLink
                          href={exp.companyUrl}
                          className="text-accent-light transition-colors hover:text-accent-cyan"
                        >
                          {exp.company}
                        </ExternalLink>
                      ) : (
                        <p className="text-accent-light">{exp.company}</p>
                      )}
                      {"internPeriod" in exp && exp.internPeriod ? (
                        <p className="mt-1 text-xs text-muted sm:text-sm">{exp.internPeriod}</p>
                      ) : null}
                    </div>
                  </div>
                  <Badge>{exp.period}</Badge>
                </div>

                <p className="mb-6 text-muted">{exp.description}</p>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-muted"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 6, color: "rgba(240, 240, 245, 0.9)" }}
                    >
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-cyan" />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </FadeInView>
        ))}
      </div>
    </PageSection>
  );
}
