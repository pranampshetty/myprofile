import { describe, expect, it } from "vitest";
import { FULL_TIME_START, getExperienceYears } from "@/lib/experience";

describe("getExperienceYears", () => {
  it("returns 3+ years from March 2023 through June 2026", () => {
    expect(getExperienceYears(new Date(2026, 5, 26))).toBe("3+");
  });

  it("returns months when under one year", () => {
    expect(getExperienceYears(new Date(2023, 5, 1))).toBe("3");
  });

  it("uses March 2023 as full-time start", () => {
    expect(FULL_TIME_START.getFullYear()).toBe(2023);
    expect(FULL_TIME_START.getMonth()).toBe(2);
  });
});
