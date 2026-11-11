import { profile } from "@/data/profile";
import { getSuccessMessage, submitContactForm } from "@/lib/contact/submitContactForm";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY", "");
    vi.stubGlobal("window", { location: { href: "" } });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses Web3Forms when access key is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY", "test-access-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      }),
    );

    const result = await submitContactForm({
      name: "Pranam P Shetty",
      email: "pranam@codewave.com",
      message: "hi how are you ..",
    });

    expect(result.method).toBe("web3forms");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("falls back to FormSubmit when no access key is set", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: "true" }),
      }),
    );

    const result = await submitContactForm({
      name: "Pranam P Shetty",
      email: "pranam@codewave.com",
      message: "hi how are you ..",
    });

    expect(result.method).toBe("formsubmit");
    expect(fetch).toHaveBeenCalledWith(
      `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`,
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("opens mailto when FormSubmit fails and no access key is set", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: "false", message: "Activation required" }),
      }),
    );

    const result = await submitContactForm({
      name: "Pranam P Shetty",
      email: "pranam@codewave.com",
      message: "hi how are you ..",
    });

    expect(result.method).toBe("mailto");
    expect(window.location.href).toContain(`mailto:${profile.email}`);
  });

  it("returns user-friendly success messages", () => {
    expect(getSuccessMessage("web3forms")).toContain(profile.email);
    expect(getSuccessMessage("mailto")).toContain("email app");
  });
});
