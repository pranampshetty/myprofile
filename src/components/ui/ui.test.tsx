import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AlertBanner from "@/components/ui/AlertBanner";
import ExternalLink from "@/components/ui/ExternalLink";

describe("AlertBanner", () => {
  it("renders success and error variants", () => {
    const { rerender } = render(<AlertBanner variant="success" message="Sent!" />);
    expect(screen.getByRole("status")).toHaveTextContent("Sent!");

    rerender(<AlertBanner variant="error" message="Failed" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Failed");
  });
});

describe("ExternalLink", () => {
  it("opens http links in a new tab", () => {
    render(
      <ExternalLink href="https://codewave.com/" className="test-link">
        Codewave
      </ExternalLink>,
    );

    const link = screen.getByRole("link", { name: "Codewave" });
    expect(link).toHaveAttribute("href", "https://codewave.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
