import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Quote } from "lucide-react";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/insights/newsletter-form";
import { PostCard, formatPostDate } from "@/components/insights/post-card";
import { getPostSummaries, type PostSummary } from "@/lib/insights";

/* Placeholder for a section we haven't filled yet — a plain pill, no box. */
function ComingSoon() {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
      Coming soon
    </span>
  );
}

export const metadata: Metadata = {
  title: "Insights",
  description:
    "The Lumen Growth bulletin on putting AI to work in a real UK business — the latest piece, editor's picks, and the stories worth your time. No hype, no jargon.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | Lumen Growth",
    description:
      "Plain, useful writing on putting AI to work in a real UK business — the latest piece, editor's picks, and top stories.",
    url: "/insights",
    type: "website",
  },
};

function meta(post: PostSummary): string {
  return [post.category, formatPostDate(post.date), post.readingMinutes ? `${post.readingMinutes} min read` : null]
    .filter(Boolean)
    .join("  ·  ");
}

/* ---- Lead: the most recent piece, given the front page. Full-width hero
   image with the headline stacked beneath, so the graphic reads large and
   there's no dead space beside a shorter text column. ---- */
function LeadFeature({ post }: { post: PostSummary }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <div className="max-w-3xl">
        {post.category ? (
          <p className="text-xs font-medium tracking-[0.14em] text-accent-ink uppercase">
            {post.category}
          </p>
        ) : null}
        <h2 className="mt-3 font-serif text-3xl leading-[1.08] font-medium tracking-[-0.01em] text-balance sm:text-4xl md:text-[2.7rem]">
          {post.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-5 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
          {meta(post)}
        </p>
      </div>
      {post.cover ? (
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-secondary">
          {post.coverLight ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverLight}
              alt={post.coverAlt ?? ""}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02] dark:hidden"
            />
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.coverAlt ?? ""}
            className={`absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]${
              post.coverLight ? " hidden dark:block" : ""
            }`}
          />
        </div>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-1.5 rounded-[10px] bg-[#0A0A0C] px-5 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-[#25252C]">
        Continue reading
        <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}

/* ---- Secondary headline (text-only, sits under the lead) ---- */
function SecondaryLink({ post }: { post: PostSummary }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <h3 className="font-serif text-lg leading-snug font-medium text-foreground transition-colors group-hover:text-[color:var(--link-hover)]">
        {post.title}
      </h3>
      <p className="mt-1.5 text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
        {meta(post)}
      </p>
    </Link>
  );
}

/* ---- Editor's pick (small item in the right rail) ---- */
function PickItem({ post }: { post: PostSummary }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <div className="flex items-start gap-2">
        <Quote className="mt-1 size-3.5 shrink-0 text-accent-ink" aria-hidden="true" />
        <h3 className="font-serif text-base leading-snug font-medium text-foreground transition-colors group-hover:text-[color:var(--link-hover)]">
          {post.title}
        </h3>
      </div>
      <p className="mt-1.5 pl-[22px] text-xs tracking-[0.1em] text-muted-foreground/70 uppercase">
        {formatPostDate(post.date)}
      </p>
    </Link>
  );
}

export default async function InsightsPage() {
  const posts = await getPostSummaries();
  const [lead, ...rest] = posts;
  const secondary = rest.slice(0, 2);
  const picks = rest.slice(2, 4);
  const topStories = rest.slice(4);

  return (
    <>
      {/* SEO/a11y heading only — the page opens straight into the lead story. */}
      <h1 className="sr-only">Lumen Growth Insights</h1>

      {/* Front page: lead story + editor's picks rail */}
      <Section tone="light" className="pt-10 pb-14 md:pt-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_296px] lg:gap-10">
          <Reveal>
            <div>
              {lead ? (
                <LeadFeature post={lead} />
              ) : (
                /* No published pieces yet — show the lead layout as a preview. */
                <div>
                  <div className="max-w-3xl">
                    <p className="text-xs font-medium tracking-[0.14em] text-accent-ink uppercase">
                      This week
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-[1.08] font-medium sm:text-4xl">
                      The first piece is on the way.
                    </h2>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                      When it&apos;s live it opens right here — the latest piece, front and
                      centre. Subscribe below to get it the moment it lands.
                    </p>
                  </div>
                  <div className="mt-8 aspect-[16/9] w-full rounded-xl border border-dashed border-border bg-secondary/40" />
                </div>
              )}

              {/* Secondary headlines under the lead */}
              <div className="mt-10 border-t border-border pt-8">
                {secondary.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {secondary.map((post) => (
                      <SecondaryLink key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <ComingSoon />
                )}
              </div>
            </div>
          </Reveal>

          {/* Editor's picks */}
          <Reveal delay={0.08}>
            <aside className="mt-12 border-t border-border pt-8 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <h2 className="font-serif text-lg font-medium text-accent-ink">Editor&apos;s picks</h2>
              <div className="mt-5 space-y-5">
                {picks.length > 0 ? (
                  picks.map((post) => <PickItem key={post.slug} post={post} />)
                ) : (
                  <ComingSoon />
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      {/* Top stories */}
      <Section tone="muted">
        <Reveal className="text-center">
          <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Top stories
          </h2>
        </Reveal>
        {topStories.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topStories.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 4) * 0.05}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-8 flex justify-center">
            <ComingSoon />
          </Reveal>
        )}
      </Section>

      {/* Subscribe — slim strip, no big box */}
      <Section tone="light" id="subscribe" className="scroll-mt-24 py-12 md:py-14">
        <Reveal>
          <div className="flex flex-col gap-6 border-y border-border py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <h2 className="font-serif text-2xl font-medium tracking-tight">
                Get new pieces by email.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                One message when something new goes up. Practical, occasional, easy to leave.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Leaders — one-line call for contributions, no box */}
      <Section tone="light" className="py-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Running a business and wrestling with AI?{" "}
          <Link
            href="/contact?enquiry=leaders"
            className="font-medium text-accent-ink underline underline-offset-4 hover:text-[color:var(--link-hover)]"
          >
            Tell us where you&apos;re stuck
          </Link>{" "}
          — the sharpest questions become pieces here.
        </p>
      </Section>
    </>
  );
}
