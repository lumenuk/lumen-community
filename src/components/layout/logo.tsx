import { cn } from "@/lib/utils";

type LumenLogoProps = {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
};

/* Sunburst mark from the official Lumen Growth logo kit (public/lumen-growth-icon.svg),
   inlined so it inherits currentColor: charcoal on light backgrounds, white on dark. */
export function LumenLogo({ className, iconClassName, showText = true }: LumenLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 440 270"
        role="img"
        aria-label={showText ? undefined : "Lumen Growth"}
        aria-hidden={showText ? true : undefined}
        className={cn("h-7 w-auto shrink-0", iconClassName)}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="150" y1="226" x2="78" y2="226" />
          <line x1="170" y1="212" x2="47" y2="184" />
          <line x1="181" y1="198" x2="80" y2="120" />
          <line x1="198" y1="188" x2="166" y2="86" />
          <line x1="220" y1="180" x2="220" y2="28" />
          <line x1="242" y1="188" x2="274" y2="86" />
          <line x1="259" y1="198" x2="360" y2="120" />
          <line x1="270" y1="212" x2="393" y2="184" />
          <line x1="290" y1="226" x2="362" y2="226" />
          <line x1="119" y1="164" x2="80" y2="140" />
          <line x1="172" y1="96" x2="158" y2="48" />
          <line x1="268" y1="96" x2="282" y2="48" />
          <line x1="321" y1="164" x2="360" y2="140" />
        </g>
        <circle cx="220" cy="226" r="25" fill="currentColor" />
      </svg>
      {showText ? (
        <span className="text-base font-semibold tracking-tight">Lumen Growth</span>
      ) : null}
    </span>
  );
}
