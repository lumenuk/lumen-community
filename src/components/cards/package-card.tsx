import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HoverCard } from "@/components/motion/hover-card";
import { cn } from "@/lib/utils";
import type { PackageTier } from "@/lib/packages";

export function PackageCard({ tier }: { tier: PackageTier }) {
  return (
    <HoverCard>
      <article
        className={cn(
          "relative flex h-full flex-col gap-4 rounded-lg border bg-card p-6 pt-7",
          tier.recommended ? "border-warm shadow-sm" : "border-border"
        )}
      >
        {tier.recommended ? (
          <span className="absolute -top-3 left-6 rounded-full bg-warm px-3 py-1 text-xs font-medium text-warm-foreground">
            Recommended starting point
          </span>
        ) : null}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
          <p className="mt-1 text-sm font-medium text-warm">{tier.intent}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
        <ul className="space-y-2.5">
          {tier.typicallyIncludes.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-warm" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/growth-audit"
          className="mt-auto flex items-center gap-1 pt-3 text-sm font-medium text-foreground transition-colors hover:text-warm"
        >
          Start with a Growth Audit
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </article>
    </HoverCard>
  );
}
