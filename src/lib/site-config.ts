export const siteConfig = {
  name: "Lumen Growth",
  communityName: "Lumen Community",
  tagline: "A London business community with your growth in mind.",
  description:
    "Lumen Growth is a London business community where members get social media support, marketing guidance, and a network of people who can help when it matters.",
  url: "https://www.lumengrowth.co.uk",
  contactEmail: "lumen.solutions.management@gmail.com",
  locationLabel: "London, UK",
};

export const mainNav = [
  { label: "Community", href: "/community" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  explore: [
    { label: "Community", href: "/community" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],
};

/* Primary conversion: joining the community. Secondary: the free Content
   Audit (owner decision, July 2026 — SEO audits are offered on outreach only,
   never as the site offer). Both land on /contact; ?enquiry=audit preselects
   the audit form. */
export const primaryCta = {
  label: "Apply to Join the Community",
  href: "/contact",
};

export const auditCta = {
  label: "Request a Free Content Audit",
  href: "/contact?enquiry=audit",
};

/* Facebook and LinkedIn pending — add once those profiles exist. */
export const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/lumengrowth.uk/" },
] as const;

/* Retained for potential reuse (process slideshow component). Not currently
   rendered anywhere since the agency-era How It Works page was removed. */
export const methodSteps = [
  {
    step: 1,
    title: "Research",
    description:
      "We learn your market: who you compete with locally, what your customers search for, and where they decide who to trust.",
  },
  {
    step: 2,
    title: "Audit",
    description:
      "We assess your current visibility: website, Google Business Profile, reviews, and social presence, and find where enquiries are being lost.",
  },
  {
    step: 3,
    title: "Strategy",
    description:
      "We agree a focused plan: which channels matter for your business, in what order, and what success looks like commercially.",
  },
  {
    step: 4,
    title: "Build and optimise",
    description:
      "We do the work: profiles, pages, content, campaigns, prioritising the fixes that affect enquiries soonest.",
  },
  {
    step: 5,
    title: "Publish and launch",
    description:
      "Improvements go live steadily and deliberately, so your business looks consistent and credible at every touchpoint.",
  },
  {
    step: 6,
    title: "Measure and improve",
    description:
      "Plain-English reporting on what moved and what didn't, and the next round of improvements based on real results.",
  },
] as const;

export const journeySteps = [
  {
    step: 1,
    title: "You get in touch",
    description:
      "Apply to join the community or request a free Content Audit. No obligation, no hard sell.",
  },
  {
    step: 2,
    title: "We review your business",
    description:
      "We look at your current visibility, reviews, search presence, and social activity, and identify where you're losing enquiries.",
  },
  {
    step: 3,
    title: "We call you",
    description:
      "A short call to understand your business, your goals, and whether we're a good fit for each other.",
  },
  {
    step: 4,
    title: "We agree a plan",
    description:
      "If it makes sense to work together, we discuss the right support for your business.",
  },
] as const;
