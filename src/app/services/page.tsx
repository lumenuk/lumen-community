import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The AI systems Lumen Growth builds and steers: Scout agent teams, Archer lead recovery, and Voice answering and callbacks. Scoped against a call and your existing data.",
  alternates: { canonical: "/services" },
};

type SolutionCta = "contact" | "soon";

const solutions: {
  kicker: string;
  name: string;
  summary: string;
  points: string[];
  cta: SolutionCta;
}[] = [
  {
    kicker: "AI AGENT TEAMS",
    name: "Scout",
    summary:
      "A team of AI agents that research, verify, negotiate and report back — handing work to each other instead of stalling on one assistant.",
    points: [
      "Tailored to one recurring decision: a sourcing desk, a diligence team, a research crew",
      "A critic agent reviews recommendations before they reach you",
      "Anything binding is held for your approval first",
    ],
    cta: "contact",
  },
  {
    kicker: "LEAD RECOVERY",
    name: "Archer",
    summary:
      "The dormant leads you already paid for, worked across email, WhatsApp and voice until they qualify or die.",
    points: [
      "Re-engages old enquiries in your existing CRM — no migration",
      "Qualifies and books, drafts replies for anything off-script",
      "Reports back on what moved and what didn't",
    ],
    cta: "contact",
  },
  {
    kicker: "VOICE AGENTS",
    name: "Answering & callbacks",
    summary:
      "Out-of-hours pick-up, overflow cover, and calls back to anyone who abandoned a form.",
    points: [
      "Answers when you can't, in a voice scoped to your business",
      "Calls back abandoned forms and missed enquiries",
      "Hands anything it can't settle to a human, with context",
    ],
    cta: "soon",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Section tone="charcoal">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.name} delay={(index % 3) * 0.06}>
              <div className="flex h-full flex-col border-t border-white/15 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-[#7f92ff]">
                  {solution.kicker}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{solution.name}</h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal-foreground/75">
                  {solution.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {solution.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-sm leading-relaxed text-charcoal-foreground/85"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-[#7f92ff]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  {solution.cta === "contact" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-white/25 bg-transparent px-4 text-[#f4f4f2] hover:bg-white/10 dark:border-white/25 dark:bg-transparent dark:hover:bg-white/10"
                      render={<Link href="/contact" />}
                    >
                      Contact us
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-medium tracking-wide text-white/45">
                      <span className="size-1.5 rounded-full bg-[#7f92ff]/70" aria-hidden="true" />
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="light" containerClassName="text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Not sure which one fits?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tell us the task that keeps stalling. We&apos;ll tell you honestly whether an
            agent team can do it, and where a human still has to.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="warm"
              className="rounded-full px-5"
              render={<Link href={primaryCta.href} />}
            >
              {primaryCta.label}
              <ArrowUpRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/faq" />}>
              Read the FAQ
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
