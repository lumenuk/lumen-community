"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? undefined : motionTokens.reveal.initial}
      whileInView={motionTokens.reveal.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
        delay,
      }}
    >
      {children}
    </Component>
  );
}
