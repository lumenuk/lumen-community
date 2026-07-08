"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

type HoverCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function HoverCard({ children, className }: HoverCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", className)}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
    >
      {children}
    </motion.div>
  );
}
