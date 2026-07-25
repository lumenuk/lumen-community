"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle2,
  Compass,
  Gift,
  Heart,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  Play,
  RotateCcw,
  Share2,
  Target,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { easeEditorial } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Social content promo: an 8-scene sequence walking from "not sure what to
 * post?" through planning, three real client post examples, the
 * idea→design→post→grow workflow, and the free Content Audit CTA.
 * Adapted from the client-approved design handoff (32s vertical promo); scene
 * copy, layout, and timing are fixed, the execution follows site tokens —
 * warm accent instead of the handoff orange, editorial easing instead of
 * bouncy pops, no drifting background blobs or pulsing buttons.
 *
 * Scenes render on a fixed 1080×1920 design canvas that is transform-scaled
 * to the rendered width, so the handoff's measurements apply verbatim.
 */

const W = 1080;
const H = 1920;

/* Design-canvas palette: brand moments use tokens, neutrals stay local. */
const INK = "var(--charcoal)";
const ACCENT = "var(--warm)";
const ACCENT_DEEP = "var(--warm-deep)";
const ON_ACCENT = "var(--warm-foreground)";
const MUTED = "#8A8580";
const MUTED_2 = "#9A958D";
const LINE = "#E9E7E3";
const GREY_DARK = "#C7C3BC";
const CANVAS_BG = "#FAFAF8";
const CARD_SHADOW = "0 34px 70px rgba(20, 20, 18, 0.18)";
const CHIP_SHADOW = "0 12px 26px rgba(20, 20, 18, 0.1)";

/* 0-3 Hook | 3-6 Problem | 6-10 Planning | 10-14 Restaurant | 14-18 Dental |
   18-22 Plumbing | 22-28 Idea-to-Growth | 28-32 Final CTA */
const SCENE_DURATIONS = [3, 3, 4, 4, 4, 4, 6, 4];

/* ---------- Shared entrance helpers ---------- */

type EnterProps = {
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function FadeRise({ delay = 0, className, style, children }: EnterProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeEditorial, delay }}
    >
      {children}
    </motion.div>
  );
}

function PopIn({ delay = 0, className, style, children }: EnterProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: easeEditorial, delay }}
    >
      {children}
    </motion.div>
  );
}

function Headline({
  size = 52,
  width = 880,
  delay = 0,
  style,
  children,
}: {
  size?: number;
  width?: number;
  delay?: number;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <FadeRise
      delay={delay}
      className="font-heading text-center tracking-tight"
      style={{
        width,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.14,
        color: INK,
        ...style,
      }}
    >
      {children}
    </FadeRise>
  );
}

/* Slow, subtle Ken Burns drift on post photos (skipped for reduced motion). */
function ZoomPhoto({ src, alt }: { src: string; alt: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      animate={shouldReduceMotion ? undefined : { scale: [1.04, 1.085, 1.04] }}
      transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
    >
      <Image src={src} alt={alt} fill sizes="340px" className="object-cover" />
    </motion.div>
  );
}

/* ---------- Scene 1: hook ---------- */

function SceneHook() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Headline size={84} width={900}>
        Not sure
        <br />
        what to post?
      </Headline>
    </div>
  );
}

/* ---------- Scene 2: problem (real profile screenshots) ---------- */

const PROBLEM_SHOTS = [
  "/images/promo/profile-pastanostra.webp",
  "/images/promo/profile-swiftplumb.webp",
  "/images/promo/post-dental.webp",
];

function SceneProblem() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 64 }}>
      <Headline>
        Your business needs content
        <br />
        that looks professional.
      </Headline>
      <div className="flex" style={{ gap: 20 }}>
        {PROBLEM_SHOTS.map((src, i) => (
          <PopIn key={src} delay={0.2 + i * 0.22}>
            <div
              className="relative overflow-hidden"
              style={{
                width: 336,
                height: 860,
                borderRadius: 24,
                border: "5px solid #FFFFFF",
                boxShadow: "0 24px 48px rgba(20, 20, 18, 0.22)",
              }}
            >
              <Image src={src} alt="" fill sizes="140px" className="object-cover object-top" />
            </div>
          </PopIn>
        ))}
      </div>
    </div>
  );
}

