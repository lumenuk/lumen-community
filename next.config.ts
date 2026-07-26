import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/* 'unsafe-inline' scripts are required by Next's bootstrap, the GA init snippet,
   and the JSON-LD block; foreign script origins are still blocked. Dev needs
   'unsafe-eval' (Turbopack source maps) and ws: (HMR websocket). */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""} https://*.google-analytics.com https://*.googletagmanager.com`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    /* Agency-era routes retired in the community repositioning (July 2026). */
    return [
      { source: "/growth-audit", destination: "/contact?enquiry=audit", permanent: true },
      { source: "/how-it-works", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          /* Vercel also sets HSTS; kept explicit so it survives a host move. */
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
