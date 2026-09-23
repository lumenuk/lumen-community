import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { BookCallForm } from "@/components/forms/book-call-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a call with Lumen Growth. A few quick questions and we'll call you to find a time — no obligation, no hard sell.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
        <div>
          <PageIntro eyebrow="Get started" title="Book a call" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#4A4A55]">
              We build specific solutions, not just the ones we advertise — you may
              have had a conversation with us about one already. If your business needs
              something that isn&apos;t listed, we build that too.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5B5B66]">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-medium text-[#0A0A0C] underline underline-offset-4"
              >
                Write to us
              </a>
              .
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <BookCallForm />
        </Reveal>
      </div>
    </Section>
  );
}
