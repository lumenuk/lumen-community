import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BoxedSection } from "@/components/section/boxed-section";
import { Reveal } from "@/components/motion/reveal";
import { SocialPromo } from "@/components/motion/social-promo";
import { auditCta, primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "A London Business Community",
  description:
    "Lumen Growth is a London business community where members get social media support, marketing guidance, and a network of people who can help when it matters.",
};

const communityHighlights = [
  "One-to-one check-ins, monthly or quarterly, and a call whenever something urgent comes up",
  "A members' group chat for quick asks and introductions",
  "In-person London meetups and events",
  "LinkedIn networking and partner perks negotiated for the group",
];

const socialServices = [
  "Content that sounds like you, planned and produced",
  "Day-to-day account management across Instagram, Facebook, and LinkedIn",
  "Strategy that ties posting to actual business goals",
  "Steady, honest audience growth, no bought followers",
];

export default function HomePage() {
  return (
    <div className="bg-background">
      <div>
        {/* 1 — Hero: centered copy over a full-bleed peach-to-gold fade, in the
            brand's warm hue rather than the purple in the owner's reference
            (owner reference, July 2026) */}
        <BoxedSection
          className="flex min-h-[540px] items-center justify-center py-16 lg:min-h-[580px]"
          background={
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(70% 80% at 15% 25%, oklch(0.96 0.025 45) 0%, transparent 70%), radial-gradient(70% 80% at 85% 20%, oklch(0.9 0.06 80) 0%, transparent 70%)",
              }}
            />
          }
        >
          <Reveal className="relative flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              The business community{" "}
              <span className="block text-warm-deep">London owners grow in.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              A network of London owners that shows up when it matters, with social
              media support and marketing guidance built in.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="warm" render={<Link href={primaryCta.href} />}>
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href={auditCta.href} />}>
                {auditCta.label}
              </Button>
            </div>
          </Reveal>
        </BoxedSection>

        {/* 2 — What we do */}
        <BoxedSection tone="charcoal">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What we do
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal-foreground/75">
              <p>
                Lumen Growth is a community first: a growing network of London business
                owners with structure behind it. Members get one-to-one check-ins, a
                members&apos; group chat, LinkedIn networking, and in-person meetups and
                events.
              </p>
              <p>
                Second to that, we&apos;re a social media team. When you want your
                content handled properly, our services arm takes it on. Members come
                first, though you don&apos;t have to join to work with us.
              </p>
            </div>
          </Reveal>
        </BoxedSection>

        {/* 3 — The Community */}
        <BoxedSection tone="warm">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The Lumen Community
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-warm-foreground/80">
                A growing network of London business owners who back each other. Not a
                directory, not a group chat that dies after a month. A community with
                structure behind it.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed font-medium text-warm-foreground">
                Your first week is free, and founder members join with no tie-in.
              </p>
              <div className="mt-8">
                <Button size="lg" render={<Link href="/community" />}>
                  See the Community
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="space-y-4">
                {communityHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-warm-foreground/15 pb-4 text-base leading-relaxed font-medium text-warm-foreground"
                  >
                    <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </BoxedSection>

        {/* 4 — Services: white band so the charcoal footer below reads as its own block */}
        <BoxedSection>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Make your brand look active, professional, and ready to grow.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Social media content made for local businesses. Not sure what to post?
                We plan every post before we create it, from idea to content to growth.
              </p>
              <ul className="mt-8 space-y-4">
                {socialServices.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-foreground/85"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0 text-warm-deep"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                Beyond social, we&apos;re on hand with general marketing and SEO
                guidance: practical advice, on-page basics, and Google Business Profile
                support.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="warm" render={<Link href={auditCta.href} />}>
                  {auditCta.label}
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" render={<Link href="/services" />}>
                  View Our Services
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center lg:justify-end">
              <SocialPromo />
            </Reveal>
          </div>
        </BoxedSection>
      </div>
    </div>
  );
}
