"use client";

/* Shared cookie-consent store: the banner writes it, analytics reads it.
   Kept as a module-level external store so both stay in sync via
   useSyncExternalStore without a context provider. */

const STORAGE_KEY = "lumen-cookie-consent";

export type ConsentValue = "accepted" | "declined" | null;

let cachedConsent: ConsentValue = null;
let hasReadStorage = false;
const listeners = new Set<() => void>();

export function readConsent(): ConsentValue {
  if (typeof window === "undefined") {
    return null;
  }
  if (!hasReadStorage) {
    cachedConsent = window.localStorage.getItem(STORAGE_KEY) as ConsentValue;
    hasReadStorage = true;
  }
  return cachedConsent;
}

export function subscribeToConsent(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function setConsent(value: ConsentValue) {
  if (typeof window !== "undefined" && value) {
    window.localStorage.setItem(STORAGE_KEY, value);
  }
  cachedConsent = value;
  hasReadStorage = true;
  listeners.forEach((listener) => listener());
}

export function getServerConsentSnapshot(): ConsentValue {
  return null;
}
