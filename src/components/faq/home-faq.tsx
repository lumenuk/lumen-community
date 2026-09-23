"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type HomeFaqItem = {
  question: string;
  answer: string;
};

/* Common-questions accordion for the homepage (design system, Sept 2026):
   hairline rows, a blue +/− marker, single row open at a time. */
export function HomeFaq({ items }: { items: HomeFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-[760px]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `home-faq-panel-${i}`;
        const buttonId = `home-faq-button-${i}`;
        return (
          <div
            key={item.question}
            className="border-t border-[#E6E6EC] last:border-b"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-[26px] text-left"
              >
                <span className="text-[19px] leading-snug text-[#15151C]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[22px] leading-none font-light text-[#3B3BD9]"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] pr-10 pb-[26px] text-[16px] leading-relaxed text-[#4A4A55]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
