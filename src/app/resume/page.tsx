import PrintButton from "@/components/PrintButton";
import { Container, Icon } from "@/components/ui";
import { profile } from "@/data/profile";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="no-print fixed left-0 right-0 top-0 z-50 border-b border-border glass">
        <Container size="sm" className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Icon name="arrow-left" size={16} />
            Back to Portfolio
          </Link>
          <PrintButton />
        </Container>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-24 print:py-8">
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="text-4xl font-bold tracking-tight print:text-black">{profile.name}</h1>
          <p className="mt-2 text-xl text-accent-light print:text-gray-700">{profile.title}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted print:text-gray-600">
            <span className="flex items-center gap-2">
              <Icon name="mail" size={16} />
              {profile.email}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="phone" size={16} />
              {profile.phone}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="map-pin" size={16} />
              {profile.location}
            </span>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-light print:text-gray-700"
            >
              <Icon name="globe" size={16} />
              LinkedIn
            </a>
            <a
              href={profile.social.naukri}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-light print:text-gray-700"
            >
              <Icon name="globe" size={16} />
              Naukri
            </a>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Professional Summary
          </h2>
          <p className="leading-relaxed text-muted print:text-gray-700">{profile.summary}</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.skillTags.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-surface-elevated px-3 py-1 text-sm print:border-gray-300 print:bg-gray-100 print:text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Professional Experience
          </h2>
          {profile.experience.map((exp) => (
            <div key={exp.role} className="mb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold print:text-black">{exp.role}</h3>
                <span className="text-sm text-accent-cyan print:text-gray-600">{exp.period}</span>
              </div>
              <p className="text-accent-light print:text-gray-700">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </p>
              {"internPeriod" in exp && exp.internPeriod ? (
                <p className="text-sm text-muted print:text-gray-600">{exp.internPeriod}</p>
              ) : null}
              <p className="mt-2 text-sm text-muted print:text-gray-600">{exp.description}</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted print:text-gray-600">
                {exp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Projects
          </h2>
          {profile.projects.map((project) => (
            <div key={project.name} className="mb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold print:text-black">
                  {project.name}
                  {project.url && (
                    <span className="ml-2 text-sm font-normal text-accent-cyan print:text-gray-600">
                      — {project.url}
                    </span>
                  )}
                </h3>
                <span className="text-xs text-muted print:text-gray-600">{project.category}</span>
              </div>
              <p className="mt-1 text-sm text-muted print:text-gray-600">{project.description}</p>
              <p className="mt-1 text-xs text-muted print:text-gray-500">
                {project.tags.join(" • ")}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Education
          </h2>
          {profile.education.map((edu) => (
            <div key={edu.institution} className="mb-5">
              <h3 className="font-semibold print:text-black">
                {edu.degree} — {edu.field}
              </h3>
              <p className="text-sm text-accent-light print:text-gray-700">
                {edu.url ? (
                  <a
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {edu.institution}
                  </a>
                ) : (
                  edu.institution
                )}
              </p>
              {edu.location && (
                <p className="text-sm text-muted print:text-gray-600">{edu.location}</p>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-accent-light print:text-gray-800">
            Contact
          </h2>
          <p className="text-sm text-muted print:text-gray-600">
            Email: {profile.email} | Phone: {profile.phone}
          </p>
          <p className="mt-2 text-sm text-muted print:text-gray-600">
            LinkedIn:{" "}
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline print:text-gray-700"
            >
              {profile.social.linkedin}
            </a>
            {" | "}
            Naukri:{" "}
            <a
              href={profile.social.naukri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline print:text-gray-700"
            >
              {profile.social.naukri}
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
