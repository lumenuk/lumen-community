import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ScoutVideo } from "@/components/motion/scout-video";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { primaryCta, secondaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "AI systems that run your business",
  description:
    "Lumen Growth builds and steers teams of AI agents that recover leads, work together, and answer the phone for UK businesses. Meet Scout, and book a call.",
  alternates: { canonical: "/" },
};

const stats = [
  {
    figure: "12→35%",
    text: "UK businesses with 10+ employees using AI, late 2023 to early 2026.",
    source: "ONS · BICS",
    accent: false,
  },
  {
    figure: "1.6",
    text: "AI technologies per adopting business — wide, but one tool deep.",
    source: "ONS",
    accent: false,
  },
  {
    figure: "7%",
    text: "Of adopters use agentic AI, against 85% using text generation.",
    source: "DSIT",
    accent: true,
  },
  {
    figure: "12%",
    text: "Report increased revenue, so we scope on hours and enquiries, not promises.",
    source: "DSIT",
    accent: false,
  },
];

const faqs = [
  {
    question: "What jobs can AI actually replace?",
    answer:
      "Chasing dormant leads, qualifying enquiries, answering calls out of hours, drafting replies to routine questions, and writing up what happened. Not pricing, not anything that commits you to something binding — those wait for a human.",
  },
  {
    question: "What stays with a person?",
    answer:
      "Anything irreversible: quotes, discounts, capacity promises, and any reply the system reads as off-script. It drafts, you approve.",
  },
  {
    question: "Do I need a new CRM?",
    answer:
      "No. Every system reads and writes to the data you already hold — there is no migration.",
  },
  {
    question: "How fast does it start working?",
    answer:
      "Usually days for the first system, because it is scoped against a call and your existing data, not built from a blank brief.",
  },
  {
    question: "What if it gets something wrong?",
    answer:
      "A critic agent reviews recommendations before they reach you, and anything sent to a real customer or spent as money is held for your approval first.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 1 — Hero: live headline over the owner's blue halftone visual */}
      <header className="relative overflow-hidden bg-[#050506] text-[#f4f4f2]">
        {/* Blue glow — smooth radial wash anchored to the right (resolution
            independent, no upscaled bitmap). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(125% 115% at 112% 52%, #7d90ff 0%, #4358f2 16%, #2333c9 30%, #16206e 44%, #0a1038 56%, rgba(5,5,6,0) 70%)",
          }}
        />
        {/* Fine halftone dot texture, masked to the glow so dots brighten into
            the blue and fade out toward the headline. Crisp at any size. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(210,222,255,0.9) 0.85px, transparent 1.7px)",
            backgroundSize: "6px 6px",
            mixBlendMode: "overlay",
            opacity: 0.55,
            WebkitMaskImage:
              "radial-gradient(120% 110% at 112% 52%, #000 0%, #000 40%, transparent 66%)",
            maskImage:
              "radial-gradient(120% 110% at 112% 52%, #000 0%, #000 40%, transparent 66%)",
          }}
        />
        {/* Left-side darkening keeps the headline legible over the glow. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #050506 0%, #050506 20%, rgba(5,5,6,0.6) 42%, rgba(5,5,6,0) 60%)",
          }}
        />
        {/* Subtle top vignette for depth. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,6,0.5) 0%, rgba(5,5,6,0) 22%)",
          }}
        />
        {/* Blend the bottom of the hero into the next section (#131316) so
            there's no hard seam between them. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              "linear-gradient(180deg, rgba(19,19,22,0) 0%, rgba(19,19,22,0.6) 55%, #131316 100%)",
          }}
        />
        <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-24 lg:min-h-[620px]">
          <Reveal className="max-w-2xl">
            <h1 className="font-heading text-5xl font-medium tracking-tight text-balance uppercase sm:text-6xl lg:text-7xl">
              Systems that run your business
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-[#b4b4b0]">
              Built and steered by us. Deploy agents that recover leads, work in
              teams, and answer the phone.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="warm"
                className="rounded-full px-5"
                render={<Link href={primaryCta.href} />}
              >
                Book a call
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent px-5 text-[#f4f4f2] hover:bg-white/10 dark:border-white/25 dark:bg-transparent dark:hover:bg-white/10"
                render={<Link href={secondaryCta.href} />}
              >
                Explore Scout
              </Button>
            </div>
          </Reveal>
        </div>
      </header>

      {/* 2 — Meet Scout + product walkthrough video */}
      <section className="bg-[#131316] text-[#f4f4f2]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:py-24">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.12em] text-[#7f92ff]">
              AI AGENT TEAMS
            </p>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight">Meet Scout.</h2>
            <p className="mt-5 text-base leading-relaxed text-[#b4b4b0]">
              Scout is a team of AI agents that research, verify, negotiate and report
              back — handing work to each other instead of stalling on one assistant.
              It is built to be tailored: a sourcing desk for an importer, a diligence
              team for an agency, a research crew for anyone with a recurring decision
              to make.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ScoutVideo />
          </Reveal>
        </div>
      </section>

      {/* 3 — Evidence: light band, government statistics */}
      <section id="evidence" className="scroll-mt-16 bg-[#f2f2f0] text-[#0a0a0b]">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.14em] text-[#2f3ee0]">
              EVIDENCE
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              Don&apos;t trust us. Trust them.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-balance text-[#33332f]">
              We are new, so we will not show you client numbers we cannot stand
              behind. Here is what the government&apos;s own statisticians and
              researchers published instead — including the figure that argues against
              us.
            </p>
          </Reveal>

          <div className="mt-12 text-left">
            {stats.map((s, i) => (
              <Reveal
                key={s.figure}
                delay={(i % 2) * 0.06}
                className="grid grid-cols-1 gap-3 border-t border-[#d8d8d4] py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-7 sm:py-7"
              >
                <div
                  className="font-heading text-4xl leading-none font-medium tracking-tight sm:text-5xl"
                  style={{ color: s.accent ? "#2f3ee0" : "#0a0a0b" }}
                >
                  {s.figure}
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[#33332f]">{s.text}</p>
                  <p className="mt-2 text-[11px] tracking-wide text-[#5a5a54]">
                    {s.source}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[#d8d8d4]" />
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-[#5a5a54]">
            ONS,{" "}
            <a
              href="https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026"
              className="text-[#2f3ee0] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI in UK businesses 2023–2026
            </a>{" "}
            · DSIT,{" "}
            <a
              href="https://www.gov.uk/government/publications/ai-adoption-research"
              className="text-[#2f3ee0] underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Adoption Research
            </a>
            , 3,500 UK businesses.
          </p>
        </div>
      </section>

      {/* 4 — FAQ */}
      <section id="faq" className="scroll-mt-16 bg-[#131316] text-[#f4f4f2]">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.14em] text-[#2f3ee0]">
              FAQ
            </p>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              What jobs can AI actually replace?
            </h2>
          </Reveal>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* 5 — Book a call */}
      <section id="book" className="scroll-mt-16 bg-[#f2f2f0]">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="grid gap-10 rounded-2xl bg-[#131316] p-8 text-[#f4f4f2] sm:p-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-heading text-3xl font-medium tracking-tight">
                  Book a call
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#b4b4b0]">
                  Twenty minutes. Tell us the decision you keep putting off, and we
                  will tell you honestly whether an agent team can do it.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <Button
                  size="lg"
                  variant="warm"
                  className="rounded-full px-6"
                  render={<Link href={primaryCta.href} />}
                >
                  Request a call
                  <ArrowUpRight className="size-4" />
                </Button>
                <p className="text-xs text-[#8f8f8a]">
                  No obligation. We&apos;ll tell you honestly if it&apos;s not a fit.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
