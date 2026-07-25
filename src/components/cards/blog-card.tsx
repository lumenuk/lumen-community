import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HoverCard } from "@/components/motion/hover-card";
import type { BlogPost } from "@/content/blog/types";

function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <HoverCard>
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col gap-3 border border-border bg-card p-6 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <p className="text-xs font-medium text-muted-foreground">
          {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
        </p>
        <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-warm-deep">
          Read the article
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </HoverCard>
  );
}
