import Link from "next/link";
import { LumenLogo } from "@/components/layout/logo";
import { footerNav, siteConfig } from "@/lib/site-config";

const columns = [
  { heading: "Product", links: footerNav.product },
  { heading: "Company", links: footerNav.company },
  { heading: "Legal", links: footerNav.legal },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-16 pb-12 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-[#0A0A0C]" aria-label="Lumen Growth home">
              <LumenLogo iconClassName="h-[22px]" />
            </Link>
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-[#6B6B76]">
              AI systems built and steered for businesses across London.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#8A8A94] uppercase">
                {column.heading}
              </p>
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[15px] text-[#4A4A55] transition-colors hover:text-[#0A0A0C]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-[#E6E6EC] pt-6 text-sm text-[#8A8A94] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>London, United Kingdom</span>
        </div>
      </div>
    </footer>
  );
}
