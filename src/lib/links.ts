export function isExternalUrl(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function getExternalLinkProps(href: string) {
  if (!href.startsWith("http")) return {};
  return { target: "_blank" as const, rel: "noopener noreferrer" };
}
