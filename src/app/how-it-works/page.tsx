import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { ProcessSection } from "@/components/trust/process-section";
import { ProcessCard } from "@/components/cards/process-card";
import { TransformationVisual } from "@/components/motion/transformation-visual";
import { Button } from "@/components/ui/button";
import { methodSteps, primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "What actually happens when you request a Growth Audit from Lumen Growth, from first enquiry through to a discovery call.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Section tone="light">
        <PageIntro
          title="What actually happens if you enquire"
          description="We don't sell directly from this website, and we won't try to. Here's the exact process, so there are no surprises."
        />
      </Section>

      <Section tone="muted">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            From enquiry to call: four steps
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The website&apos;s job ends when you request a Growth Audit. Everything after
            that is a conversation, not a checkout.
          </p>
        </Reveal>
        <div className="mt-10">
          <ProcessSection />
        </div>
      </Section>

      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            And once we&apos;re working together
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The engagement itself follows the same six-stage method for every client —
            researched, prioritised, and measured, so you always know what we&apos;re
            doing and why.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {methodSteps.map((item, index) => (
            <Reveal key={item.step} delay={(index % 3) * 0.06}>
              <ProcessCard step={item.step} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              What we&apos;re diagnosing
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-foreground/70">
              Visibility gaps rarely have one cause. We look at how you show up in local
              search, how trustworthy you look at first glance — reviews, profile, social
              consistency — and how clearly your website turns interest into an enquiry.
              Then we prioritise the channels that move the needle for your business
              first, and measure progress in plain English.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <TransformationVisual />
          </Reveal>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">Why we work this way</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Marketing budgets and contracts should be discussed after we understand your
              business, not before. A Growth Audit lets us review your current visibility,
              reviews, and marketing so the call is useful for both of us, not a generic
              sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-2xl font-semibold sm:text-3xl">What happens after the call</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              If it makes sense to work together, we&apos;ll discuss the right services for
              your business, along with pricing and contract length. Contracts and payment
              are handled separately, mostly by bank transfer, once everything&apos;s agreed.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="charcoal" containerClassName="text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-charcoal-foreground sm:text-3xl">
            Ready to get started?
          </h2>
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
