import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Lock } from "lucide-react";
import { Section } from "@/components/section/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
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
      <Reveal className="w-full max-w-md text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground">
          <Lock className="size-5" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
          Client sign-in
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This is where you&apos;ll sign in to run your agent teams and lead-gen CRM.
          We&apos;re building it — sign-in isn&apos;t available just yet.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Want early access? Book a call and we&apos;ll set you up as it goes live.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="warm"
            className="rounded-full px-5"
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label}
            <ArrowUpRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/" />}>
            Back to home
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
