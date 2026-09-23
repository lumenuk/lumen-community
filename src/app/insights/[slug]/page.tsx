import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/insights/newsletter-form";
import { FollowLinks } from "@/components/insights/follow-links";
import { ShareRail } from "@/components/insights/share-rail";
import { formatPostDate } from "@/components/insights/post-card";
import { getPost, getPostSlugs } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false, follow: true } };

  const { title, excerpt, date, author, draft, cover } = post.metadata;
  const url = `/insights/${slug}`;
  return {
    title,
    description: excerpt,
    alternates: { canonical: url },
    // Drafts are reachable by URL for review, but never indexed.
    robots: draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: excerpt,
      url,
      type: "article",
      publishedTime: date,
      authors: author ? [author] : undefined,
      images: cover ? [cover] : undefined,
    },
  };
}

export default async function InsightsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { metadata, Content } = post;
  const displayDate = formatPostDate(metadata.date);
  const shareUrl = `${siteConfig.url}/insights/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.excerpt,
    datePublished: metadata.date,
    author: { "@type": "Organization", name: metadata.author ?? siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/lumen-growth-logo.svg` },
    },
    mainEntityOfPage: `${siteConfig.url}/insights/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Article — Financial Times-style: the reading column is offset to the
          left with a sticky share rail beside it, not centred on the page. */}
      <Section tone="light">
        <div className="max-w-5xl">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              All insights
            </Link>
          </Reveal>

          <div className="mt-8 lg:grid lg:grid-cols-[40px_minmax(0,720px)] lg:gap-12">
            <div className="mb-10 lg:mb-0">
              <ShareRail url={shareUrl} title={metadata.title} />
            </div>

            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium tracking-[0.14em] text-accent-ink uppercase">
                  {metadata.category ? <span>{metadata.category}</span> : null}
                  {metadata.category && metadata.readingMinutes ? (
                    <span className="text-border">·</span>
                  ) : null}
                  {metadata.readingMinutes ? (
                    <span>{metadata.readingMinutes} min read</span>
                  ) : null}
                </div>

                <h1 className="mt-4 font-serif text-[2rem] leading-[1.1] font-medium tracking-[-0.01em] text-balance sm:text-[2.6rem] md:text-[3.15rem] md:leading-[1.06]">
                  {metadata.title}
                </h1>

                {/* Standfirst */}
                <p className="mt-6 text-xl leading-relaxed text-muted-foreground text-pretty sm:text-2xl">
                  {metadata.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-5 text-sm text-muted-foreground">
                  <span>
                    By{" "}
                    <span className="font-medium text-foreground">
                      {metadata.author ?? siteConfig.name}
                    </span>
                  </span>
                  {displayDate ? (
                    <>
                      <span className="text-border">·</span>
                      <time dateTime={metadata.date}>{displayDate}</time>
                    </>
                  ) : null}
                </div>
              </Reveal>

              {/* Hero image — spans the reading column, FT-style. Optional. */}
              {metadata.cover ? (
                <Reveal>
                  <figure className="mt-10">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-secondary">
                      {metadata.coverLight ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={metadata.coverLight}
                          alt={metadata.coverAlt ?? ""}
                          className="absolute inset-0 size-full object-cover dark:hidden"
                        />
                      ) : null}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={metadata.cover}
                        alt={metadata.coverAlt ?? ""}
                        className={`absolute inset-0 size-full object-cover${
                          metadata.coverLight ? " hidden dark:block" : ""
                        }`}
                      />
                    </div>
                    {metadata.coverCaption ? (
                      <figcaption className="mt-3 text-sm text-muted-foreground">
                        {metadata.coverCaption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ) : null}

              {/* Body */}
              <article className="insights-article mt-10 font-serif">
                <Content />
              </article>

              {/* Newsletter + follow */}
              <div className="mt-16 border-t border-border pt-12">
                <Reveal>
                  <div>
                    <h2 className="font-serif text-xl font-medium tracking-tight sm:text-2xl">
                      Get the next one by email.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      One email when something new goes up. Practical, occasional, easy to leave.
                    </p>
                    <div className="mt-6">
                      <NewsletterForm />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.08} className="mt-8">
                  <FollowLinks />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
