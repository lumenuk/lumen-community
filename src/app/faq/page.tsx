import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/lib/site-config";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about pricing, contracts, timelines, and how Lumen Growth works with London businesses.",
};


export default function FaqPage() {
  return (
    <>
      <Section tone="light">
        <PageIntro
          title="Frequently asked questions"
          description="Straightforward answers to the questions we get asked most before someone requests a Growth Audit."
        />
      </Section>

      <Section tone="muted">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqItems} />
          </div>
        </Reveal>
      </Section>

      <Section tone="light" containerClassName="text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Still have a question?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Request a Growth Audit and mention it, or reach out directly.
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
