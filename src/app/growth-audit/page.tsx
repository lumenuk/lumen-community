import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { GrowthAuditForm } from "@/components/forms/growth-audit-form";

export const metadata: Metadata = {
  title: "Request a Growth Audit",
  description:
    "Tell us about your business and we'll review your visibility, reviews, and marketing before we get on a call. No obligation.",
};

export default function GrowthAuditPage() {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <PageIntro
            title="Request a Growth Audit"
            description="Tell us about your business. We'll review your current visibility, reviews, and marketing, then call you to talk through what we find. No obligation, no automated quote."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                We typically respond within a few working days. If your business isn&apos;t a
                good fit for what we do, we&apos;ll tell you directly rather than waste your
                time.
              </p>
              <p>
                Prefer email? Reach out directly and we&apos;ll pick it up from there.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <GrowthAuditForm />
        </Reveal>
      </div>
    </Section>
  );
}
