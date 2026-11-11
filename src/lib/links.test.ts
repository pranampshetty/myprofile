import { describe, expect, it } from "vitest";
import { getExternalLinkProps, isExternalUrl } from "@/lib/links";

describe("links", () => {
  it("detects external urls", () => {
    expect(isExternalUrl("https://example.com")).toBe(true);
    expect(isExternalUrl("mailto:test@example.com")).toBe(true);
    expect(isExternalUrl("/resume")).toBe(false);
  });

  it("returns blank target props for http links only", () => {
    expect(getExternalLinkProps("https://example.com")).toEqual({
      target: "_blank",
      rel: "noopener noreferrer",
    });
    expect(getExternalLinkProps("mailto:test@example.com")).toEqual({});
    expect(getExternalLinkProps("#contact")).toEqual({});
  });
});
