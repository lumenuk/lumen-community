import { HoverCard } from "@/components/motion/hover-card";

type ProcessCardProps = {
  step: number;
  title: string;
  description: string;
};

export function ProcessCard({ step, title, description }: ProcessCardProps) {
  return (
    <HoverCard>
      <article className="flex h-full flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <span className="text-sm font-medium text-warm">
          {String(step).padStart(2, "0")}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </article>
    </HoverCard>
  );
}
