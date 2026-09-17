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
    <section id={id} className={cn("border-t border-black/12 bg-white py-[120px] text-black", className)}>
      <div className="grid grid-cols-1 gap-10 px-5 lg:grid-cols-[348px_1fr] lg:gap-0 lg:px-[30px]">
        <Reveal className="flex items-start justify-between pr-[30px] lg:block">
          <p className="text-sm font-medium uppercase leading-[14px]">{label}</p>
          <p className="text-xs leading-[14.4px] text-black/50 lg:mt-[15px]">{index}</p>
        </Reveal>
        <div>
          <Reveal delay={60}>
            <h2 className="max-w-[20ch] text-balance text-[clamp(28px,3.4vw,48px)] font-medium uppercase leading-[1.05] tracking-[-0.01em]">
              {statement}
            </h2>
          </Reveal>
          <div className="mt-16">{children}</div>
        </div>
      </div>
    </section>
  );
}
