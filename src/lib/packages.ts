/* Package names confirmed by the owner (July 2026): Visibility, Core Growth,
   Full Presence. No prices anywhere per the no-public-prices policy — every
   engagement is shaped after the Growth Audit. */

export type PackageTier = {
  slug: string;
  name: string;
  intent: string;
  description: string;
  typicallyIncludes: string[];
  recommended?: boolean;
};

export const packageTiers: PackageTier[] = [
  {
    slug: "visibility",
    name: "Visibility",
    intent: "For businesses that need the essentials working first",
    description:
      "Gets the fundamentals right: how you show up on Google, what your reviews say about you, and whether your website turns visits into enquiries.",
    typicallyIncludes: [
      "Google Business Profile optimisation",
      "Local SEO for the areas you serve",
      "Review and reputation groundwork",
      "Practical website and landing page fixes",
      "Plain-English monthly reporting",
    ],
  },
  {
    slug: "core-growth",
    name: "Core Growth",
    intent: "Where most established businesses start",
    description:
      "Everything in Visibility, plus the consistent content and social presence that make a business easier to trust once people have found it.",
    typicallyIncludes: [
      "Everything in the Visibility package",
      "SEO and content writing that answers real customer questions",
      "Social media strategy and management",
      "A structured review-growth system",
      "Monthly check-ins on what's working",
    ],
    recommended: true,
  },
  {
    slug: "full-presence",
    name: "Full Presence",
    intent: "For businesses ready to push on every channel",
    description:
      "The broadest scope: organic visibility and trust plus paid campaigns, email, and LinkedIn to actively reach the customers who aren't searching yet.",
    typicallyIncludes: [
      "Everything in Core Growth",
      "Paid advertising with clear tracking",
      "Email marketing to past enquirers and clients",
      "LinkedIn marketing for B2B visibility",
      "Dedicated landing pages for key services or areas",
    ],
  },
];

export const packagesCaveat =
  "Every package is shaped after the Growth Audit. Scope, pricing, and contract length are confirmed once we understand your business — not before.";
