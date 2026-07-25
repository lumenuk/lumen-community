import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { MapTransformation } from "@/components/motion/map-transformation";
import { Button } from "@/components/ui/button";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Social media content, management, strategy, and growth across Instagram, Facebook, and LinkedIn, plus marketing and SEO guidance for London businesses.",
};

const socialMediaServices = [
  {
    name: "Content creation",
    description:
      "Posts, stories, and short-form video planned and produced for you, in your voice, so your profiles look alive without eating your week.",
  },
  {
    name: "Account management",
    description:
      "Day-to-day running of your profiles: scheduling, replies, community management, and keeping everything consistent and credible.",
  },
  {
    name: "Strategy",
    description:
      "A clear plan for which platforms deserve your time and what to post on them, tied to what your business actually needs more of.",
  },
  {
    name: "Growth",
    description:
      "Steady, honest audience building. Real followers who could become customers, never bought numbers or engagement tricks.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section tone="light">
        <PageIntro
          title="Social media, handled"
          description="Content, management, strategy, and growth across Instagram, Facebook, and LinkedIn. We take on a limited number of businesses at a time: community members come first, and founder members join at lower monthly rates. Open to non-members too, with no prices published — every engagement is shaped around your business after a conversation."
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {socialMediaServices.map((service, index) => (
            <Reveal key={service.name} delay={(index % 2) * 0.06}>
              <div className="border-t border-foreground pt-5">
                <h2 className="text-xl font-semibold text-foreground">{service.name}</h2>
                <p className="mt-2.5 max-w-md text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="charcoal">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Marketing and SEO, as guidance
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-foreground/75">
              We&apos;re not pitching you a heavy retainer. Alongside social, we help
              members and clients with practical marketing advice, visibility audits,
              basic on-page SEO, and Google Business Profile support, the kind of
              journey shown here. Guidance and support first; if you need more, we&apos;ll
              say so honestly.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-foreground/75">
              The free Content Audit is the usual starting point. We review how your
              business comes across on social, then talk it through with you.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center lg:justify-end">
            <MapTransformation onDark />
          </Reveal>
        </div>
      </Section>

      <Section tone="light" containerClassName="text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Want this handled for your business?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Members get first priority on services. Start there, or just get in touch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="warm" render={<Link href={primaryCta.href} />}>
              {primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/contact" />}>
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
