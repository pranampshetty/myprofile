import { getExternalLinkProps } from "@/lib/links";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export default function ExternalLink({ href, children, className = "" }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      {...getExternalLinkProps(href)}
    >
      {children}
    </a>
  );
}