/* ---------- Scene 3: content planning calendar ---------- */

const WEEK_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const DAYS_IN_MONTH = 30;
const START_OFFSET = 2; // month starts on Tuesday
const CAL_ROWS = Math.ceil((START_OFFSET + DAYS_IN_MONTH) / 7);
const CAL_CELLS = Array.from({ length: CAL_ROWS * 7 }, (_, i) => {
  const day = i - START_OFFSET + 1;
  return day >= 1 && day <= DAYS_IN_MONTH ? day : null;
});

const CAL_MARKS = [
  { day: 6, label: "Plan", Icon: Lightbulb, bg: ACCENT_DEEP, fg: "#FFFFFF" },
  { day: 16, label: "Film", Icon: Camera, bg: ACCENT, fg: ON_ACCENT },
  { day: 25, label: "Post", Icon: LayoutGrid, bg: INK, fg: "#FFFFFF" },
];

function CalendarDay({ index, day }: { index: number; day: number | null }) {
  if (!day) return <div style={{ width: 108, height: 96 }} />;
  const markIndex = CAL_MARKS.findIndex((m) => m.day === day);
  const mark = markIndex === -1 ? null : CAL_MARKS[markIndex];
  const row = Math.floor(index / 7);
  const markDelay = mark ? 1.1 + markIndex * 0.55 : 0;
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      style={{ width: 108, height: 96 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.3 + row * 0.07 }}
    >
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{ width: 62, height: 62, background: mark ? mark.bg : "transparent" }}
        initial={mark ? { scale: 0.7, opacity: 0 } : false}
        animate={mark ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.4, ease: easeEditorial, delay: markDelay }}
      >
        <div
          className={cn(mark && "font-heading")}
          style={{ fontWeight: mark ? 800 : 600, fontSize: 24, color: mark ? mark.fg : INK }}
        >
          {day}
        </div>
        {mark ? (
          <motion.div
            className="absolute flex items-center justify-center rounded-full bg-white"
            style={{ top: -8, right: -8, width: 28, height: 28, boxShadow: CHIP_SHADOW }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: markDelay + 0.15 }}
          >
            <mark.Icon size={15} style={{ color: mark.bg }} strokeWidth={2.2} />
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function ScenePlanning() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 46 }}>
      <Headline>
        We plan every post
        <br />
        before we create it.
      </Headline>
      <FadeRise
        delay={0.15}
        className="bg-white"
        style={{
          width: 848,
          borderRadius: 36,
          padding: "40px 46px 34px",
          boxShadow: "0 46px 100px rgba(20, 20, 18, 0.18)",
          border: "1px solid rgba(20, 20, 18, 0.06)",
        }}
      >
        <div className="flex items-baseline justify-between" style={{ marginBottom: 18 }}>
          <div>
            <div
              className="uppercase"
              style={{ fontWeight: 700, fontSize: 16, color: ACCENT_DEEP, letterSpacing: 2 }}
            >
              Content Calendar
            </div>
            <div
              className="font-heading tracking-tight"
              style={{ fontWeight: 800, fontSize: 36, color: INK, marginTop: 4 }}
            >
              August
            </div>
          </div>
          <Calendar size={30} style={{ color: ACCENT }} strokeWidth={1.8} />
        </div>
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(7, 108px)",
            paddingBottom: 12,
            borderBottom: `1px solid ${LINE}`,
            marginBottom: 6,
          }}
        >
          {WEEK_LABELS.map((d) => (
            <div
              key={d}
              className="text-center"
              style={{ fontWeight: 700, fontSize: 16, color: MUTED_2, letterSpacing: 1 }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(7, 108px)" }}>
          {CAL_CELLS.map((day, i) => (
            <CalendarDay key={i} index={i} day={day} />
          ))}
        </div>
        <div
          className="flex justify-center"
          style={{ gap: 44, marginTop: 14, paddingTop: 22, borderTop: `1px solid ${LINE}` }}
        >
          {CAL_MARKS.map((mark, i) => (
            <PopIn key={mark.label} delay={1.2 + i * 0.55} className="flex items-center" style={{ gap: 10 }}>
              <div
                className="flex shrink-0 items-center justify-center rounded-full"
                style={{ width: 34, height: 34, background: mark.bg }}
              >
                <mark.Icon size={17} style={{ color: mark.fg }} strokeWidth={2.2} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, color: INK }}>{mark.label}</div>
            </PopIn>
          ))}
        </div>
      </FadeRise>
    </div>
  );
}

