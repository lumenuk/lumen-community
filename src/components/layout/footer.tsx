import Link from "next/link";
import { LumenLogo } from "@/components/layout/logo";
import { socialIconComponents } from "@/components/layout/social-icons";
import { footerNav, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <LumenLogo />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-foreground/70">
              A London business community with social media support built in.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconComponents[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lumen Growth on ${social.name} (opens in a new tab)`}
                    className="flex size-10 items-center justify-center border border-white/20 text-charcoal-foreground/80 transition-colors hover:border-warm hover:text-warm"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-charcoal-foreground">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {footerNav.explore.map((item) => (
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
