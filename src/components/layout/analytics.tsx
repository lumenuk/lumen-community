"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getServerConsentSnapshot,
  readConsent,
  subscribeToConsent,
} from "@/lib/consent";

/* Google Analytics 4, loaded only after the visitor accepts optional cookies
   via the consent banner and only when NEXT_PUBLIC_GA_ID is configured.
   Declining (or ignoring) the banner means GA never loads. */
export function SiteAnalytics() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    getServerConsentSnapshot
  );
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
