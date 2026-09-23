import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* Shared design-system marks/buttons (Sept 2026). Used across the homepage and
   every marketing page so the site reads as one surface: small accent eyebrow,
   near-black primary button, hairline outline button. */

export function Eyebrow({
  children,
  color = "#3B3BD9",
  bar = true,
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  bar?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {bar ? (
        <span
          aria-hidden="true"
          className="h-0.5 w-[26px] shrink-0"
          style={{ background: color }}
        />
      ) : null}
      <span
        className="text-[13px] font-semibold tracking-[0.14em] uppercase"
        style={{ color }}
      >
        {children}
      </span>
    </span>
  );
}

export function CtaPrimary({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-[10px] bg-[#0A0A0C] px-[30px] py-[15px] text-[15px] font-medium text-white transition-colors hover:bg-[#25252C] ${className}`}
    >
      {children}
      <ArrowUpRight className="size-[15px]" />
    </Link>
  );
}

export function CtaOutline({
  href,
  children,
  withArrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  withArrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-[10px] border border-[#D3D3DC] px-[30px] py-[15px] text-[15px] font-medium text-[#15151C] transition-colors hover:border-[#0A0A0C] hover:bg-[#F4F4F5] ${className}`}
    >
      {children}
      {withArrow ? <ArrowUpRight className="size-[15px]" /> : null}
    </Link>
  );
}
