import { describe, expect, it } from "vitest";
import { contactItems, footerLinks, navLinks } from "@/data/site";

describe("site data", () => {
  it("defines navigation links", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    expect(navLinks.some((link) => link.href === "#contact")).toBe(true);
  });

  it("defines contact items with email and phone", () => {
    expect(contactItems.some((item) => item.label === "Email")).toBe(true);
    expect(contactItems.some((item) => item.label === "Phone")).toBe(true);
  });

  it("defines footer links", () => {
    expect(footerLinks.map((link) => link.label)).toEqual([
      "Email",
      "LinkedIn",
      "Naukri",
      "Resume",
    ]);
  });
});
