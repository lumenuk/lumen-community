"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/* Scout product-walkthrough video. Until played it shows the design's
   indigo-violet gradient slot (cohesive with the site) with a white play button
   and caption — not a dark screenshot. On click it loads and plays the MP4 with
   native controls. */
const SLOT_GRADIENT =
  "radial-gradient(64% 72% at 26% 24%, rgba(140,102,226,.72) 0%, rgba(108,63,212,.34) 42%, rgba(38,38,64,0) 74%), radial-gradient(58% 64% at 84% 82%, rgba(59,59,217,.55) 0%, rgba(38,38,64,0) 72%), linear-gradient(150deg, #2A2A48 0%, #1E1E33 58%, #24203D 100%)";

export function ScoutVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl"
      style={{ background: SLOT_GRADIENT }}
    >
      {playing ? (
        <video
          className="h-full w-full object-cover"
          controls
          autoPlay
          playsInline
          preload="metadata"
        >
          <source src="/videos/scout-demo.mp4" type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the Scout product walkthrough"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-[18px]"
        >
          <span className="grid size-[72px] place-items-center rounded-full bg-white transition-transform group-hover:scale-105">
            <Play className="size-[22px] translate-x-[2px] fill-[#0A0A0C] text-[#0A0A0C]" />
          </span>
          <span className="text-[12px] tracking-[0.22em] text-white/90 uppercase">
            Scout · product walkthrough
          </span>
        </button>
      )}
    </div>
  );
}
