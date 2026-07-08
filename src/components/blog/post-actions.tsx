"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LIKES_KEY = "lumen-liked-posts";

const listeners = new Set<() => void>();

function readLikedSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(LIKES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* Snapshots must be referentially stable between reads, so cache the raw string. */
let cachedRaw: string | null = null;
let cachedSlugs: string[] = [];

function getLikedSlugs(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(LIKES_KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSlugs = readLikedSlugs();
  }
  return cachedSlugs;
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function toggleLikedSlug(slug: string) {
  const current = getLikedSlugs();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  try {
    window.localStorage.setItem(LIKES_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode) — keep the in-memory state for the session
    cachedRaw = JSON.stringify(next);
    cachedSlugs = next;
  }
  listeners.forEach((listener) => listener());
}

/* Deliberately shows no like counts: the site has no backend for real ones and
   we don't display invented engagement numbers. The like is a local bookmark. */
export function PostActions({ slug, title }: { slug: string; title: string }) {
  const liked = useSyncExternalStore(
    subscribe,
    () => getLikedSlugs().includes(slug),
    () => false
  );
  const [shared, setShared] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // user dismissed the share sheet — nothing to do
    }
  };

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => toggleLikedSlug(slug)}
        aria-pressed={liked}
      >
        <Heart
          className={cn("size-4", liked && "fill-warm text-warm")}
          aria-hidden="true"
        />
        {liked ? "Liked" : "Like this article"}
      </Button>
      <Button variant="outline" size="sm" onClick={share}>
        {shared ? (
          <>
            <Check className="size-4 text-warm" aria-hidden="true" />
            Link copied
          </>
        ) : (
          <>
            <Share2 className="size-4" aria-hidden="true" />
            Share
          </>
        )}
      </Button>
    </div>
  );
}
