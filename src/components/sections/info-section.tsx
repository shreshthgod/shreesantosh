import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function InfoSection({
  id,
  label,
  index,
  statement,
  children,
  className,
}: {
  id: string;
  label: string;
  index: string;
  statement: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-border bg-background py-24 text-foreground lg:py-30", className)}>
      <div className="grid grid-cols-1 gap-8 px-(--gutter) lg:grid-cols-[var(--col-label)_1fr] lg:gap-0">
        <Reveal className="flex items-baseline justify-between lg:block lg:pr-8">
          <p className="text-ui font-medium uppercase">{label}</p>
          <p className="text-label tabular-nums text-muted-foreground lg:mt-3">{index}</p>
        </Reveal>
        <div>
          <Reveal delay={40}>
            <h2 id={`${id}-title`} className="max-w-[20ch] text-balance text-display font-medium uppercase tracking-[-0.01em]">
              {statement}
            </h2>
          </Reveal>
          <div className="mt-12 lg:mt-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
