import Link from "next/link";
import { ArrowUpRight, ImageIcon } from "lucide-react";
import type { PostSummary } from "@/lib/insights";
import { cn } from "@/lib/utils";

export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function Meta({ category, date, minutes }: { category?: string; date?: string; minutes?: number }) {
  const parts = [category, date, minutes ? `${minutes} min read` : undefined].filter(Boolean);
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide text-muted-foreground">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 ? <span className="text-border">·</span> : null}
          {i === 0 && category ? (
            <span className="font-medium text-accent-ink">{part}</span>
          ) : (
            part
          )}
        </span>
      ))}
    </div>
  );
}

/** A published post, linking through to the article. */
export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-[#2f3ee0]/60"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt={post.coverAlt ?? ""}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          // Neutral fallback so the grid stays even for text-only posts.
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
            <ImageIcon className="size-8" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta category={post.category} date={formatPostDate(post.date)} minutes={post.readingMinutes} />
        <h3 className="mt-3 font-heading text-xl font-medium tracking-tight text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
          Read
          <ArrowUpRight className="size-4 text-accent-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Non-interactive card that shows how a future post will look on the grid. */
export function PostCardPlaceholder({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-dashed border-border bg-card/40",
        className
      )}
    >
      <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-secondary/50 text-muted-foreground/30">
        <ImageIcon className="size-8" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs tracking-wide">
          <span className="font-medium text-accent-ink/60">{category}</span>
          <span className="text-border">·</span>
          <span className="text-muted-foreground/50">Coming soon</span>
        </div>
        <div className="mt-4 h-3.5 w-4/5 rounded bg-muted-foreground/15" />
        <div className="mt-2.5 h-3.5 w-3/5 rounded bg-muted-foreground/15" />
        <div className="mt-5 space-y-2">
          <div className="h-2.5 w-full rounded bg-muted-foreground/10" />
          <div className="h-2.5 w-11/12 rounded bg-muted-foreground/10" />
          <div className="h-2.5 w-2/3 rounded bg-muted-foreground/10" />
        </div>
      </div>
    </div>
  );
}
