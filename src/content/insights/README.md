# Insights posts

Each post is a single `.mdx` file in this folder. The filename (without
`.mdx`) becomes the URL slug, so `ai-you-can-trust.mdx` publishes at
`/insights/ai-you-can-trust` (and `insights.lumengrowth.co.uk/ai-you-can-trust`).

Drop a file in here and it appears on the Insights index automatically — there
is no list to update. Delete the file to unpublish.

Files whose name starts with `_` are **drafts**: they never publish and never
get a URL. `_template.mdx` (below) is the starting point — copy it to a real
name when you're ready to go live. Keep at least one `.mdx` file in this folder
(the template counts) so the build stays green even with nothing published.

## Template

`_template.mdx` in this folder is a ready-to-copy version of the below. Rename a
copy of it (drop the `_`) to publish:

```mdx
export const metadata = {
  title: "A specific, plain headline about the thing you're explaining",
  excerpt: "One or two sentences that show on the card and in search results.",
  date: "2026-09-20",
  category: "AI in practice",
  author: "Lumen Growth",
  readingMinutes: 6,
  cover: "/images/insights/your-file.jpg",     // optional hero + card image
  coverAlt: "Describe the image for screen readers and search.",
  coverCaption: "Illustration: Lumen Growth",   // optional credit under the hero
};

Open with the point, not a warm-up. Business owners are skimming.

## A section heading

Write like you're explaining it to a smart owner over coffee. Short and medium
sentences. One idea per sentence.

- Concrete example
- Another concrete example

> A pulled-out line worth remembering.

Link to a page like [book a call](/contact) with normal Markdown links.
```

## Field notes

- `title` and `excerpt` are required. Everything else is optional.
- `date` is an ISO date (`YYYY-MM-DD`); posts are ordered newest first by it.
- `readingMinutes` is a manual estimate shown on the card; omit it if unsure.
- `cover` is the hero shown full-width under the standfirst (Financial
  Times-style) and as the card thumbnail on the index. Landscape ~16:9 reads
  best. Omit it and the post renders cleanly as text-only.
- In-body images: put files in `public/images/insights/` and reference them with
  `![alt text](/images/insights/your-file.jpg)` on their own line.
- Keep the voice on-brand: specific, commercial, no hype, no fabricated stats
  or client counts (see the `lumen-copywriting-system` skill).
