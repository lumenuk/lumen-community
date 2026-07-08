"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { LumenLogo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { mainNav, primaryCta } from "@/lib/site-config";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-foreground"
          aria-label="Lumen Growth home"
          onClick={() => setIsMenuOpen(false)}
        >
          <LumenLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" variant="warm" render={<Link href={primaryCta.href} />}>
            {primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                size="sm"
                variant="warm"
                className="mt-3"
                render={
                  <Link href={primaryCta.href} onClick={() => setIsMenuOpen(false)} />
                }
              >
                {primaryCta.label}
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
