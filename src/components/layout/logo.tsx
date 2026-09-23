import { cn } from "@/lib/utils";

type LumenLogoProps = {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
};

/* Animated Lumen Growth mark (logo kit, Sept 2026): three arcs on a ring that
   turn 60° and back on a considered 4.5s cycle, with a fixed electric-blue centre
   dot. The ring uses currentColor, so set the text colour on the parent. The
   animation and its prefers-reduced-motion opt-out live in globals.css
   (.lumen-ring). */
export function LumenLogo({ className, iconClassName, showText = true }: LumenLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 72 72"
        fill="none"
        role="img"
        aria-label={showText ? undefined : "Lumen Growth"}
        aria-hidden={showText ? true : undefined}
        className={cn("h-7 w-auto shrink-0", iconClassName)}
      >
        <g className="lumen-ring">
          <circle
            cx="36"
            cy="36"
            r="25"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="34 18.4"
            transform="rotate(-8 36 36)"
          />
        </g>
        <circle cx="36" cy="36" r="7" fill="#2B4BFF" />
      </svg>
      {showText ? (
        <span className="text-base font-semibold tracking-tight">Lumen Growth</span>
      ) : null}
    </span>
  );
}
