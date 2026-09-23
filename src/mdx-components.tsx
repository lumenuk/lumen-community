import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* Required by @next/mdx (App Router). These map the HTML that markdown
   compiles to onto Lumen Growth's dark editorial type system, so an Insights
   post reads like the rest of the site without a typography plugin. Applied
   globally to every .mdx file; the article wrapper (see
   src/app/insights/[slug]/page.tsx) constrains measure and spacing. */
const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-14 mb-4 scroll-mt-24 font-serif text-2xl font-medium tracking-[-0.01em] text-foreground sm:text-[1.85rem]",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-10 mb-3 scroll-mt-24 font-serif text-xl font-medium tracking-[-0.01em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("my-5 text-lg leading-[1.75] text-foreground/85", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    // Content images live under /public; plain <img> matches the repo (no
    // next/image elsewhere) and needs no known dimensions from the author.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className={cn(
        "my-8 block w-full rounded-xl border border-border bg-secondary",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-5 list-disc space-y-2 pl-5 text-lg leading-[1.7] text-foreground/85 marker:text-accent-ink",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-5 list-decimal space-y-2 pl-5 text-lg leading-[1.7] text-foreground/85 marker:text-accent-ink",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1", className)} {...props} />,
  a: ({ href = "#", className, ...props }) => (
    <Link
      href={href}
      className={cn(
        "font-medium text-accent-ink underline underline-offset-4 transition-colors hover:text-[color:var(--link-hover)]",
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-8 border-l-2 border-[#3B3BD9] pl-5 text-lg leading-relaxed text-foreground/90 italic",
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 border-border", className)} {...props} />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-border bg-secondary p-4 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
