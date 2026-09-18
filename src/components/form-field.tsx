import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const controlClass =
  "mt-2 block h-12 w-full rounded-md border border-leaf/70 bg-warm-white/70 px-4 text-base text-charcoal placeholder:text-ink-muted/70 transition-[border-color,box-shadow,background-color] duration-(--dur-normal) ease-(--ease-premium) hover:border-forest/60 focus:border-forest focus:bg-warm-white focus:shadow-[0_0_0_4px_rgb(196_154_69/0.28)] focus:outline-none focus-visible:outline-none aria-invalid:border-terracotta-deep aria-invalid:shadow-[0_0_0_3px_rgb(154_74_47/0.14)]";

export function FormField({
  id,
  label,
  required,
  helper,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  helper?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("group/field", className)}>
      <label
        htmlFor={id}
        className="inline-block text-sm font-semibold text-forest transition-transform duration-(--dur-normal) ease-(--ease-premium) group-focus-within/field:translate-x-0.5"
      >
        {label}
        {required ? (
          <span className="text-terracotta-deep" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-ink-muted"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-terracotta-deep">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : (
        helper && (
          <p id={`${id}-helper`} className="mt-2 text-sm text-ink-muted">
            {helper}
          </p>
        )
      )}
    </div>
  );
}
