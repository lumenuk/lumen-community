"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

/* Scout product-walkthrough video. Shows a poster frame with a play button
   (matching the design's video slot); on click it plays the MP4 with native
   controls. Kept client-side only for the click-to-play interaction — the
   markup degrades to a normal <video> if JS is unavailable. */
export function ScoutVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0f]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster="/images/scout-demo-poster.jpg"
        controls={playing}
        playsInline
        preload="metadata"
      >
        <source src="/videos/scout-demo.mp4" type="video/mp4" />
      </video>

      {playing ? null : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            videoRef.current?.play();
          }}
          aria-label="Play the Scout product walkthrough"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 transition-colors hover:bg-black/20"
        >
          <span className="grid size-[72px] place-items-center rounded-full border border-[#7f92ff] bg-[#0d0d0f]/60 text-[#7f92ff] transition-transform group-hover:scale-105">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
          <span className="font-sans text-xs tracking-[0.12em] text-white/70">
            SCOUT · PRODUCT WALKTHROUGH
          </span>
        </button>
      )}
    </div>
  );
}
