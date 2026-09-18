import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={cn("micro-label flex items-center gap-3", tone === "dark" ? "text-gold" : "text-gold-deep", className)}>
      <span aria-hidden="true" className={cn("h-px w-10", tone === "dark" ? "bg-gold" : "bg-gold-deep/70")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "light",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  tone?: Tone;
  className?: string;
  titleClassName?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-5 font-serif text-display font-medium [&_em]:font-medium [&_em]:italic",
          dark ? "text-cream [&_em]:text-gold" : "text-charcoal [&_em]:text-forest",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && <p className={cn("mt-5 max-w-xl text-lead", dark ? "text-cream-muted" : "text-ink-muted")}>{description}</p>}
    </div>
  );
}
