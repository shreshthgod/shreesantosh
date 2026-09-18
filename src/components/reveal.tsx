"use client";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

// One gentle fade per content block. CSS keeps content visible without JS or with reduced motion.
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-state={visible ? "visible" : "hidden"} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
