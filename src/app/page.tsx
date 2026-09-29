import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ScoutVideo } from "@/components/motion/scout-video";
import { HomeFaq } from "@/components/faq/home-faq";
import { Eyebrow, CtaPrimary, CtaOutline } from "@/components/ui/cta";
import { getPostSummaries } from "@/lib/insights";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AI systems that run your business",
  description:
    "Lumen Growth builds and steers teams of AI agents tailored to your business — they recover leads, work in teams, and answer the phone. Meet Scout, and book a call.",
  alternates: { canonical: "/" },
};

/* ---- Shared bits ---------------------------------------------------------- */

function Divider() {
  return <div className="mx-6 h-px bg-[#E6E6EC] md:mx-12" />;
}

/* ---- Section data --------------------------------------------------------- */

const stats = [
  {
    figure: (
      <>
        12 <span className="text-[#3B3BD9]">→</span> 35%
      </>
    ),
    statement: "UK businesses with 10+ employees using AI, late 2023 to early 2026.",
    source: "ONS · BICS",
    color: "#0A0A0C",
  },
  {
    figure: <>1.6</>,
    statement: "AI technologies per adopting business — wide, but one tool deep.",
    source: "ONS",
    color: "#0A0A0C",
  },
  {
    figure: <>7%</>,
    statement: "Of adopters use agentic AI, against 85% using text generation.",
    source: "DSIT",
    color: "#6C3FD4",
  },
];

const faqs = [
  {
    question: "What does Lumen actually run for me?",
    answer:
      "Teams of AI agents scoped to the work that keeps stalling — chasing dormant leads, qualifying enquiries, answering calls out of hours, and writing up what happened. Not pricing, not anything binding: those stay with a person.",
  },
  {
    question: "How long before a system is live?",
    answer:
      "Usually days for the first system, because it is scoped against a call and your existing data, not built from a blank brief.",
  },
  {
    question: "Who steers the agents once they are working?",
    answer:
      "We do. A critic agent reviews recommendations before they reach you, and anything sent to a real customer or spent as money is held for your approval first — you are never handed an unattended black box.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Every system reads and writes to the data you already hold — there is no migration and no new CRM. Your data stays yours; we build around it.",
  },
];

/* Kicker colour per insights category, mirroring the design's system. */
const categoryColor: Record<string, string> = {
  Article: "#3B3BD9",
  Report: "#6C3FD4",
  Guide: "#15151C",
};

/* Placeholder "Latest thinking" cards used to fill the 3-up grid until three
   real posts are published. They link to the Insights index (not a dead post). */
const latestPlaceholders = [
  {
    kicker: "Article",
    title: "What an agent actually recovers from a missed enquiry",
    description: "The arithmetic of a phone that rings out on a Tuesday afternoon.",
  },
  {
    kicker: "Report",
    title: "The state of local search in London, 2026",
    description: "What changed for small firms when results became answers.",
  },
  {
    kicker: "Guide",
    title: "How to brief a team that answers your phone",
    description: "The decisions to make before an agent takes a single call.",
  },
];

/* ---- Page ----------------------------------------------------------------- */

