export const siteConfig = {
  name: "Lumen Growth",
  tagline: "AI systems that run your business",
  description:
    "Lumen Growth is an AI agency for UK businesses. We build and steer teams of AI agents that recover leads, work together, and answer the phone — so the work that used to stall gets done.",
  url: "https://www.lumengrowth.co.uk",
  contactEmail: "info@lumengrowth.co.uk",
  locationLabel: "London, UK",
};

export const mainNav = [
  { label: "Solutions", href: "/services" },
  { label: "Evidence", href: "/#evidence" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerNav = {
  explore: [
    { label: "Solutions", href: "/services" },
    { label: "Evidence", href: "/#evidence" },
    { label: "FAQ", href: "/faq" },
    { label: "Book a call", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],
};

/* Primary conversion: a booked call. Secondary: exploring the Scout product.
   Both are honest, low-pressure entry points into an early-stage agency. */
export const primaryCta = {
  label: "Book a call",
  href: "/contact",
};

export const secondaryCta = {
  label: "Explore Scout",
  href: "/services",
};

/* Client sign-in — the future portal where customers run their agent / lead-gen
   CRM. Not built yet; links to a "coming soon" placeholder page for now. */
export const signInCta = {
  label: "Sign in",
  href: "/sign-in",
};

/* Facebook and LinkedIn pending — add once those profiles exist. */
export const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/lumengrowth.uk/" },
] as const;
