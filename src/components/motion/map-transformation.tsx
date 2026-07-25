"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, Navigation, Phone, RotateCcw, Search, Share2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Stylised, clearly-fictional "local visibility transformation": a made-up
 * Hackney dental practice climbing from an invisible #7 local result with 3
 * reviews to the #1 result with strong ratings, photos, and citations.
 * Adapted from the client-approved design handoff; the core idea (the 4-step
 * climb over a tilted map) is fixed, the execution follows site tokens.
 */

type Step = {
  rating: number;
  reviews: number;
  rank: number;
  desc: string;
  buttons: number;
  photos: number;
  trust: boolean;
  verified: boolean;
  quote: boolean;
};

const STEPS: Step[] = [
  {
    rating: 2.7,
    reviews: 3,
    rank: 7,
    desc: "Dentist",
    buttons: 1,
    photos: 0,
    trust: false,
    verified: false,
    quote: false,
  },
  {
    rating: 3.6,
    reviews: 28,
    rank: 4,
    desc: "Dentist in Hackney · Invisalign, teeth whitening & check-ups",
    buttons: 2,
    photos: 1,
    trust: false,
    verified: false,
    quote: false,
  },
  {
    rating: 4.4,
    reviews: 117,
    rank: 2,
    desc: "Dentist in Hackney · Invisalign, teeth whitening & check-ups · Emergency appointments · Open Saturdays",
    buttons: 3,
    photos: 3,
    trust: true,
    verified: false,
    quote: false,
  },
  {
    rating: 4.8,
    reviews: 827,
    rank: 1,
    desc: "Dentist in Hackney · Invisalign, teeth whitening & check-ups · Emergency appointments · Open Saturdays",
    buttons: 4,
    photos: 3,
    trust: true,
    verified: true,
    quote: true,
  },
];

const ACTION_BUTTONS = [
  { label: "Directions", Icon: Navigation },
  { label: "Website", Icon: Globe },
  { label: "Call", Icon: Phone },
  { label: "Share", Icon: Share2 },
];

const PHOTO_CROPS = [
  { position: "center 62%", badge: "" },
  { position: "left 30%", badge: "" },
  { position: "right 40%", badge: "+9" },
];

const FADE_MS = 520;
const TWEEN_MS = 2600;

const popIn = {
  initial: { opacity: 0, y: 8, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: [0.2, 0.8, 0.3, 1] as const },
};