/* ---------- Scenes 4-6: real client post examples ---------- */

type PostExample = {
  tag: string;
  business: string;
  handle: string;
  caption: string;
  engagement: string;
  avatar: string;
  photo: string;
  photoAlt: string;
};

const POST_EXAMPLES: PostExample[] = [
  {
    tag: "Restaurant / Café",
    business: "Pasta Nostra",
    handle: "@pastanostra.ldn",
    caption: "Good food, good wine, good times. Made with love, the Italian way.",
    engagement: "142 likes · 9 comments",
    avatar: ACCENT,
    photo: "/images/promo/img-pasta-dish.png",
    photoAlt: "Pasta dish at Pasta Nostra",
  },
  {
    tag: "Dental / Healthcare",
    business: "Radiant Dental",
    handle: "@radiantdental_twickenham",
    caption: "A smile transformation to boost confidence. Custom treatment, natural results.",
    engagement: "21 likes · 1 comment",
    avatar: ACCENT_DEEP,
    photo: "/images/promo/img-dental-post.png",
    photoAlt: "Before and after smile at Radiant Dental",
  },
  {
    tag: "Contractor / Home Services",
    business: "Swift Plumb London",
    handle: "@swiftplumb_london",
    caption: "Fast response plumbing, heating & drainage — the Swift Plumb van is on its way.",
    engagement: "76 likes · 6 comments",
    avatar: "#3F8A84",
    photo: "/images/promo/img-plumbing-van.png",
    photoAlt: "Swift Plumb London van",
  },
];

