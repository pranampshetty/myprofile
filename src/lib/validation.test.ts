import { describe, expect, it } from "vitest";
import {
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
} from "@/lib/validation";

describe("validateName", () => {
  it("rejects empty and invalid names", () => {
    expect(validateName("")).toBe("Name is required");
    expect(validateName("A")).toBe("Name must be at least 2 characters");
    expect(validateName("John123")).toMatch(/letters/);
  });

  it("accepts valid names", () => {
    expect(validateName("Pranam P Shetty")).toBeNull();
    expect(validateName("John Doe")).toBeNull();
  });
});

describe("validateEmail", () => {
  it("rejects invalid emails", () => {
    expect(validateEmail("")).toBe("Email is required");
    expect(validateEmail("pranam@codewave")).toBe("Please enter a valid email address");
  });

  it("accepts valid emails", () => {
    expect(validateEmail("john@example.com")).toBeNull();
  });
});

describe("validateMessage", () => {
  it("enforces message length", () => {
    expect(validateMessage("")).toBe("Message is required");
    expect(validateMessage("short")).toBe("Message must be at least 10 characters");
    expect(validateMessage("a".repeat(2001))).toBe("Message must be under 2000 characters");
  });

  it("accepts valid messages", () => {
    expect(validateMessage("Hello, I have a project idea.")).toBeNull();
  });
});

describe("validateContactForm", () => {
  it("returns all field errors", () => {
    const errors = validateContactForm({ name: "", email: "bad", message: "hi" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("returns no errors for valid form", () => {
    const errors = validateContactForm({
      name: "Pranam P Shetty",
      email: "test@example.com",
      message: "Let's collaborate on a project.",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
