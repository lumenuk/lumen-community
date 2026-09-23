import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

/* ---------------------------------------------------------------------------
   Insights content layer.

   Posts are plain .mdx files in src/content/insights/. Each file exports its
   own metadata, e.g.:

     export const metadata = {
       title: "What AI can actually take off your plate",
       excerpt: "A plain-English look at the jobs an agent team handles well.",
       date: "2026-09-20",          // ISO date, used for ordering
       category: "AI in practice",  // optional label shown on the card
       author: "Lumen Growth",      // optional
       readingMinutes: 6,           // optional
       draft: true,                 // optional — hidden from the index, sitemap
                                    // and search, but viewable by direct URL
     };

     ## Your first heading
     ...body...

   Drop a file in, and it appears on /insights automatically — no registry to
   edit. See src/content/insights/README.md for the full template.

   Two publish states:
     - A "_"-prefixed filename (e.g. _template.mdx) never resolves at all —
       it's a template/ignored file. Keeping one present also gives Turbopack a
       non-empty module context for the dynamic import below, so the build
       succeeds even with nothing published.
     - `draft: true` in a real post's metadata keeps it out of the index,
       sitemap and search engines, but still reachable at its URL for review.
--------------------------------------------------------------------------- */

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  author?: string;
  readingMinutes?: number;
  draft?: boolean;
  /* Optional hero image, shown full-width under the standfirst and as the card
     thumbnail on the index. Path under /public, e.g. "/images/insights/x.jpg". */
  cover?: string;
  /* Optional light-mode variant of the cover. When set, it's shown in light mode
     and `cover` is treated as the dark-mode variant (swapped via the `dark` class).
     Used for charts/diagrams that need to invert with the theme. */
  coverLight?: string;
  coverAlt?: string;
  coverCaption?: string;
};

export type PostSummary = PostFrontmatter & { slug: string };

export type LoadedPost = {
  slug: string;
  metadata: PostFrontmatter;
  Content: ComponentType;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "insights");

/* "_"-prefixed files are templates/ignored: never listed, never routable. */
function isTemplateSlug(slug: string): boolean {
  return slug.startsWith("_");
}

/** Every real post file (drafts included), by slug. */
async function listSlugs(): Promise<string[]> {
  try {
    const entries = await readdir(CONTENT_DIR);
    return entries
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => name.replace(/\.mdx$/, ""))
      .filter((slug) => !isTemplateSlug(slug));
  } catch {
    // Directory doesn't exist yet, or nothing published — that's the norm today.
    return [];
  }
}

async function loadMetadata(slug: string): Promise<PostFrontmatter | null> {
  try {
    const { metadata } = (await import(`@/content/insights/${slug}.mdx`)) as {
      metadata: PostFrontmatter;
    };
    return metadata;
  } catch {
    return null;
  }
}

function byNewestFirst(a: PostSummary, b: PostSummary): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Slugs of published (non-draft) posts. Used by the sitemap and static params. */
export async function getPostSlugs(): Promise<string[]> {
  const slugs = await listSlugs();
  const withMeta = await Promise.all(
    slugs.map(async (slug) => ({ slug, metadata: await loadMetadata(slug) }))
  );
  return withMeta.filter((p) => p.metadata && !p.metadata.draft).map((p) => p.slug);
}

/** Metadata for every published post, newest first. Used by the index. */
export async function getPostSummaries(): Promise<PostSummary[]> {
  const slugs = await listSlugs();
  const loaded = await Promise.all(
    slugs.map(async (slug) => {
      const metadata = await loadMetadata(slug);
      return metadata ? { slug, ...metadata } : null;
    })
  );
  return loaded
    .filter((p): p is PostSummary => p !== null && !p.draft)
    .sort(byNewestFirst);
}

/** Whether any posts are published yet. Drives the /insights empty state. */
export async function hasPosts(): Promise<boolean> {
  return (await getPostSummaries()).length > 0;
}

/** A single post's metadata + rendered component, or null if the slug is unknown.
    Drafts resolve here (so they can be previewed) but never elsewhere. */
export async function getPost(slug: string): Promise<LoadedPost | null> {
  if (isTemplateSlug(slug)) return null;
  try {
    const mod = (await import(`@/content/insights/${slug}.mdx`)) as {
      default: ComponentType;
      metadata: PostFrontmatter;
    };
    return { slug, metadata: mod.metadata, Content: mod.default };
  } catch {
    return null;
  }
}
