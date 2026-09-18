import { cn } from "@/lib/utils";

/*
 * Original flat editorial illustrations. Each takes three tones so a tile can
 * recolour it: `base` (large shapes), `line` (fine detail) and `accent` (food colour).
 */
type Tones = { base: string; line: string; accent: string; className?: string };

function Seeds({ points, fill }: { points: [number, number][]; fill: string }) {
  return (
    <g fill={fill}>
      {points.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.4" ry="1.6" transform={`rotate(${(i * 47) % 180} ${x} ${y})`} />
      ))}
    </g>
  );
}

export function CurryBowl({ base, line, accent, className }: Tones) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <path d="M90 96c-9-13 9-20 0-34M120 90c-9-13 9-20 0-34M150 96c-9-13 9-20 0-34" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 122h188c-5 54-46 88-94 88S31 176 26 122Z" fill={base} />
      <ellipse cx="120" cy="122" rx="94" ry="16" fill={line} opacity=".9" />
      <ellipse cx="120" cy="121" rx="82" ry="11" fill={accent} />
      <path d="M116 118c12 1 18-5 10-9-9-4-26 1-26 9 0 10 22 12 34 5" stroke={base} strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
      <Seeds fill={line} points={[[70, 120], [84, 125], [156, 118], [168, 124], [140, 126], [96, 116]]} />
      <path d="M190 70l-40 46" stroke={line} strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="196" cy="62" rx="12" ry="7" transform="rotate(-50 196 62)" fill={line} />
    </svg>
  );
}

export function PostoPlate({ base, line, accent, className }: Tones) {
  const cubes: [number, number, number][] = [
    [72, 104, -8], [104, 94, 6], [138, 102, -4], [88, 128, 10], [122, 124, -12], [154, 130, 4],
  ];
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <ellipse cx="120" cy="150" rx="104" ry="52" fill={base} />
      <ellipse cx="120" cy="142" rx="84" ry="38" fill={line} opacity=".18" />
      {cubes.map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x + 16} ${y + 16})`}>
          <rect x={x} y={y} width="32" height="30" rx="7" fill={accent} />
          <rect x={x} y={y} width="32" height="30" rx="7" stroke={line} strokeWidth="1.6" opacity=".55" />
        </g>
      ))}
      <Seeds fill={line} points={[[80, 112], [116, 102], [146, 110], [98, 136], [132, 132], [166, 138], [110, 150], [150, 152]]} />
      <path d="M170 66c18 6 30 22 28 44" stroke={line} strokeWidth="7" strokeLinecap="round" />
      <path d="M166 64c-4-8-2-16 6-20" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SweetsBowl({ base, line, accent, className }: Tones) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <circle cx="70" cy="158" r="30" fill={accent} />
      <circle cx="116" cy="164" r="26" fill={accent} />
      <circle cx="92" cy="118" r="26" fill={accent} />
      <g stroke={line} strokeWidth="1.5" opacity=".5">
        <circle cx="70" cy="158" r="30" />
        <circle cx="116" cy="164" r="26" />
        <circle cx="92" cy="118" r="26" />
      </g>
      <Seeds fill={line} points={[[62, 148], [80, 166], [72, 172], [110, 156], [124, 172], [86, 108], [100, 126], [94, 112]]} />
      <path d="M140 138h84c-3 36-20 58-42 58s-39-22-42-58Z" fill={base} />
      <ellipse cx="182" cy="138" rx="42" ry="9" fill={line} opacity=".85" />
      <ellipse cx="182" cy="137" rx="35" ry="6" fill={accent} opacity=".7" />
      <path d="M176 102c-6-6-4-16 4-18 6 6 4 16-4 18ZM196 108c-3-8 3-16 11-15 3 8-3 16-11 15Z" fill={line} />
    </svg>
  );
}

export function ParathaSnack({ base, line, accent, className }: Tones) {
  return (
    <svg viewBox="0 0 240 240" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <circle cx="104" cy="128" r="80" fill={base} />
      <circle cx="104" cy="128" r="80" stroke={line} strokeWidth="2" opacity=".35" />
      <path d="M44 110c24-16 70-18 116-2M42 142c30 16 82 16 122-4M70 72c10 30 12 80 2 112M140 70c-10 34-10 80 4 114" stroke={line} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" opacity=".7" />
      <g fill={accent}>
        <ellipse cx="86" cy="106" rx="9" ry="5" transform="rotate(-20 86 106)" />
        <ellipse cx="128" cy="150" rx="10" ry="6" transform="rotate(15 128 150)" />
        <ellipse cx="72" cy="158" rx="8" ry="5" transform="rotate(30 72 158)" />
      </g>
      <Seeds fill={line} points={[[96, 90], [118, 104], [70, 128], [138, 124], [104, 170], [90, 142], [120, 84], [150, 150]]} />
      <circle cx="196" cy="186" r="30" fill={line} />
      <circle cx="196" cy="186" r="22" fill={accent} />
      <path d="M186 70c10-10 26-10 30 2-10 10-26 10-30-2Z" fill={line} />
    </svg>
  );
}

// Packaging glyphs, drawn at a size that hints at the pack's scale.
export function SackGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <path d="M22 14c-2-5 1-9 5-8 2-3 8-3 10 0 4-1 7 3 5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 16h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 18C12 26 6 40 7 56c1 12 9 20 25 20s24-8 25-20c1-16-5-30-18-38" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="2" />
      <rect x="18" y="42" width="28" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M23 48h18M23 53h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function PouchGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 64" fill="none" className={cn("pointer-events-none", className)} aria-hidden="true">
      <path d="M8 6h32l2 46c0 5-4 8-8 8H14c-4 0-8-3-8-8L8 6Z" fill="currentColor" fillOpacity=".14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 14h30" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
      <circle cx="24" cy="36" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 36c2-2 6-2 8 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
