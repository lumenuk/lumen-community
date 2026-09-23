import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaPrimary, CtaOutline } from "@/components/ui/cta";
import { primaryCta } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "The Lumen Growth client portal, where you run your agent and lead-gen CRM. Coming soon.",
  alternates: { canonical: "/sign-in" },
  /* Placeholder until the portal and auth are built — keep it out of search. */
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <Section tone="light" containerClassName="flex justify-center">
      <Reveal className="flex w-full max-w-md flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-full border border-[#E6E6EC] text-[#3B3BD9]">
          <Lock className="size-5" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.02em] text-[#0A0A0C] sm:text-[42px]">
          Client sign-in
        </h1>
        <p className="mt-4 text-[19px] leading-[1.6] text-[#4A4A55]">
          This is where you&apos;ll sign in to run your agent teams and lead-gen CRM.
          We&apos;re building it — sign-in isn&apos;t available just yet.
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-[#5B5B66]">
          Want early access? Book a call and we&apos;ll set you up as it goes live.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <CtaPrimary href={primaryCta.href}>{primaryCta.label}</CtaPrimary>
          <CtaOutline href="/">Back to home</CtaOutline>
        </div>
      </Reveal>
    </Section>
  );
}
