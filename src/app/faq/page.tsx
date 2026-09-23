import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { HomeFaq } from "@/components/faq/home-faq";
import { CtaPrimary } from "@/components/ui/cta";
import { primaryCta } from "@/lib/site-config";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Lumen Growth, Scout agent teams, what AI can and can't replace, data, and how our systems get started.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <Section tone="light">
      <PageIntro
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Straightforward answers about what we build, what AI can and can't take on, and how our systems get started."
      />
      <Reveal className="mt-14 flex justify-center">
        <HomeFaq items={faqItems} />
      </Reveal>
      <Reveal className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-5 text-center">
        <h2 className="font-serif text-[28px] leading-[1.1] font-normal tracking-[-0.015em] text-[#0A0A0C] sm:text-[34px]">
          Still have a question?
        </h2>
        <p className="text-[19px] leading-[1.6] text-[#4A4A55]">
          Get in touch and ask, no obligation.
        </p>
        <div className="mt-1">
          <CtaPrimary href={primaryCta.href}>{primaryCta.label}</CtaPrimary>
        </div>
      </Reveal>
    </Section>
  );
}
