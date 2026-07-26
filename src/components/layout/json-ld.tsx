import { siteConfig, socialLinks } from "@/lib/site-config";

/* LocalBusiness schema for Google's local pack / knowledge panel eligibility.
   No street address exists (membership community, not a shopfront), so only
   locality-level address is given — schema.org allows this. */
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    logo: `${siteConfig.url}/lumen-growth-logo.svg`,
    image: `${siteConfig.url}/lumen-growth-logo.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    areaServed: "London, UK",
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      /* Escape "<" so a "</script>" in any config value can't break out. */
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
