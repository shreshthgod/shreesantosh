import { cn } from "@/lib/utils";

/* Original decorative language: seed dots, botanical stems, poppy-pod line art and gentle growth curves. */

function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A loose drift of kidney-shaped seeds.
export function SeedScatter({ className, count = 26, seed = 7 }: { className?: string; count?: number; seed?: number }) {
  const rand = seeded(seed);
  const seeds = Array.from({ length: count }, (_, i) => ({
    key: i,
    x: +(rand() * 200).toFixed(1),
    y: +(rand() * 200).toFixed(1),
    r: +(rand() * 360).toFixed(0),
    s: +(0.6 + rand() * 0.8).toFixed(2),
    o: +(0.35 + rand() * 0.65).toFixed(2),
  }));
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none", className)} aria-hidden="true">
      {seeds.map((s) => (
        <path
          key={s.key}
          d="M-3 0c0-2 1.6-3 3.2-2.6C2.2-2.2 3 -.8 3 .6 3 2 1.8 2.8.4 2.6-.6 2.4-.2 1.2-1.2 1.1-2.2 1-3 1.4-3 0Z"
          fill="currentColor"
          opacity={s.o}
          transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.s})`}
        />
      ))}
    </svg>
  );
}

// A single poppy stem with leaves, drawn as a fine line.
export function BotanicalStem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 420" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <path d="M86 418C84 330 70 250 78 170 84 110 100 70 96 34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M79 300C58 286 38 262 30 232 52 236 72 258 79 300Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M81 226C104 212 126 190 134 160 110 164 90 186 81 226Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M78 150C62 140 48 120 44 98 62 102 74 120 78 150Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M96 34C80 34 70 22 72 10 84 8 92 16 96 34 100 16 110 8 122 12 122 24 112 34 96 34Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

// Line art poppy pod with its stigmatic crown.
export function PodMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <path d="M32 18c-14 0-22 10-22 24 0 13 9 22 20 24v12h4V66c11-2 20-11 20-24 0-14-8-24-22-24Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 18c4-6 24-6 28 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 14l4 4M44 14l-4 4M32 10v7M26 11l2 6M38 11l-2 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M22 34c6 3 14 3 20 0M20 44c7 4 17 4 24 0" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

// A gentle growth curve used to soften the transition between two section colours.
export function CurveEdge({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={cn("pointer-events-none block h-10 w-full md:h-16", className)} aria-hidden="true">
      <path d="M0 90V52C240 12 520 0 760 18S1200 70 1440 36V90Z" fill={fill} />
    </svg>
  );
}

export function RingOutline({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("pointer-events-none absolute rounded-full border", className)} />;
}
