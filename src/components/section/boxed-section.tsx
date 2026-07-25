import { cn } from "@/lib/utils";

type BoxedSectionTone = "light" | "charcoal" | "warm";

type BoxedSectionProps = {
  children: React.ReactNode;
  tone?: BoxedSectionTone;
  className?: string;
  id?: string;
  /* Full-bleed layer rendered behind the padded content, spanning the
     section's entire width (not clipped to the max-w-6xl content box). */
  background?: React.ReactNode;
};

/* Homepage section language (owner update, July 2026): full-bleed colour
   bands — each section's background runs edge to edge with no outlined box.
   Content keeps the same max width and padding the boxed layout had, so
   section proportions are unchanged. (Name kept from the boxed era to avoid
   churn.) */
export function BoxedSection({
  children,
  tone = "light",
  className,
  id,
  background,
}: BoxedSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        tone === "charcoal"
          ? "bg-charcoal text-charcoal-foreground"
          : tone === "warm"
            ? "bg-warm text-warm-foreground"
            : "bg-card text-foreground"
      )}
    >
      {background}
      <div
        className={cn(
          "relative mx-auto max-w-6xl overflow-hidden p-7 sm:p-12 lg:p-16",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
