import { profile } from "@/data/profile";
import type { IconName } from "@/components/ui";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
] as const;

export const aboutDetails = [
  { label: "Location", value: profile.location },
  { label: "Experience", value: `${profile.experienceYears} Years` },
  { label: "Email", value: profile.email },
  { label: "Phone", value: profile.phone },
] as const;

export type ContactItem = {
  icon: IconName;
  label: string;
  value: string;
  href: string | null;
  gradient: string;
};

export const contactItems: ContactItem[] = [
  {
    icon: "mail",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    gradient: "from-accent to-accent-light",
  },
  {
    icon: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
    gradient: "from-accent-cyan to-accent",
  },
  {
    icon: "globe",
    label: "LinkedIn",
    value: "View Profile",
    href: profile.social.linkedin,
    gradient: "from-accent to-accent-cyan",
  },
  {
    icon: "globe",
    label: "Naukri",
    value: "View Profile",
    href: profile.social.naukri,
    gradient: "from-accent-cyan to-accent-gold",
  },
  {
    icon: "map-pin",
    label: "Location",
    value: profile.location,
    href: null,
    gradient: "from-accent-gold to-accent",
  },
];

export const footerLinks = [
  { href: `mailto:${profile.email}`, label: "Email" },
  { href: profile.social.linkedin, label: "LinkedIn", external: true },
  { href: profile.social.naukri, label: "Naukri", external: true },
  { href: "/resume", label: "Resume" },
] as const;
