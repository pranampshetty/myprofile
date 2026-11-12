import { describe, expect, it } from "vitest";
import { consentCookie, parseConsent, readConsentCookie } from "@/lib/consent";

describe("consent", () => {
  it("accepts only the two stored choices", () => {
    expect(parseConsent("all")).toBe("all");
    expect(parseConsent("essential")).toBe("essential");
    expect(parseConsent("yes")).toBeNull();
    expect(parseConsent(null)).toBeNull();
  });

  it("reads the choice back out of a cookie string", () => {
    expect(readConsentCookie(`theme=dark; ${consentCookie("essential")}`)).toBe("essential");
    expect(readConsentCookie("")).toBeNull();
  });
});
