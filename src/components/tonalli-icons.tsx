import { cn } from "@/lib/utils";

export function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={cn("h-2.5 w-2.5", className)} aria-hidden="true">
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 13 13" className={cn("h-[13px] w-[13px]", className)} aria-hidden="true">
      <path d="M1 6.5h10.5M7 2l4.5 4.5L7 11" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Wordmark({ className, monogram = false }: { className?: string; monogram?: boolean }) {
  return (
    <span
      className={cn(
        "inline-block font-wordmark font-light uppercase leading-none tracking-[0] transition-[letter-spacing] duration-500 ease-tonalli",
        className
      )}
    >
      {monogram ? "ST" : "Shrisantosh"}
    </span>
  );
}
