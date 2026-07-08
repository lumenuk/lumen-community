const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = attempts.get(identifier);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(identifier, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}
