import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Dark AI-agency brand: near-black background, electric-blue accent, light
   wordmark — mirroring the site's globals.css palette. */
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
          background: "#0A0A0B",
          padding: 80,
        }}
      >
        <svg viewBox="0 0 440 270" width="120" height="74">
          <g
            fill="none"
            stroke="#3E5CFF"
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
          <circle cx="220" cy="226" r="25" fill="#3E5CFF" />
        </svg>
        <div
          style={{
            marginTop: 32,
            fontSize: 64,
            fontWeight: 700,
            color: "#F4F4F2",
            letterSpacing: -1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#B4B4B0",
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
