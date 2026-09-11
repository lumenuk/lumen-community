import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { insightsHost } from "@/lib/site-config";

/* Serves the Insights blog at the connected subdomain (insights.lumengrowth.co.uk)
   while it physically lives at /insights in this one app. On that host:

     insights.lumengrowth.co.uk/            -> /insights          (index)
     insights.lumengrowth.co.uk/<slug>      -> /insights/<slug>   (a post)
     insights.lumengrowth.co.uk/insights..  -> passthrough        (avoid /insights/insights)
     insights.lumengrowth.co.uk/services..  -> passthrough        (shared header/footer nav
                                                still reaches the main site's pages)

   In Next.js 16 this file convention is called "proxy" (formerly "middleware").
   The primary host (www / apex) is untouched — the guard returns early. */

/* Top-level routes that must keep working from the shared nav even when viewed
   on the subdomain, so they are never folded into the /insights subtree. */
const RESERVED_SEGMENTS = new Set([
  "insights",
  "services",
  "contact",
  "faq",
  "privacy-policy",
  "terms",
  "sign-in",
  // Next.js metadata routes that have no file extension.
  "opengraph-image",
  "icon",
  "apple-icon",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host !== insightsHost) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (firstSegment !== "" && RESERVED_SEGMENTS.has(firstSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/insights" : `/insights${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /* Skip Next internals, the API, and any request for a file (has a dot), so
     assets and _next chunks are never rewritten. */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.).*)"],
};
