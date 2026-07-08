import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/cards/service-card";
import { PackageCard } from "@/components/cards/package-card";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";
import { packageTiers, packagesCaveat } from "@/lib/packages";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "SEO, local SEO, Google Business Profile, social media, paid advertising, email, LinkedIn, and website services for London businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="light">
        <PageIntro
          title="Services built around visibility and trust, not just activity"
          description="Every service below exists to make it easier for the right customers to find you, trust you, and choose you. We'll recommend a focused mix of these for your business after a Growth Audit, not the whole list by default."
        />
      </Section>

      <Section tone="muted">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">Three ways to work with us</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {packagesCaveat} That&apos;s also why you won&apos;t find prices here: a
            generic price would either overcharge a business with strong foundations or
            under-serve one starting from scratch.
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

      <Section tone="charcoal" containerClassName="text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-charcoal-foreground sm:text-3xl">
            Not sure which services you need?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-charcoal-foreground/70">
            That&apos;s exactly what a Growth Audit is for.
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
