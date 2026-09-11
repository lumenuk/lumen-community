import { ArrowUpRight } from "lucide-react";
import { socialIconComponents } from "@/components/layout/social-icons";
import { socialLinks } from "@/lib/site-config";

/* Where the same thinking shows up between posts. Kept visually distinct from
   the footer's small icon row so it reads as a deliberate "follow along". */
export function FollowLinks() {
  // One card sits full-width; two or more split into columns.
  const columns = socialLinks.length > 1 ? "sm:grid-cols-2" : "";
  return (
    <div className={`grid gap-4 ${columns}`}>
      {socialLinks.map((social) => {
        const Icon = socialIconComponents[social.name];
        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Lumen Growth on ${social.name} (opens in a new tab)`}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-[#2f3ee0]/60"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-[#2f3ee0]/60 group-hover:text-accent-ink">
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-foreground">{social.name}</span>
              {"handle" in social && social.handle ? (
                <span className="block truncate text-sm text-muted-foreground">
                  {social.handle}
                </span>
              ) : null}
            </span>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent-ink" />
          </a>
        );
      })}
    </div>
  );
}
