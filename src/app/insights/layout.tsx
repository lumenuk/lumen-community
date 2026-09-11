import { Newsreader } from "next/font/google";

/* Insights is the one place the site uses an editorial serif — a Financial
   Times-style treatment for long-form reading. Loading it here (not in the root
   layout) keeps the marketing pages on Archivo/Poppins and only pulls the serif
   for /insights. The variable is exposed as Tailwind's `font-serif`. */
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <div className={newsreader.variable}>{children}</div>;
}