function ScenePost({ post }: { post: PostExample }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-evenly"
      style={{ padding: "60px 0 70px" }}
    >
      <FadeRise
        className="font-heading text-center tracking-tight"
        style={{ width: 860, fontWeight: 800, fontSize: 40, lineHeight: 1.2, color: INK }}
      >
        We create scroll-stopping content for local brands.
      </FadeRise>
      <div className="flex flex-col items-center" style={{ gap: 22 }}>
        <motion.div
          className="rounded-full uppercase"
          style={{
            padding: "10px 24px",
            background: "color-mix(in oklch, var(--warm), transparent 88%)",
            border: "1px solid color-mix(in oklch, var(--warm), transparent 45%)",
            fontWeight: 700,
            fontSize: 22,
            color: ACCENT_DEEP,
            letterSpacing: 1.5,
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {post.tag}
        </motion.div>
        <Headline size={44} width={780} delay={0.1}>
          {post.business}
        </Headline>
      </div>
      <FadeRise
        delay={0.15}
        className="overflow-hidden bg-white"
        style={{ width: 820, borderRadius: 28, boxShadow: CARD_SHADOW }}
      >
        <div className="flex items-center" style={{ gap: 14, padding: "20px 24px" }}>
          <div
            className="shrink-0 rounded-full"
            style={{ width: 48, height: 48, background: post.avatar }}
          />
          <div style={{ fontWeight: 700, fontSize: 22, color: INK }}>{post.handle}</div>
        </div>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5", background: LINE }}>
          <ZoomPhoto src={post.photo} alt={post.photoAlt} />
        </div>
        <div style={{ padding: "20px 24px 26px" }}>
          <div className="flex" style={{ gap: 18, marginBottom: 14 }}>
            <Heart size={26} style={{ color: ACCENT, fill: "var(--warm)" }} />
            <MessageCircle size={26} style={{ color: GREY_DARK }} />
            <Share2 size={26} style={{ color: GREY_DARK }} />
          </div>
          <div style={{ fontWeight: 600, fontSize: 18, color: MUTED_2, marginBottom: 9 }}>
            {post.engagement}
          </div>
          <div style={{ fontWeight: 500, fontSize: 21, color: INK, lineHeight: 1.42 }}>
            <b>{post.handle}</b> {post.caption}
          </div>
        </div>
      </FadeRise>
    </div>
  );
}

/* ---------- Scene 7: idea → design → post → grow ---------- */

const GROWTH_STEPS = [
  {
    n: "1",
    label: "Idea",
    sub: "Brainstorm what to post",
    chips: [{ label: "Content Strategy", Icon: Compass }],
  },
  {
    n: "2",
    label: "Design",
    sub: "Create the visuals",
    chips: [
      { label: "Reels & Video", Icon: Play },
      { label: "Instagram Posts", Icon: LayoutGrid },
      { label: "Stories", Icon: Camera },
      { label: "Ad Creatives", Icon: Target },
    ],
  },
  {
    n: "3",
    label: "Post",
    sub: "Publish & manage",
    chips: [{ label: "Social Media Management", Icon: CheckCircle2 }],
  },
  {
    n: "4",
    label: "Grow",
    sub: "Review & build offers",
    chips: [{ label: "Offers & Campaigns", Icon: Gift }],
  },
];

function GrowthRow({ step, index }: { step: (typeof GROWTH_STEPS)[number]; index: number }) {
  const delay = 0.5 + index * 0.85;
  const chipsDelay = delay + 0.28;
  return (
    <div className="flex items-center" style={{ gap: 22 }}>
      <motion.div
        className="flex shrink-0 items-center bg-white"
        style={{
          gap: 16,
          borderRadius: 22,
          padding: "18px 22px",
          boxShadow: "0 18px 36px rgba(20, 20, 18, 0.1)",
          border: `1px solid ${LINE}`,
          width: 320,
        }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: easeEditorial, delay }}
      >
        <div
          className="font-heading flex shrink-0 items-center justify-center rounded-full"
          style={{
            width: 68,
            height: 68,
            background: ACCENT_DEEP,
            fontWeight: 800,
            fontSize: 28,
            color: "#FFFFFF",
          }}
        >
          {step.n}
        </div>
        <div>
          <div className="font-heading tracking-tight" style={{ fontWeight: 800, fontSize: 32, color: INK }}>
            {step.label}
          </div>
          <div style={{ fontWeight: 500, fontSize: 17, color: MUTED, marginTop: 2 }}>{step.sub}</div>
        </div>
      </motion.div>
      <motion.div
        className="shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: chipsDelay }}
      >
        <ArrowRight size={26} style={{ color: ACCENT }} strokeWidth={2.4} />
      </motion.div>
      <div className="flex flex-1 flex-wrap" style={{ gap: 10 }}>
        {step.chips.map((chip, ci) => (
          <PopIn
            key={chip.label}
            delay={chipsDelay + ci * 0.12}
            className="flex items-center bg-white"
            style={{
              gap: 8,
              borderRadius: 999,
              padding: "10px 18px",
              boxShadow: CHIP_SHADOW,
              border: `1px solid ${LINE}`,
            }}
          >
            <chip.Icon size={18} style={{ color: ACCENT_DEEP }} strokeWidth={2} />
            <div style={{ fontWeight: 700, fontSize: 16, color: INK, whiteSpace: "nowrap" }}>
              {chip.label}
            </div>
          </PopIn>
        ))}
      </div>
    </div>
  );
}

