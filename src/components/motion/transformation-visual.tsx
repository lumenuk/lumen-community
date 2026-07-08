"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";

const signals = [
  { label: "Search visibility", before: 22, after: 82 },
  { label: "Reviews & trust", before: 35, after: 90 },
  { label: "Social presence", before: 18, after: 70 },
  { label: "Google Business Profile", before: 28, after: 88 },
];

export function TransformationVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full rounded-lg border border-border bg-card p-8">
      <div className="mb-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>Before</span>
        <span>After a Growth Audit</span>
      </div>
      <div className="space-y-5">
        {signals.map((signal, index) => (
          <div key={signal.label}>
            <p className="mb-2 text-sm text-foreground">{signal.label}</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-warm"
                initial={{ width: `${signal.before}%` }}
                whileInView={{ width: shouldReduceMotion ? `${signal.before}%` : `${signal.after}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: motionTokens.duration.slow,
                  ease: motionTokens.ease,
                  delay: index * motionTokens.stagger,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
