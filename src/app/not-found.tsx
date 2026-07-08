import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section/section";
import { primaryCta } from "@/lib/site-config";

export default function NotFound() {
  return (
    <Section tone="light" className="py-28 md:py-36" containerClassName="text-center">
      <p className="text-sm font-medium text-warm">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        This page isn&apos;t where it should be.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        We know — a marketing agency with a page you can&apos;t find. The rest of the
        site is exactly where you&apos;d expect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="warm" render={<Link href="/" />}>
          Back to the homepage
        </Button>
        <Button size="lg" variant="outline" render={<Link href={primaryCta.href} />}>
          {primaryCta.label}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Section>
  );
}
