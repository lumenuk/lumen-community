import { cn } from "@/lib/utils";

type SectionTone = "light" | "muted" | "charcoal";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-background text-foreground",
  muted: "bg-secondary text-foreground",
  charcoal: "bg-charcoal text-charcoal-foreground",
};

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  id?: string;
};

export function Section({
  children,
  className,
  containerClassName,
  tone = "light",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-24", toneClasses[tone], className)}>
      <div className={cn("mx-auto max-w-[1200px] px-6 md:px-12", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
