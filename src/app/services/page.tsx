import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow, CtaPrimary, CtaOutline } from "@/components/ui/cta";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The AI systems Lumen Growth builds and steers: Scout agent teams, Archer lead generation, and Voice answering and callbacks. Scoped against a call and your existing data.",
  alternates: { canonical: "/services" },
};

type SolutionCta = "contact" | "soon";

const solutions: {
  kicker: string;
  kickerColor: string;
  name: string;
  summary: string;
  points: string[];
  cta: SolutionCta;
  note?: string;
}[] = [
  {
    kicker: "AI agent teams",
    kickerColor: "#3B3BD9",
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
    kicker: "Lead generation",
    kickerColor: "#6C3FD4",
    name: "Archer",
    summary:
      "Live leads for your business, found and qualified using our own AI systems, delivered straight to you every month.",
    points: [
      "A steady flow of new, qualified leads — not a static list",
      "Qualified before they reach you, so your time goes on real conversations",
      "Reports back on what's working and what isn't",
    ],
    cta: "contact",
    note: "Want this, or something similar for your business? Contact us and we'll talk it through.",
  },
  {
    kicker: "Voice agents",
    kickerColor: "#15151C",
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
      <Section tone="light">
        <PageIntro
          eyebrow="Solutions"
          title="Systems we build and steer"
          description="Every business loses the same hours each week — cold enquiries, calls that ring out, admin that stacks up. We build AI systems that take that work off your plate. Three we build most often:"
        />

        <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.name} delay={(index % 3) * 0.06}>
              <div className="flex h-full flex-col border-t border-[#E6E6EC] pt-6">
                <Eyebrow color={solution.kickerColor} bar={false}>
                  {solution.kicker}
                </Eyebrow>
                <h2 className="mt-4 font-serif text-[26px] leading-[1.25] font-normal text-[#0A0A0C]">
                  {solution.name}
                </h2>
                <p className="mt-3 text-[16px] leading-relaxed text-[#4A4A55]">
                  {solution.summary}
                </p>
                <ul className="mt-6 space-y-3">
                  {solution.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[15px] leading-relaxed text-[#15151C]"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-[#3B3BD9]"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                {solution.note ? (
                  <p className="mt-5 text-[14px] leading-relaxed text-[#8A8A94]">
                    {solution.note}
                  </p>
                ) : null}
                <div className="mt-auto pt-7">
                  {solution.cta === "contact" ? (
                    <CtaOutline href="/contact" withArrow>
                      Contact us
                    </CtaOutline>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-[10px] border border-[#E6E6EC] px-4 py-2 text-[13px] font-medium tracking-wide text-[#8A8A94]">
                      <span
                        className="size-1.5 rounded-full bg-[#6C3FD4]"
                        aria-hidden="true"
                      />
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 max-w-2xl text-[17px] leading-relaxed text-[#4A4A55]">
            We build specific solutions, not just the ones we advertise. If your
            business needs something that isn&apos;t listed here, we build that too.
          </p>
        </Reveal>
      </Section>

      <Section tone="light" className="pt-0" containerClassName="text-center">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="font-serif text-[32px] leading-[1.1] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[40px]">
            Not sure which one fits?
          </h2>
          <p className="max-w-xl text-[19px] leading-[1.6] text-[#4A4A55]">
            Tell us the task that keeps stalling. We&apos;ll tell you honestly whether
            an agent team can do it, and where a human still has to.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-3.5">
            <CtaPrimary href={primaryCta.href}>{primaryCta.label}</CtaPrimary>
            <CtaOutline href="/faq">Read the FAQ</CtaOutline>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
