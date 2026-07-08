import { HoverCard } from "@/components/motion/hover-card";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <HoverCard>
      <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        <p className="mt-auto pt-3 text-sm font-medium text-foreground">{service.outcome}</p>
      </article>
    </HoverCard>
  );
}
