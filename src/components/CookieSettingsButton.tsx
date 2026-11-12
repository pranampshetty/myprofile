"use client";

import { openCookieSettings } from "@/components/CookieConsent";

export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings} className="text-sm text-muted transition-colors hover:text-foreground">
      Cookie settings
    </button>
  );
}
