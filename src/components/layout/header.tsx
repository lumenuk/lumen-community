"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LumenLogo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { mainNav, primaryCta, signInCta } from "@/lib/site-config";

function isActive(pathname: string, href: string): boolean {
  // Hash links (same-page anchors) never take the active treatment.
  if (href.startsWith("/#") || href === "/") return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECECF1] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-10 whitespace-nowrap px-6 py-4 md:px-12 md:py-[22px]">
        <Link
          href="/"
          className="shrink-0 text-[#0A0A0C]"
          aria-label="Lumen Growth home"
          onClick={() => setIsMenuOpen(false)}
        >
          <LumenLogo className="gap-[11px]" iconClassName="h-[22px]" />
        </Link>

        <nav className="hidden items-center gap-[34px] md:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] font-medium text-[#3A3A44] transition-colors hover:text-[#0A0A0C]",
                isActive(pathname, item.href) &&
                  "text-[#0A0A0C] underline decoration-[#3B3BD9] decoration-2 underline-offset-[6px]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-[22px] md:flex">
          <Link
            href={signInCta.href}
            className="text-[15px] font-medium text-[#3A3A44] transition-colors hover:text-[#0A0A0C]"
          >
            {signInCta.label}
          </Link>
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-[9px] rounded-[10px] bg-[#0A0A0C] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#25252C]"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-[13px]" />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            href={primaryCta.href}
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-[#0A0A0C] px-4 py-2 text-sm font-medium text-white"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-3" />
          </Link>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md text-[#0A0A0C]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#ECECF1] md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-[#15151C]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={signInCta.href}
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 rounded-md px-2 py-2.5 text-sm font-medium text-[#3A3A44]"
              >
                {signInCta.label}
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
