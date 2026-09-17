import { cn } from "@/lib/utils";

export function RollingText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      <span className="sr-only">{text}</span>
      <span className="rolling-text" aria-hidden="true">
        {[...text].map((char, i) => (
          <span key={i} style={{ transitionDelay: `${i * 15}ms` }}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
