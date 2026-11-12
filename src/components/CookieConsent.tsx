"use client";

import { useEffect, useId, useState } from "react";
import { consentCookie, readConsentCookie, type ConsentChoice } from "@/lib/consent";

const OPEN = "pp-consent-open";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN));
}

export default function CookieConsent() {
  const titleId = useId();
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(false);
  const [manage, setManage] = useState(false);

  useEffect(() => {
    setBanner(readConsentCookie(document.cookie) === null);
    setReady(true);
    const onOpen = () => setManage(true);
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, []);

  function save(choice: ConsentChoice) {
    document.cookie = consentCookie(choice);
    setBanner(false);
    setManage(false);
  }

  if (!ready) return null;

  return (
    <>
      {banner && !manage && (
        <section className="cookie-banner no-print" aria-labelledby={titleId}>
          <div>
            <p className="cookie-eyebrow">Your privacy. Your choice</p>
            <h2 id={titleId}>Your privacy matters.</h2>
            <p className="cookie-copy">
              Optional storage stays off until you choose. This site only remembers that choice in
              your browser for 180 days. Nothing is sold or shared.
            </p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cw-pill cookie-accept" onClick={() => save("all")}>
              Accept all <span aria-hidden>→</span>
            </button>
            <button type="button" className="cookie-text" onClick={() => save("essential")}>
              Reject optional
            </button>
            <button type="button" className="cookie-text" onClick={() => setManage(true)}>
              Manage preferences
            </button>
          </div>
        </section>
      )}

      {manage && (
        <div className="cookie-scrim no-print" role="presentation" onClick={() => setManage(false)}>
          <div
            className="cookie-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-manage-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="cookie-eyebrow">Cookie settings</p>
                <h2 id="cookie-manage-title">You decide what stays.</h2>
              </div>
              <button type="button" className="cookie-text" onClick={() => setManage(false)} aria-label="Close">
                ×
              </button>
            </div>
            <p className="cookie-copy">
              Change this anytime from Cookie settings in the footer.
            </p>
            <div className="cookie-row">
              <div>
                <h3>Essential</h3>
                <p>Remembers your consent choice so this banner does not return every visit.</p>
              </div>
              <span className="cookie-lock">Always on</span>
            </div>
            <div className="cookie-row">
              <div>
                <h3>Optional</h3>
                <p>Reserved for a future preference. No analytics or advertising cookies run today.</p>
              </div>
              <span className="cookie-lock">Off until you accept</span>
            </div>
            <div className="cookie-actions">
              <button type="button" className="cw-pill cookie-accept" onClick={() => save("all")}>
                Accept all <span aria-hidden>→</span>
              </button>
              <button type="button" className="cookie-text" onClick={() => save("essential")}>
                Reject optional
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
