import { profile } from "@/data/profile";
import { footerLinks } from "@/data/site";
import { HoverLink } from "@/components/ui";

const clients = [...new Set(profile.projects.map((p) => p.name.replace(/ \(.*\)| Admin/, "")))];

export default function Footer() {
  return (
    <footer className="no-print">
      <div className="bg-surface px-4 py-14 text-center sm:py-16">
        <p className="mb-6 text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; React.
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
          {footerLinks.map((link) => (
            <HoverLink key={link.label} href={link.href} external={"external" in link ? link.external : false}>
              {link.label}
            </HoverLink>
          ))}
        </div>
      </div>

      <div className="bg-[#f3f3f5] px-4 py-10 text-center text-neutral-700">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">Frontend at</p>
        <p className="mb-6 font-semibold text-neutral-900">
          {profile.career.company} · {profile.title}
        </p>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-neutral-500">Trusted by</p>
        <p className="mx-auto max-w-3xl">{clients.join(" · ")}</p>
      </div>
    </footer>
  );
}
