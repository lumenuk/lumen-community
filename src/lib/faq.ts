export type FaqEntry = {
  question: string;
  answer: string;
};

export const faqItems: FaqEntry[] = [
  {
    question: "What is Lumen Growth?",
    answer:
      "Lumen Growth is an AI agency for UK businesses. We build and steer teams of AI agents that recover leads, work together, and answer the phone. Each system is scoped against a call and the data you already hold, then steered by us — not handed over and forgotten.",
  },
  {
    question: "What is Scout?",
    answer:
      "Scout is our core product: a team of AI agents that research, verify, negotiate and report back, handing work to each other instead of stalling on one assistant. It's built to be tailored — a sourcing desk for an importer, a diligence team for an agency, a research crew for anyone with a recurring decision to make.",
  },
  {
    question: "What jobs can AI actually replace?",
    answer:
      "Chasing dormant leads, qualifying enquiries, answering calls out of hours, drafting replies to routine questions, and writing up what happened. Not pricing, not anything that commits you to something binding — those wait for a human.",
  },
  {
    question: "What stays with a person?",
    answer:
      "Anything irreversible: quotes, discounts, capacity promises, and any reply the system reads as off-script. It drafts, you approve.",
  },
  {
    question: "Do I need a new CRM?",
    answer:
      "No. Every system reads and writes to the data you already hold — there is no migration.",
  },
  {
    question: "How fast does it start working?",
    answer:
      "Usually days for the first system, because it is scoped against a call and your existing data, not built from a blank brief.",
  },
  {
    question: "What if it gets something wrong?",
    answer:
      "A critic agent reviews recommendations before they reach you, and anything sent to a real customer or spent as money is held for your approval first.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We scope each system against a call and shape the price around your business, so we don't publish figures. We scope on hours saved and enquiries handled, not revenue promises — because we're new and we'd rather be honest than sell you a number we can't stand behind.",
  },
  {
    question: "What happens to our business information?",
    answer:
      "We only use the details you share to assess your enquiry and prepare for a conversation. See our Privacy Policy for exactly what we collect, why, and how long we keep it.",
  },
];
