import { headers } from "next/headers";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();

  /* Opportunistic eviction: drop expired entries so the map doesn't grow
     unbounded as distinct IPs submit over the site's lifetime. */
  for (const [key, value] of attempts) {
    if (now - value.windowStart > WINDOW_MS) attempts.delete(key);
  }

  const entry = attempts.get(identifier);
  if (!entry) {
    attempts.set(identifier, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

/* Shared by every form action for rate-limit identification. */
export async function requestIdentifier(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown"
  );
}