export default async function HomePage() {
  const posts = await getPostSummaries();
  // Always fill three "Latest thinking" cards: real posts first, then design
  // placeholders (linking to the Insights index) for any remaining slots.
  const latestCards = [0, 1, 2].map((i) => {
    const post = posts[i];
    if (post) {
      return {
        key: post.slug,
        href: `/insights/${post.slug}`,
        kicker: post.category,
        title: post.title,
        description: post.excerpt,
      };
    }
    const ph = latestPlaceholders[i];
    return {
      key: `placeholder-${i}`,
      href: "/insights",
      kicker: ph.kicker,
      title: ph.title,
      description: ph.description,
    };
  });

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* 2 — Hero */}
      <section className="grid items-start gap-10 px-6 pt-12 pb-16 md:px-12 md:pt-16 md:pb-[88px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <Reveal className="flex flex-col gap-7">
          <Eyebrow>AI systems · London</Eyebrow>
          <h1 className="max-w-[12ch] font-serif text-[44px] leading-[1.04] font-normal tracking-[-0.02em] text-[#0A0A0C] text-pretty sm:text-[56px] lg:text-[76px]">
            Systems that run your business
          </h1>
          <p className="max-w-[42ch] text-[19px] leading-[1.6] text-[#4A4A55]">
            We build AI agents tailored to your business — and steer them once they
            are live. They recover leads, work in teams, and answer the phone.
          </p>
          <div className="mt-1 flex flex-wrap gap-3.5">
            <CtaPrimary href={primaryCta.href}>Book a call</CtaPrimary>
            <CtaOutline href="/services" withArrow>
              Explore all systems
            </CtaOutline>
          </div>
        </Reveal>

        {/* Colour bloom — no box, no hard edge; blurs and bleeds into the page. */}
        <div className="relative order-first aspect-[4/5] w-full lg:order-none">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              inset: "-14% -18% -14% -6%",
              filter: "blur(26px)",
              background:
                "radial-gradient(42% 38% at 46% 34%, rgba(108,63,212,.60) 0%, rgba(108,63,212,0) 68%), radial-gradient(46% 40% at 64% 62%, rgba(59,59,217,.52) 0%, rgba(59,59,217,0) 70%), radial-gradient(40% 34% at 30% 68%, rgba(199,201,247,.75) 0%, rgba(199,201,247,0) 72%)",
            }}
          />
        </div>
      </section>

      <Divider />

      {/* 4 — Meet Scout */}
      <section className="grid items-center gap-12 px-6 py-20 md:px-12 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-2.5">
            <Eyebrow>New release</Eyebrow>
            <Eyebrow color="#6C3FD4" bar={false}>
              AI agent teams
            </Eyebrow>
          </div>
          <h2 className="font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[42px] lg:text-[50px]">
            Meet Scout.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#4A4A55]">
            Scout was built for a business in the import and export trade: a team of
            AI agents that research suppliers, verify them, negotiate and report back
            — handing work to each other instead of stalling on one assistant. Scout
            is one example. We specify agents for any business, around the decisions
            it makes every week.
          </p>
          <div className="mt-1.5">
            <CtaPrimary href="/services">Explore all systems</CtaPrimary>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ScoutVideo />
        </Reveal>
      </section>

      <Divider />

      {/* 5 — Lead generation */}
      <section className="grid items-center gap-12 px-6 py-20 md:px-12 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <Reveal className="order-last lg:order-first">
          <div className="relative aspect-[1495/763] w-full overflow-hidden rounded-2xl border border-[#E6E6EC]">
            <Image
              src="/images/lead-gen/dashboard-qualified.webp"
              alt="Lumen Growth lead generation dashboard showing live leads"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain"
              unoptimized
            />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col gap-[22px]">
          <Eyebrow>New release</Eyebrow>
          <h2 className="font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[42px] lg:text-[50px]">
            Lead generation.
          </h2>
          <p className="text-[18px] leading-[1.65] text-[#4A4A55]">
            We built our own lead generation system, powered by AI, that finds and
            qualifies prospects for your business — and delivers live leads straight
            into a dashboard every month. No stale lists, no guesswork: just a steady
            flow of people who are actually worth calling.
          </p>
          <div className="mt-1.5">
            <CtaPrimary href={primaryCta.href}>Book a call</CtaPrimary>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* 6 — Evidence */}
      <section id="evidence" className="scroll-mt-24 px-6 pb-20 md:px-12 md:pb-24">
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-5 pt-20 text-center md:pt-24">
          <Eyebrow bar={false}>Evidence</Eyebrow>
          <h2 className="font-serif text-[34px] leading-[1.1] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[42px] lg:text-[50px]">
            Don&apos;t trust us. Trust them.
          </h2>
          <p className="max-w-[60ch] text-[19px] leading-[1.6] text-[#4A4A55]">
            We build the AI systems businesses run on, and trust in them is earned
            through evidence, not claims. Here is what the government&apos;s own
            statisticians and independent researchers found as UK firms adopt AI — the
            growth, the gap, and the figure that argues against us.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {stats.map((s, i) => (
            <Reveal
              key={s.source}
              delay={(i % 3) * 0.05}
              className="grid grid-cols-1 items-baseline gap-3 border-t border-[#E6E6EC] py-8 last:border-b sm:grid-cols-[320px_minmax(0,1fr)] sm:gap-10"
            >
              <div
                className="font-serif text-[44px] leading-none font-normal tracking-[-0.02em] sm:text-[56px]"
                style={{ color: s.color }}
              >
                {s.figure}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[19px] leading-[1.5] text-[#15151C]">{s.statement}</p>
                <p className="text-[13px] tracking-[0.06em] text-[#77777F]">{s.source}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7 — Latest thinking */}
      <section className="px-6 py-20 md:px-12 md:py-24">
        <Reveal className="flex items-baseline justify-between gap-6 border-b border-[#0A0A0C] pb-5">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-[#0A0A0C] uppercase">
            Latest thinking
          </span>
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-[15px] text-[#3B3BD9] transition-colors hover:text-[#2D2DB0]"
          >
            All insights
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="grid gap-12 pt-10 md:grid-cols-3">
          {latestCards.map((card, i) => {
            const color = (card.kicker && categoryColor[card.kicker]) ?? "#3B3BD9";
            return (
              <Reveal key={card.key} delay={(i % 3) * 0.05}>
                <Link href={card.href} className="group flex flex-col gap-2.5">
                  {card.kicker ? (
                    <span className="text-[13px]" style={{ color }}>
                      {card.kicker}
                    </span>
                  ) : null}
                  <h3 className="font-serif text-[26px] leading-[1.25] font-normal text-[#0A0A0C] transition-colors group-hover:text-[#3B3BD9]">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-[1.55] text-[#5B5B66]">
                    {card.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 8 — Common questions */}
      <section id="faq" className="scroll-mt-24 px-6 pb-20 md:px-12 md:pb-24">
        <div className="flex flex-col items-center gap-11">
          <Reveal>
            <h2 className="text-center font-serif text-[32px] leading-[1.1] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[40px] lg:text-[44px]">
              Common questions
            </h2>
          </Reveal>
          <Reveal className="flex w-full justify-center">
            <HomeFaq items={faqs} />
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* 10 — What system does your business need? (closing CTA). The bloom is
          masked at its bottom (rather than hard-clipped) so it dissolves into the
          page with no harsh line above the footer. */}
      <section className="relative px-6 pt-24 pb-28 md:px-12 md:pt-28 md:pb-[120px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            inset: "auto -8% -6% 30%",
            height: "78%",
            filter: "blur(30px)",
            background:
              "radial-gradient(40% 46% at 40% 40%, rgba(108,63,212,.30) 0%, rgba(108,63,212,0) 70%), radial-gradient(44% 44% at 70% 60%, rgba(59,59,217,.26) 0%, rgba(59,59,217,0) 72%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 80%)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 40%, transparent 80%)",
          }}
        />
        <Reveal className="relative z-[2] flex max-w-[640px] flex-col gap-[22px]">
          <Eyebrow>Get started</Eyebrow>
          <h2 className="font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[42px] lg:text-[50px]">
            What system does your business need?
          </h2>
          <p className="max-w-[52ch] text-[19px] leading-[1.6] text-[#4A4A55]">
            We build and steer agent systems around the decisions your business makes
            every week — tailored to you, not off the shelf. Book a short call and
            we&apos;ll tell you honestly what&apos;s worth automating first.
          </p>
          <div className="mt-1.5">
            <CtaPrimary href={primaryCta.href}>Book a call</CtaPrimary>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
