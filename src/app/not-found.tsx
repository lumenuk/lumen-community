import { Section } from "@/components/section/section";
import { CtaPrimary, CtaOutline } from "@/components/ui/cta";
import { primaryCta } from "@/lib/site-config";

export default function NotFound() {
  return (
    <Section tone="light" className="py-28 md:py-36" containerClassName="text-center">
      <p className="text-[13px] font-semibold tracking-[0.14em] text-[#3B3BD9] uppercase">
        404
      </p>
      <h1 className="mt-4 font-serif text-[34px] leading-[1.08] font-normal tracking-[-0.02em] text-balance text-[#0A0A0C] sm:text-[44px]">
        This page isn&apos;t where it should be.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[19px] leading-[1.6] text-[#4A4A55]">
        We know: an AI agency with a page you can&apos;t find. The rest of the site is
        exactly where you&apos;d expect.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3.5">
        <CtaPrimary href="/">Back to the homepage</CtaPrimary>
        <CtaOutline href={primaryCta.href} withArrow>
          {primaryCta.label}
        </CtaOutline>
      </div>
    </Section>
  );
}
