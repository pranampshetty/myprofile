export const CONSENT_COOKIE = "pp_consent";
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type ConsentChoice = "all" | "essential";

export function parseConsent(raw: string | null | undefined): ConsentChoice | null {
  if (raw === "all" || raw === "essential") return raw;
  return null;
}

export function consentCookie(choice: ConsentChoice) {
  return `${CONSENT_COOKIE}=${choice}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
}

export function readConsentCookie(cookie: string): ConsentChoice | null {
  const pair = cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!pair) return null;
  return parseConsent(decodeURIComponent(pair.slice(CONSENT_COOKIE.length + 1)));
}
