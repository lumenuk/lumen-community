import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { MapTransformation } from "@/components/motion/map-transformation";
import { TransformationVisual } from "@/components/motion/transformation-visual";
import { ProcessCard } from "@/components/cards/process-card";
import { PackageCard } from "@/components/cards/package-card";
import { BlogCard } from "@/components/cards/blog-card";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { services } from "@/lib/services";
import { packageTiers, packagesCaveat } from "@/lib/packages";
import { getHomepageFaqItems } from "@/lib/faq";
import { getAllPosts } from "@/lib/blog";
import { methodSteps, primaryCta, targetAreas, targetIndustries } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "London Marketing Agency for Local Businesses",
  description:
    "Lumen Growth helps established London businesses in dental, healthcare, property, construction, fitness, and aesthetics become more visible and more trusted online.",
};

const visibilityProblems = [
  "Weak SEO, so competitors show up for searches you should own",
  "Poor local visibility in the areas you actually serve",
  "A thin or neglected Google Business Profile",
  "Social media that's inconsistent, or silent for months",
  "Few reviews, or good work that no one has vouched for publicly",
  "Email and LinkedIn sitting unused while competitors stay in touch",
  "Landing pages that don't make the next step obvious",
  "No tracking, so no one knows what's working or why",
];

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <Section tone="light" className="pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Good London businesses that are hard to find online.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Lumen Growth is a London marketing agency for established businesses that do
              good work but aren&apos;t showing up in local search, aren&apos;t trusted at
              first glance, or aren&apos;t converting the attention they already get.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" variant="warm" render={<Link href={primaryCta.href} />}>
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/how-it-works" />}>
                See How It Works
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <MapTransformation />
          </Reveal>
        </div>
      </Section>

      {/* 2 — Problem */}
      <Section tone="muted">
        <Reveal>
          <h2 className="max-w-2xl text-2xl font-semibold sm:text-3xl">
            Most local businesses lose enquiries before anyone picks up the phone.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A prospective client checks your Google Business Profile, your reviews, your
            website, and your social presence — usually in under a minute. If any of those
            feel thin or out of date, they move on to a competitor. The gaps are usually
            some mix of these:
          </p>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {visibilityProblems.map((problem, index) => (
            <Reveal key={problem} delay={index * 0.03}>
              <p className="flex gap-3 text-base leading-relaxed text-foreground">
                <Minus className="mt-1 size-4 shrink-0 text-warm" aria-hidden="true" />
                {problem}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3 — What we do */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">What we do</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every service exists to make your business easier to find, easier to trust,
            and easier to choose. We recommend a focused mix after a Growth Audit — never
            the whole list by default.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.05}>
              <div>
                <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="outline" render={<Link href="/services" />}>
            See all services in detail
          </Button>
        </div>
      </Section>

      {/* 4 — Who it's for */}
      <Section tone="charcoal">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Built for businesses like yours</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-foreground/70">
            We focus on established businesses where visibility and trust directly affect
            revenue, mainly across London and {targetAreas.slice(1).join(", ")}.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {targetIndustries.map((industry, index) => (
            <Reveal key={industry.name} delay={index * 0.05}>
              <div className="h-full rounded-lg border border-white/10 bg-white/5 p-6">
                <p className="font-medium text-charcoal-foreground">{industry.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-foreground/70">
                  {industry.outcome}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-charcoal-foreground/60">
          We also offer lighter, social-media-only support for lower-margin businesses
          such as cafes and restaurants where it&apos;s a good fit.
        </p>
      </Section>

      {/* 5 — How the work runs */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">How the work actually runs</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            No black box. The same six-stage method for every client, adapted to your
            business.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {methodSteps.map((item, index) => (
            <Reveal key={item.step} delay={(index % 3) * 0.06}>
              <ProcessCard step={item.step} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="outline" render={<Link href="/how-it-works" />}>
            See How It Works
          </Button>
        </div>
      </Section>

      {/* 6 — Transformation */}
      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              From easy to miss to hard to ignore
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The work compounds. A business that was invisible in local search starts
              showing up where it matters: a stronger local profile, content that answers
              real questions, reviews that reassure, a social presence that looks alive,
              and clearer routes from &ldquo;found you&rdquo; to &ldquo;enquired.&rdquo;
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We won&apos;t promise rankings or guaranteed enquiry numbers — nobody
              honestly can. We build the visibility and trust signals that make choosing
              you the easy decision, and we show you the progress plainly.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TransformationVisual />
          </Reveal>
        </div>
      </Section>

      {/* 7 — Packages preview */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Three ways to work with us</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {packagesCaveat}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packageTiers.map((tier, index) => (
            <Reveal key={tier.slug} delay={index * 0.06}>
              <PackageCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8 — Insights preview */}
      <Section tone="muted">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Insights</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Practical notes on visibility, trust, and local marketing — written for
            business owners, not marketers.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="outline" render={<Link href="/blog" />}>
            Read all insights
          </Button>
        </div>
      </Section>

      {/* 9 — FAQ preview */}
      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Questions owners actually ask</h2>
        </Reveal>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal delay={0.05}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Straight answers, including to the awkward ones. More on the{" "}
              <Link href="/faq" className="font-medium text-foreground underline underline-offset-4">
                full FAQ page
              </Link>
              .
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqAccordion items={getHomepageFaqItems()} />
          </Reveal>
        </div>
      </Section>

      {/* 10 — Final CTA */}
      <Section tone="charcoal" containerClassName="text-center" className="border-b border-white/10">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ready to see where you&apos;re losing enquiries?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-charcoal-foreground/70">
            Request a Growth Audit and we&apos;ll review your visibility, reviews, and
            marketing before we ever get on a call. No obligation, no hard sell.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="warm" render={<Link href={primaryCta.href} />}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
