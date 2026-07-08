export const siteConfig = {
  name: "Lumen Growth",
  tagline: "Marketing for London businesses that deserve to be found.",
  description:
    "Lumen Growth is a London-based marketing agency helping established local businesses become more visible, more trusted, and easier to choose online.",
  url: "https://www.lumengrowth.co.uk",
  contactEmail: "lumen.solutions.management@gmail.com",
  locationLabel: "London, UK",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blog" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerNav = {
  company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const primaryCta = {
  label: "Request a Growth Audit",
  href: "/growth-audit",
};

export const targetIndustries = [
  {
    name: "Dental clinics",
    outcome: "more enquiry calls and completed bookings from local search",
  },
  {
    name: "Private healthcare",
    outcome: "clearer visibility and more trust from prospective patients",
  },
  {
    name: "Property companies",
    outcome: "stronger local search presence and more qualified enquiries",
  },
  {
    name: "Construction and trades",
    outcome: "more inbound project enquiries and a more credible online presence",
  },
  {
    name: "Gyms and fitness businesses",
    outcome: "more sign-ups from people searching and comparing nearby",
  },
  {
    name: "Beauty and aesthetics clinics",
    outcome: "more bookings and stronger trust signals for high-consideration treatments",
  },
] as const;

export const targetAreas = [
  "London",
  "Battersea",
  "Greenwich",
  "Hackney",
  "Tower Hamlets",
  "Fulham",
  "Richmond",
] as const;

/* The delivery method — how the work itself runs once an engagement starts. */
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
      "We assess your current visibility — website, Google Business Profile, reviews, social presence — and find where enquiries are being lost.",
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
      "We do the work — profiles, pages, content, campaigns — prioritising the fixes that affect enquiries soonest.",
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
    title: "You request a Growth Audit",
    description:
      "Tell us about your business and where you're struggling to be seen or trusted online. No obligation, no hard sell.",
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
      "A short discovery call to understand your business, your goals, and whether we're a good fit for each other.",
  },
  {
    step: 4,
    title: "We agree a plan",
    description:
      "If it makes sense to work together, we discuss the right services, pricing, and contract length for your business.",
  },
] as const;