function SceneGrowth() {
  return (
    <>
      <div className="absolute flex w-full justify-center" style={{ top: 110 }}>
        <Headline size={50}>
          From idea to
          <br />
          content to growth.
        </Headline>
      </div>
      <div className="absolute flex flex-col" style={{ left: 60, right: 60, top: 380 }}>
        {GROWTH_STEPS.map((step, i) => (
          <div key={step.label}>
            <GrowthRow step={step} index={i} />
            {i < GROWTH_STEPS.length - 1 ? (
              <motion.div
                className="flex flex-col items-center"
                style={{ width: 320, height: 260, paddingTop: 24, gap: 6 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.85 + 0.55 }}
              >
                <div
                  style={{
                    width: 3,
                    height: 168,
                    background: "color-mix(in oklch, var(--warm), white 45%)",
                  }}
                />
                <ArrowDown
                  size={38}
                  style={{ color: "color-mix(in oklch, var(--warm), white 45%)" }}
                  strokeWidth={2.4}
                />
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- Scene 8: final CTA ---------- */

function SceneFinalCta() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-evenly"
      style={{ padding: "50px 0 60px" }}
    >
      <Headline size={48}>
        Make your brand look active,
        <br />
        professional &amp; ready to grow.
      </Headline>

      <div className="relative flex justify-center" style={{ width: 680 }}>
        {/* Phone frame */}
        <FadeRise delay={0.1} style={{ width: 420 }}>
          <div
            className="relative"
            style={{
              borderRadius: 68,
              padding: 14,
              background: "#131210",
              boxShadow: "0 50px 100px rgba(20, 20, 18, 0.32), 0 14px 34px rgba(20, 20, 18, 0.22)",
            }}
          >
            <div className="overflow-hidden bg-white" style={{ borderRadius: 54 }}>
              {/* Profile header */}
              <motion.div
                style={{ padding: "70px 26px 8px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex items-center" style={{ gap: 18 }}>
                  <div
                    className="relative flex shrink-0 items-center justify-center rounded-full"
                    style={{ width: 78, height: 78, background: INK, padding: 16 }}
                  >
                    <Image
                      src="/lumen-growth-icon-white.svg"
                      alt=""
                      width={46}
                      height={46}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div
                      className="font-heading tracking-tight"
                      style={{ fontWeight: 800, fontSize: 22, color: INK }}
                    >
                      lumengrowth.co.uk
                    </div>
                    <div className="flex" style={{ gap: 16, marginTop: 6, fontSize: 15, color: MUTED }}>
                      <span>
                        <b style={{ color: INK }}>48</b> posts
                      </span>
                      <span>
                        <b style={{ color: INK }}>2.4K</b> followers
                      </span>
                      <span>
                        <b style={{ color: INK }}>180</b> following
                      </span>
                    </div>
                  </div>
                </div>
                {/* Story rings */}
                <div className="flex" style={{ gap: 14, marginTop: 18 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="shrink-0 rounded-full"
                      style={{ width: 66, height: 66, background: ACCENT, padding: 3 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <div
                        className="h-full w-full rounded-full bg-white"
                        style={{ border: "2px solid #FFFFFF" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* Recent posts grid */}
              <div className="grid grid-cols-3" style={{ gap: 8, padding: "16px 16px 22px" }}>
                {POST_EXAMPLES.map((post, i) => (
                  <PopIn key={post.photo} delay={0.15 * i + 0.3}>
                    <div
                      className="relative overflow-hidden"
                      style={{
                        aspectRatio: "1 / 1",
                        borderRadius: 14,
                        background: LINE,
                        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <Image src={post.photo} alt="" fill sizes="120px" className="object-cover" />
                    </div>
                  </PopIn>
                ))}
              </div>
            </div>
            {/* Notch + home indicator */}
            <div
              className="absolute rounded-full"
              style={{
                top: 26,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 26,
                background: "#0B0B0A",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                bottom: 12,
                left: "50%",
                transform: "translateX(-50%)",
                width: 110,
                height: 6,
                background: "rgba(255, 255, 255, 0.45)",
              }}
            />
          </div>
        </FadeRise>

        {/* Floating engagement badges */}
        {(
          [
            { Icon: Heart, x: 0, y: 140, delay: 1.0, color: ACCENT, fill: true },
            { Icon: MessageCircle, x: 610, y: 180, delay: 1.3, color: ACCENT_DEEP, fill: false },
            { Icon: Share2, x: 20, y: 560, delay: 1.6, color: ACCENT_DEEP, fill: false },
          ] as const
        ).map(({ Icon, x, y, delay, color, fill }) => (
          <motion.div
            key={delay}
            className="absolute flex items-center justify-center rounded-full bg-white"
            style={{ left: x, top: y, width: 58, height: 58, boxShadow: "0 14px 28px rgba(20, 20, 18, 0.18)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeEditorial, delay }}
          >
            <Icon size={24} style={{ color, fill: fill ? "var(--warm)" : "none" }} />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center" style={{ gap: 22 }}>
        <motion.div
          className="font-heading rounded-full text-center tracking-tight"
          style={{
            background: ACCENT,
            padding: "24px 44px",
            boxShadow: "0 22px 46px rgba(20, 20, 18, 0.2)",
            fontWeight: 800,
            fontSize: 30,
            color: ON_ACCENT,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          Book a Free Content Audit
        </motion.div>
        <div className="text-center" style={{ width: 800, fontWeight: 500, fontSize: 22, color: MUTED }}>
          Social media content made for local businesses.
        </div>
        <div
          className="rounded-full"
          style={{
            padding: "6px 18px",
            background: "rgba(28, 27, 25, 0.06)",
            fontWeight: 600,
            fontSize: 15,
            color: MUTED_2,
          }}
        >
          Sample content concepts
        </div>
      </div>
    </div>
  );
}

/* ---------- Root ---------- */

const SCENES = [
  SceneHook,
  SceneProblem,
  ScenePlanning,
  () => <ScenePost post={POST_EXAMPLES[0]} />,
  () => <ScenePost post={POST_EXAMPLES[1]} />,
  () => <ScenePost post={POST_EXAMPLES[2]} />,
  SceneGrowth,
  SceneFinalCta,
];
const LAST_SCENE = SCENES.length - 1;

type SocialPromoProps = {
  autostart?: boolean;
  className?: string;
  /* Set when rendered inside a charcoal section so the caption stays legible. */
  onDark?: boolean;
};

export function SocialPromo({ autostart = true, className, onDark = false }: SocialPromoProps) {
  const shouldReduceMotion = useReducedMotion();

  const [scene, setScene] = useState(shouldReduceMotion ? LAST_SCENE : 0);
  const [done, setDone] = useState(false);
  const [scale, setScale] = useState(0.32);

  const rootRef = useRef<HTMLButtonElement>(null);
  const startedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const measure = () => setScale(node.clientWidth / W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const goScene = useCallback(function goScene(i: number) {
    clearTimeout(timerRef.current);
    setScene(i);
    setDone(false);
    timerRef.current = setTimeout(() => {
      if (i < LAST_SCENE) goScene(i + 1);
      else setDone(true);
    }, SCENE_DURATIONS[i] * 1000);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !autostart) return;
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          goScene(0);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      clearTimeout(timerRef.current);
    };
  }, [autostart, goScene, shouldReduceMotion]);

  const restart = () => {
    if (shouldReduceMotion) return;
    startedRef.current = true;
    goScene(0);
  };

  const ActiveScene = SCENES[shouldReduceMotion ? LAST_SCENE : scene];

  return (
    <div className={cn("w-full max-w-[330px] sm:max-w-[360px]", className)}>
      <button
        type="button"
        ref={rootRef}
        onClick={restart}
        aria-label="Illustrative animation of how we plan, create, and grow social media content for local businesses, ending with our free Content Audit offer. Activate to replay."
        className="relative block w-full cursor-pointer touch-manipulation overflow-hidden border border-foreground/20 text-left shadow-[0_12px_40px_rgba(35,35,35,0.12)] select-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        style={{ aspectRatio: `${W} / ${H}`, background: CANVAS_BG }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 origin-top-left"
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        >
          <MotionConfig reducedMotion="user">
            <AnimatePresence>
              <motion.div
                key={shouldReduceMotion ? LAST_SCENE : scene}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ActiveScene />
              </motion.div>
            </AnimatePresence>
          </MotionConfig>
        </div>

        {/* Replay hint after the sequence completes */}
        {done && !shouldReduceMotion ? (
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
      </button>

      <p className={cn("mt-3 text-xs", onDark ? "text-charcoal-foreground/60" : "text-muted-foreground")}>
        A short look at how we plan, create, and grow social content, featuring sample
        content concepts.
      </p>
    </div>
  );
}
