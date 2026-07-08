"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  getServerConsentSnapshot,
  readConsent,
  setConsent,
  subscribeToConsent,
} from "@/lib/consent";

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsent,
    getServerConsentSnapshot
  );
  const shouldReduceMotion = useReducedMotion();
  const visible = consent === null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="region"
          aria-label="Cookie consent"
          initial={shouldReduceMotion ? undefined : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { y: 40, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted-foreground">
              We use essential cookies to run this site, and optional analytics cookies to
              understand how it&apos;s used. See our{" "}
              <Link href="/privacy-policy" className="font-medium text-foreground underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setConsent("declined")}>
                Decline
              </Button>
              <Button size="sm" onClick={() => setConsent("accepted")}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
