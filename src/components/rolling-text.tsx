import { cn } from "@/lib/utils";

export function RollingText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("rolling-text", className)} aria-label={text}>
      {[...text].map((char, i) => (
        <span key={i} aria-hidden="true" style={{ transitionDelay: `${i * 20}ms` }}>
          {char}
        </span>
      ))}
    </span>
  );
}
