import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { ContactForms, type ContactFormKind } from "@/components/forms/contact-forms";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Apply to join the Lumen Community or request a free Content Audit. No obligation, no hard sell.",
};

type ContactPageProps = {
  searchParams: Promise<{ enquiry?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { enquiry } = await searchParams;
  const initialKind: ContactFormKind = enquiry === "audit" ? "audit" : "membership";

  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <PageIntro
            title="Get in touch"
            description="Apply to join the community, or request a free Content Audit of your social media presence and content. Either way: no obligation, no hard sell."
          />
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                We typically respond within a few working days. If we&apos;re not the
                right fit for your business, we&apos;ll tell you directly rather than
                waste your time.
              </p>
              <p>
                Prefer email?{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Write to us
                </a>{" "}
                and we&apos;ll pick it up from there.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <ContactForms initialKind={initialKind} />
        </Reveal>
      </div>
    </Section>
  );
}
