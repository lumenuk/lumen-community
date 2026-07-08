export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqItems: FaqEntry[] = [
  {
    question: "How long does SEO take?",
    answer:
      "Honestly: months, not weeks. Google Business Profile improvements and paid advertising tend to show movement within weeks, but organic SEO and reputation-building compound over three to six months and beyond. We'll give you a realistic timeline for your specific situation during the Growth Audit call, not a generic promise.",
  },
  {
    question: "Do you publish prices?",
    answer:
      "No, and it's deliberate. A dental clinic in Fulham with strong reviews and a construction firm with no online presence need very different work, so a fixed price list would either overcharge one or under-serve the other. Every package is shaped after the Growth Audit, and we'll always be clear about costs before you commit to anything.",
  },
  {
    question: "What happens after I request a Growth Audit?",
    answer:
      "We review your current visibility — your website, Google Business Profile, reviews, search presence, and social activity — and then call you to talk through what we found. No obligation, no automated quote, no hard sell. If we're not the right fit for your business, we'll say so directly.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No, and you should be wary of any agency that does. Nobody controls Google's rankings or promises a fixed number of enquiries honestly. What we do commit to is a clear plan, consistent work on the things that drive visibility and trust, and plain-English reporting so you can see exactly what's improving.",
  },
  {
    question: "Do you work with new businesses?",
    answer:
      "Our focus is established local businesses that already do good work but aren't visible enough online. If you're newly opened but serious — say, a new clinic or gym with real premises and customers — request a Growth Audit and we'll tell you honestly whether it's the right time to invest in marketing.",
  },
  {
    question: "Do you only work in London?",
    answer:
      "London is our focus, particularly Battersea, Greenwich, Hackney, Tower Hamlets, Fulham, and Richmond. We're open to discussing businesses just outside these areas, especially where local search visibility works the same way.",
  },
  {
    question: "Do you manage social media?",
    answer:
      "Yes — both the strategy (which platforms are actually worth your time) and the ongoing management (content, scheduling, and keeping your profiles active and credible). For some lower-margin businesses, a lighter social-only arrangement can make sense; we'll tell you if that's the better fit.",
  },
  {
    question: "Do you run ads?",
    answer:
      "Yes. Paid advertising on Google and social platforms, with proper tracking so you can see what enquiries your budget actually produced. We'll only recommend paid campaigns where they make commercial sense for your business, not as a default.",
  },
  {
    question: "Is there a minimum contract length?",
    answer:
      "Most of our work is agreed on a minimum term, typically a few months, because SEO, reviews, and social presence take sustained effort to move. We'll be upfront about the term before you commit to anything.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "Lumen Growth manages your account and does the strategic and hands-on work directly. We're a small, focused team, not a reseller passing your account to an anonymous offshore team.",
  },
  {
    question: "What happens to our business information?",
    answer:
      "We only use the details you share to assess your enquiry and prepare for a call. See our Privacy Policy for exactly what we collect, why, and how long we keep it.",
  },
];

/* Subset shown on the homepage FAQ preview. */
export const homepageFaqQuestions = [
  "How long does SEO take?",
  "Do you publish prices?",
  "What happens after I request a Growth Audit?",
  "Do you guarantee results?",
  "Do you only work in London?",
];

export function getHomepageFaqItems(): FaqEntry[] {
  return homepageFaqQuestions
    .map((question) => faqItems.find((item) => item.question === question))
    .filter((item): item is FaqEntry => Boolean(item));
}
