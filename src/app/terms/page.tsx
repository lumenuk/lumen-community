import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Lumen Growth website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section tone="light" containerClassName="max-w-3xl">
      <PageIntro title="Terms of use" description="Last updated 9 July 2026." />

      <p className="mt-6 rounded-md border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        These terms are a working business document maintained by Lumen Growth, not legal
        advice. They should be reviewed by a qualified adviser before being relied on as
        legally sufficient.
      </p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-lg font-semibold text-foreground">About this website</h2>
          <p className="mt-2">
            This website is operated by Lumen Growth, a London business community and
            social media services provider. These terms cover your use of this website
            only. They don&apos;t cover community membership terms or any services
            agreement, which are set out separately once we agree to work together.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Using this website</h2>
          <p className="mt-2">
            You may browse this website, apply to join the community, subscribe to the
            newsletter, and submit a Content Audit request for genuine business enquiries. You agree not to submit false information, attempt to
            disrupt the site, or use any content on it for purposes other than evaluating
            our services.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">No guaranteed outcomes</h2>
          <p className="mt-2">
            Content on this website, including service descriptions and any figures or
            examples, is provided for general information and does not guarantee specific
            marketing results. Actual outcomes depend on your business, market, and the
            services agreed once we work together.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Intellectual property</h2>
          <p className="mt-2">
            All content on this website, including text, graphics, and branding, belongs to
            Lumen Growth unless otherwise stated, and may not be copied or reused without
            permission.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Liability</h2>
          <p className="mt-2">
            We take reasonable care to keep this website accurate and available, but we
            don&apos;t accept liability for losses arising from your use of it, to the
            extent permitted by law.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Governing law</h2>
          <p className="mt-2">
            These terms are governed by the laws of England and Wales.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
