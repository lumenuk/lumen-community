import type { Metadata } from "next";
import { Section } from "@/components/section/section";
import { PageIntro } from "@/components/section/page-intro";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Lumen Growth collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section tone="light" containerClassName="max-w-3xl">
      <PageIntro title="Privacy Policy" description="Last updated 9 July 2026." />

      <p className="mt-6 rounded-md border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        This policy is a working business document maintained by Lumen Growth, not legal
        advice. It should be reviewed by a qualified adviser before being relied on as
        legally sufficient.
      </p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Who we are</h2>
          <p className="mt-2">
            Lumen Growth (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a London business community
            and social media services provider. You can contact us at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
              {siteConfig.contactEmail}
            </a>{" "}
            about anything in this policy, including exercising your data protection rights.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            What we collect through our forms
          </h2>
          <p className="mt-2">
            When you apply to join the community, we ask for your full name, business
            name, website (optional), email address, phone number (optional), a short
            description of your business, and what you&apos;re hoping to get from the
            community. When you request a Content Audit, we ask for your full name,
            business name, website, email address, phone number (optional), what you want
            more of, and your preferred contact method. If you subscribe to the
            newsletter, we collect your email address only. We only collect what we need
            to handle your enquiry.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Why we collect it</h2>
          <p className="mt-2">
            We use this information to review your business, decide whether we&apos;re a
            good fit to work together, and contact you about your enquiry. We do not use it
            for any other purpose, and we do not sell it to third parties. Our legal basis
            for processing this information is your consent, given when you submit the form.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Where it&apos;s stored and who we share it with
          </h2>
          <p className="mt-2">
            Form submissions are stored securely on the infrastructure that hosts
            this website and are accessed only by Lumen Growth to handle your enquiry. We
            don&apos;t sell your information or share it with third parties for their own
            marketing. Categories of service providers that may process data on our behalf
            are limited to our website hosting provider, an email delivery service used to
            forward your enquiry to us, and, if you consent to analytics cookies, Google
            Analytics. If we adopt additional tools, they will be reflected here.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Marketing communications</h2>
          <p className="mt-2">
            Submitting a membership application or Content Audit form is consent for us to
            contact you about that enquiry. It is not a subscription to a marketing list.
            The newsletter is separate: you only receive it if you subscribe with your
            email address, and every email includes a way to unsubscribe. You can ask us
            to stop contacting you at any time.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">How long we keep it</h2>
          <p className="mt-2">
            If we don&apos;t end up working together, we keep your enquiry details for a
            reasonable period in case you get back in touch, and delete them sooner on
            request. If we do work together, we retain the information for the duration of
            our engagement and for as long as required by law afterwards, for example for
            accounting purposes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Cookies</h2>
          <p className="mt-2">
            We use essential cookies required for this website to function, and, only with
            your consent, optional analytics cookies (Google Analytics) to understand how
            the site is used. Analytics is not loaded at all unless you accept it via the
            cookie banner. You can decline optional cookies using the banner, and you can
            change your mind at any time by clearing your browser&apos;s local storage for
            this site.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
          <p className="mt-2">
            Under UK GDPR, you have the right to access, correct, or delete the personal
            information we hold about you, to object to or restrict how we use it, and to
            ask us to provide it to you in a portable format. To exercise any of these
            rights, email us at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
              {siteConfig.contactEmail}
            </a>
            . You also have the right to complain to the Information Commissioner&apos;s
            Office (ICO) if you believe we haven&apos;t handled your information properly.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">Changes to this policy</h2>
          <p className="mt-2">
            If we make material changes to how we handle your information, we&apos;ll update
            this page and change the date at the top.
          </p>
        </div>
      </div>
    </Section>
  );
}
