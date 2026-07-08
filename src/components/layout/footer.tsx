import Link from "next/link";
import { LumenLogo } from "@/components/layout/logo";
import { footerNav, siteConfig, targetAreas } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <LumenLogo />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-foreground/70">
              A London marketing agency for established businesses across{" "}
              {targetAreas.slice(1).join(", ")}, and beyond.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-charcoal-foreground">Company</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-charcoal-foreground">Legal</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 block text-sm break-all text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
            >
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-charcoal-foreground/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