/* Neutral-grey street map (no cream) — fictional Hackney-ish geography. */
function MapBackdrop() {
  return (
    <svg
      viewBox="0 0 500 640"
      preserveAspectRatio="none"
      className="block h-full w-full"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="500" height="640" fill="#F2F2F1" />
      <g fill="#EAEAE8">
        <path d="M0,110 L140,116 L150,300 L0,310 Z" />
        <path d="M190,120 L310,126 L316,300 L182,306 Z" />
        <path d="M0,352 L110,348 L114,450 L0,456 Z" />
        <path d="M150,350 L316,354 L318,448 L146,452 Z" />
        <path d="M356,300 L500,296 L500,448 L360,450 Z" />
        <path d="M140,490 L380,486 L384,640 L136,640 Z" />
      </g>

      <path
        d="M0,72 C90,86 180,60 270,74 C360,88 430,66 500,78 L500,102 C430,90 360,112 270,98 C180,84 90,110 0,96 Z"
        fill="#C9D4DA"
      />
      <text x="60" y="66" fontSize="10" fontStyle="italic" fill="#7E909B" transform="rotate(2 60 66)">
        Regent&#8217;s Canal
      </text>

      <path
        d="M338,116 C356,100 420,96 460,108 C498,120 506,164 494,200 C482,236 430,248 390,238 C350,228 322,192 328,156 C330,140 328,126 338,116 Z"
        fill="#C9DFB4"
      />
      <g fill="#B5D19A">
        <circle cx="380" cy="152" r="7" />
        <circle cx="424" cy="134" r="6" />
        <circle cx="454" cy="170" r="8" />
        <circle cx="404" cy="200" r="6" />
        <circle cx="448" cy="208" r="5" />
      </g>
      <text x="358" y="180" fontSize="10" fontStyle="italic" fill="#75A058">
        London Fields
      </text>

      <path
        d="M-10,560 C20,540 80,542 100,566 C118,588 96,624 60,630 C24,636 -20,600 -10,560 Z"
        fill="#C9DFB4"
      />
      <circle cx="46" cy="580" r="6" fill="#B5D19A" />
      <circle cx="74" cy="598" r="7" fill="#B5D19A" />

      <g fill="none" strokeLinecap="round">
        <path
          d="M62,650 C118,440 146,300 158,180 C166,100 188,40 210,-10"
          stroke="#DBDBD9"
          strokeWidth="17"
        />
        <path d="M0,330 C150,322 350,338 500,328" stroke="#DEDEDC" strokeWidth="13" />
        <path d="M330,-10 C324,120 338,260 332,400" stroke="#DEDEDC" strokeWidth="10" />
        <path
          d="M0,470 C130,464 270,478 400,470 C440,467 480,472 500,470"
          stroke="#DEDEDC"
          strokeWidth="10"
        />
        <path d="M158,182 C230,190 300,184 360,190" stroke="#E2E2E0" strokeWidth="7" />
        <path d="M96,250 C160,246 220,252 250,250" stroke="#E2E2E0" strokeWidth="7" />
        <path d="M410,240 C420,320 414,380 420,470" stroke="#E2E2E0" strokeWidth="7" />
        <path d="M120,330 C116,400 124,440 118,470" stroke="#E2E2E0" strokeWidth="7" />
        <path d="M330,398 C332,440 328,456 330,472" stroke="#E2E2E0" strokeWidth="7" />
      </g>
      <g fill="none" strokeLinecap="round">
        <path
          d="M62,650 C118,440 146,300 158,180 C166,100 188,40 210,-10"
          stroke="#FCFCFB"
          strokeWidth="12"
        />
        <path d="M0,330 C150,322 350,338 500,328" stroke="#FFFFFF" strokeWidth="9" />
        <path d="M330,-10 C324,120 338,260 332,400" stroke="#FFFFFF" strokeWidth="6.5" />
        <path
          d="M0,470 C130,464 270,478 400,470 C440,467 480,472 500,470"
          stroke="#FFFFFF"
          strokeWidth="6.5"
        />
        <path d="M158,182 C230,190 300,184 360,190" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M96,250 C160,246 220,252 250,250" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M410,240 C420,320 414,380 420,470" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M120,330 C116,400 124,440 118,470" stroke="#FFFFFF" strokeWidth="4.5" />
        <path d="M330,398 C332,440 328,456 330,472" stroke="#FFFFFF" strokeWidth="4.5" />
      </g>

      <g fontSize="10" fill="#8F8F8A">
        <text x="126" y="304" transform="rotate(-81 126 304)">Mare Street</text>
        <text x="198" y="322">Graham Road</text>
        <text x="342" y="120" transform="rotate(87 342 120)">Kingsland Rd</text>
        <text x="58" y="458">Richmond Rd</text>
      </g>

      <g>
        <g fill="#CCCCCA">
          <rect x="28" y="164" width="44" height="12" />
          <rect x="80" y="167" width="30" height="9" />
          <rect x="30" y="215" width="34" height="11" />
          <rect x="76" y="217" width="40" height="9" />
          <rect x="26" y="259" width="52" height="13" />
          <rect x="206" y="164" width="38" height="10" />
          <rect x="254" y="166" width="30" height="8" />
          <rect x="210" y="254" width="46" height="12" />
          <rect x="266" y="257" width="28" height="9" />
          <rect x="24" y="386" width="40" height="10" />
          <rect x="30" y="420" width="52" height="12" />
          <rect x="168" y="387" width="44" height="11" />
          <rect x="224" y="390" width="34" height="8" />
          <rect x="268" y="385" width="36" height="13" />
          <rect x="180" y="425" width="56" height="9" />
          <rect x="376" y="334" width="44" height="12" />
          <rect x="430" y="337" width="42" height="9" />
          <rect x="380" y="380" width="36" height="10" />
          <rect x="428" y="376" width="46" height="8" />
          <rect x="382" y="419" width="52" height="11" />
          <rect x="160" y="530" width="48" height="10" />
          <rect x="222" y="531" width="38" height="9" />
          <rect x="274" y="528" width="46" height="12" />
          <rect x="330" y="530" width="34" height="8" />
        </g>
        <g fill="#E9E9E7" stroke="#DBDBD9" strokeWidth="0.6">
          <rect x="28" y="138" width="44" height="26" rx="1" />
          <rect x="80" y="143" width="30" height="24" rx="1" />
          <rect x="30" y="185" width="34" height="30" rx="1" />
          <rect x="76" y="191" width="40" height="26" rx="1" />
          <rect x="26" y="235" width="52" height="24" rx="1" />
          <rect x="206" y="136" width="38" height="28" rx="1" />
          <rect x="254" y="142" width="30" height="24" rx="1" />
          <rect x="210" y="228" width="46" height="26" rx="1" />
          <rect x="266" y="235" width="28" height="22" rx="1" />
          <rect x="24" y="358" width="40" height="28" rx="1" />
          <rect x="30" y="398" width="52" height="22" rx="1" />
          <rect x="168" y="357" width="44" height="30" rx="1" />
          <rect x="224" y="364" width="34" height="26" rx="1" />
          <rect x="268" y="355" width="36" height="30" rx="1" />
          <rect x="180" y="403" width="56" height="22" rx="1" />
          <rect x="376" y="304" width="44" height="30" rx="1" />
          <rect x="430" y="311" width="42" height="26" rx="1" />
          <rect x="380" y="352" width="36" height="28" rx="1" />
          <rect x="428" y="352" width="46" height="24" rx="1" />
          <rect x="382" y="393" width="52" height="26" rx="1" />
          <rect x="160" y="500" width="48" height="30" rx="1" />
          <rect x="222" y="505" width="38" height="26" rx="1" />
          <rect x="274" y="498" width="46" height="30" rx="1" />
          <rect x="330" y="506" width="34" height="24" rx="1" />
        </g>
      </g>
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100;
        return (
          <div key={i} className="relative size-[17px]">
            <svg width="17" height="17" viewBox="0 0 18 18">
              <path
                d="M9 1 L11.4 6.2 L17 6.8 L12.8 10.6 L14 16.2 L9 13.3 L4 16.2 L5.2 10.6 L1 6.8 L6.6 6.2 Z"
                fill="#E4E4E1"
              />
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <svg width="17" height="17" viewBox="0 0 18 18">
                <path
                  d="M9 1 L11.4 6.2 L17 6.8 L12.8 10.6 L14 16.2 L9 13.3 L4 16.2 L5.2 10.6 L1 6.8 L6.6 6.2 Z"
                  fill="var(--warm)"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type MapTransformationProps = {
  holdMs?: number;
  loop?: boolean;
  autostart?: boolean;
  className?: string;
  /* Set when rendered inside a charcoal section so the caption stays legible. */
  onDark?: boolean;
};

export function MapTransformation({
  holdMs = 3000,
  loop = false,
  autostart = true,
  className,
  onDark = false,
}: MapTransformationProps) {
  const shouldReduceMotion = useReducedMotion();
  const lastStep = STEPS.length - 1;

  const [step, setStep] = useState(shouldReduceMotion ? lastStep : 0);
  const [visible, setVisible] = useState(true);
  const [tweened, setTweened] = useState(() => {
    const s = shouldReduceMotion ? STEPS[lastStep] : STEPS[0];
    return { rating: s.rating, reviews: s.reviews, rank: s.rank };
  });

  const rootRef = useRef<HTMLButtonElement>(null);
  const startedRef = useRef(false);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafId = useRef<number | undefined>(undefined);
  const tweenedRef = useRef(tweened);
  tweenedRef.current = tweened;

  const clearAll = useCallback(() => {
    clearTimeout(stepTimer.current);
    clearTimeout(swapTimer.current);
    if (rafId.current !== undefined) cancelAnimationFrame(rafId.current);
  }, []);

  const goStep = useCallback(
    function goStep(i: number, instant = false) {
      clearAll();
      const tweenMs = instant ? 0 : TWEEN_MS;

      const doSwap = () => {
        const target = STEPS[i];
        const from = { ...tweenedRef.current };
        setStep(i);
        setVisible(true);
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = tweenMs ? Math.min(1, (now - t0) / tweenMs) : 1;
          const e = 1 - Math.pow(1 - p, 5);
          setTweened({
            rating: from.rating + (target.rating - from.rating) * e,
            reviews: Math.round(from.reviews + (target.reviews - from.reviews) * e),
            rank: Math.round(from.rank + (target.rank - from.rank) * e),
          });
          if (p < 1) rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
      };

      if (instant) {
        doSwap();
      } else {
        setVisible(false);
        swapTimer.current = setTimeout(doSwap, FADE_MS);
      }

      const total = (instant ? 0 : FADE_MS) + tweenMs + holdMs;
      if (i < STEPS.length - 1) {
        stepTimer.current = setTimeout(() => goStep(i + 1), total);
      } else if (loop) {
        stepTimer.current = setTimeout(() => goStep(0), total + 1000);
      }
    },
    [clearAll, holdMs, loop]
  );

  useEffect(() => {
    if (shouldReduceMotion || !autostart) return;
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          goStep(0, true);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      clearAll();
    };
  }, [autostart, clearAll, goStep, shouldReduceMotion]);

  const restart = () => {
    if (shouldReduceMotion) return;
    startedRef.current = true;
    goStep(0);
  };

  const current = STEPS[step];
  const rank = Math.max(1, tweened.rank);
  const atEnd = step === lastStep;
  const showFinale = atEnd && visible && !shouldReduceMotion;

  return (
    <div className={cn("w-full max-w-[500px]", className)}>
      <button
        type="button"
        ref={rootRef}
        onClick={restart}
        aria-label="Illustrative animation of a fictional business becoming more visible in local search. Activate to replay."
        className="relative block h-[500px] w-full cursor-pointer touch-manipulation overflow-hidden border border-foreground/20 bg-[#ECECEB] text-left shadow-[0_12px_40px_rgba(35,35,35,0.12)] select-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:h-[560px]"
      >
        {/* 3D-tilted map with a slow living-camera drift */}
        <div
          className="absolute"
          style={{
            inset: "-190px -130px",
            transform: "perspective(950px) rotateX(46deg) scale(1.12)",
            transformOrigin: "50% 58%",
          }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            animate={
              shouldReduceMotion
                ? undefined
                : { x: [0, -9, 0], y: [0, 6, 0], scale: [1, 1.045, 1] }
            }
            transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
          >
            <MapBackdrop />
          </motion.div>
        </div>

        {/* Finale glow behind the pin (last step only) */}
        {showFinale ? (
          <motion.div
            className="pointer-events-none absolute h-60 w-60 rounded-full"
            style={{
              left: "calc(50% - 120px)",
              top: "8%",
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--warm), transparent 62%) 0%, transparent 68%)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            aria-hidden="true"
          />
        ) : null}

        {/* Upright pin (billboard, not tilted with the map) */}
        <div
          className="pointer-events-none absolute"
          style={{ left: "calc(50% - 45px)", top: "24%" }}
          aria-hidden="true"
        >
          <svg width="90" height="76" viewBox="-45 -52 90 76" className="overflow-visible">
            <ellipse cy="14" rx="12" ry="4" fill="rgba(35,35,35,0.16)" />
            {shouldReduceMotion ? null : (
              <>
                <motion.circle
                  r="26"
                  fill="none"
                  stroke="var(--warm)"
                  strokeWidth="2"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
                />
                <motion.circle
                  r="26"
                  fill="none"
                  stroke="var(--warm)"
                  strokeWidth="2"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity, delay: 1.2 }}
                />
              </>
            )}
            <circle r="15" fill="var(--warm)" opacity="0.18" />
            <motion.g
              initial={shouldReduceMotion ? undefined : { y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <path
                d="M0,-22 C8,-22 13,-16 13,-9 C13,-1 4,6 0,12 C-4,6 -13,-1 -13,-9 C-13,-16 -8,-22 0,-22 Z"
                fill="var(--warm)"
              />
              <circle cy="-9" r="4.5" fill="#FFFFFF" />
            </motion.g>
          </svg>
        </div>

        {/* Replay hint after the sequence completes */}
        {atEnd && !loop && !shouldReduceMotion ? (
          <motion.div
            className="absolute top-4 right-3.5 z-[2] flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs text-[#565656] shadow-[0_3px_10px_rgba(35,35,35,0.09)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <RotateCcw className="size-3" aria-hidden="true" />
            Replay
          </motion.div>
        ) : null}

        {/* Info layer: fades out between steps */}
        <div
          className="absolute inset-0"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.45s ease" }}
        >
          {/* Search rank chip */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[13px] text-[#232323] shadow-[0_4px_14px_rgba(35,35,35,0.10)]">
            <Search className="size-3.5 text-[#8B8B87]" aria-hidden="true" />
            <span className="text-[#565656]">dentist near me</span>
            <span
              className="inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-full px-1.5 text-xs font-bold"
              style={{
                transition: "background 0.6s, color 0.6s",
                background: rank === 1 ? "var(--warm)" : "#EFEFED",
                color: rank === 1 ? "#232323" : "#8B8B87",
              }}
            >
              #{rank}
            </span>
          </div>

          {/* Customer review (final step only) */}
          {current.quote ? (
            <motion.div
              className="absolute top-16 right-3.5 w-[230px] rounded-[14px] bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(35,35,35,0.14)]"
              {...(shouldReduceMotion ? {} : popIn)}
            >
              <div className="flex items-center gap-2">
                <div className="flex size-[26px] items-center justify-center rounded-full bg-charcoal text-[11px] font-bold text-white">
                  SM
                </div>
                <div className="text-xs font-semibold text-[#232323]">Sarah M.</div>
                <div className="text-[11px] tracking-widest text-warm">★★★★★</div>
              </div>
              <div className="mt-1.5 text-xs leading-relaxed text-[#565656]">
                &ldquo;Found them right at the top of Google. Best dentist I&rsquo;ve been
                to in London.&rdquo;
              </div>
            </motion.div>
          ) : null}

          {/* Business listing card */}
          <div
            className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-2.5 rounded-2xl bg-white p-4 pb-3.5 shadow-[0_10px_30px_rgba(35,35,35,0.16)]"
            style={{
              transform: visible ? "translateY(0px) scale(1)" : "translateY(30px) scale(0.96)",
              transition: "transform 0.55s cubic-bezier(0.2, 0.9, 0.25, 1.12)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="text-[19px] font-bold tracking-[-0.01em] text-[#232323]">
                Brightwood Dental Care
              </div>
              {current.verified ? (
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  className="shrink-0"
                  aria-hidden="true"
                  {...(shouldReduceMotion ? {} : popIn)}
                >
                  <path
                    d="M9 0.8 L11.2 2.6 L14 2.5 L14.9 5.2 L17.2 6.8 L16.4 9.5 L17.2 12.2 L14.9 13.8 L14 16.5 L11.2 16.4 L9 18.2 L6.8 16.4 L4 16.5 L3.1 13.8 L0.8 12.2 L1.6 9.5 L0.8 6.8 L3.1 5.2 L4 2.5 L6.8 2.6 Z"
                    fill="var(--warm)"
                    transform="translate(0 -0.8)"
                  />
                  <path
                    d="M5.6 8.6 L8 11 L12.4 6.4"
                    stroke="#232323"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ) : null}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-[#232323]">
                {tweened.rating.toFixed(1)}
              </span>
              <StarRating rating={tweened.rating} />
              <span className="text-[13px] text-[#8B8B87]">
                {tweened.reviews < 10
                  ? `(${tweened.reviews})`
                  : `(${tweened.reviews} reviews)`}
              </span>
            </div>

            <div className="text-[13px] leading-relaxed text-[#565656]">{current.desc}</div>

            {current.photos > 0 ? (
              <motion.div className="flex gap-2" {...(shouldReduceMotion ? {} : popIn)}>
                {PHOTO_CROPS.slice(0, current.photos).map((photo) => (
                  <div
                    key={photo.position}
                    className="relative h-[66px] flex-1 overflow-hidden rounded-[10px]"
                  >
                    <Image
                      src="/images/brightwood-example.jpg"
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                    {photo.badge ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[rgba(35,35,35,0.45)] text-sm font-semibold text-white">
                        {photo.badge}
                      </div>
                    ) : null}
                  </div>
                ))}
              </motion.div>
            ) : null}

            <div className="flex gap-4 pt-0.5">
              {ACTION_BUTTONS.slice(0, current.buttons).map(({ label, Icon }) => (
                <motion.div
                  key={label}
                  className="flex w-14 flex-col items-center gap-1"
                  {...(shouldReduceMotion ? {} : popIn)}
                >
                  <div className="flex size-11 items-center justify-center rounded-full border border-[#E6E6E3] bg-[#F6F6F4] text-[#474747]">
                    <Icon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <span className="text-[11.5px] text-[#565656]">{label}</span>
                </motion.div>
              ))}
            </div>

            {current.trust ? (
              <motion.div
                className="flex flex-wrap items-center gap-2"
                {...(shouldReduceMotion ? {} : popIn)}
              >
                <span className="text-[11.5px] text-[#8B8B87]">Also on</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E6E3] px-2.5 py-1 text-xs text-[#232323]">
                  <span className="inline-flex size-[13px] items-center justify-center rounded-[2px] bg-[#00B67A] text-[9px] text-white">
                    ★
                  </span>
                  Trustpilot 4.6
                </span>
                <span className="inline-flex items-center rounded-full border border-[#E6E6E3] px-2.5 py-1 text-xs text-[#232323]">
                  Yell.com
                </span>
                <span className="inline-flex items-center rounded-full border border-[#E6E6E3] px-2.5 py-1 text-xs text-[#232323]">
                  NHS.uk
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6E6E3] px-2.5 py-1 text-xs text-[#232323]">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="12" height="12" rx="3.6" stroke="#B24C86" strokeWidth="1.5" />
                    <circle cx="7" cy="7" r="2.7" stroke="#B24C86" strokeWidth="1.5" />
                    <circle cx="10.4" cy="3.6" r="0.9" fill="#B24C86" />
                  </svg>
                  Instagram
                </span>
              </motion.div>
            ) : null}

            <div className="flex justify-center gap-1.5 pt-1" aria-hidden="true">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className="size-1.5 rounded-full"
                  style={{
                    transition: "background 0.4s, transform 0.4s",
                    background:
                      i === step
                        ? "var(--warm)"
                        : i < step
                          ? "color-mix(in oklch, var(--warm), white 65%)"
                          : "#E3E3E0",
                    transform: i === step ? "scale(1.35)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </button>

      <p className={cn("mt-3 text-xs", onDark ? "text-charcoal-foreground/60" : "text-muted-foreground")}>
        An illustrative, fictional example of the journey we work towards, not a client
        result.
      </p>
    </div>
  );
}
