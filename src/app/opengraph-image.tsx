import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* White editorial brand (Sept 2026 redesign): white ground, near-black wordmark,
   the Lumen ring mark with its electric-blue centre dot — mirroring globals.css. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: 80,
        }}
      >
        <svg viewBox="0 0 72 72" width="140" height="140" fill="none">
          <circle
            cx="36"
            cy="36"
            r="25"
            stroke="#0B0C10"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="34 18.4"
            transform="rotate(-8 36 36)"
          />
          <circle cx="36" cy="36" r="7" fill="#2B4BFF" />
        </svg>
        <div
          style={{
            marginTop: 36,
            fontSize: 64,
            fontWeight: 600,
            color: "#0A0A0C",
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#4A4A55",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
