import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
