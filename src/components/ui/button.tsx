import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-3 rounded-md font-semibold whitespace-nowrap uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform,box-shadow] duration-(--dur-normal) ease-(--ease-premium) hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 motion-reduce:hover:translate-y-0",
  {
    variants: {
      variant: {
        gold: "bg-gold text-botanical hover:bg-gold-bright hover:shadow-lift",
        forest: "bg-forest text-cream hover:bg-botanical hover:shadow-lift",
        outlineCream: "border border-cream/45 text-cream hover:border-cream hover:bg-cream/10",
        outlineForest: "border border-forest/35 text-forest hover:border-forest hover:bg-forest/5",
      },
      size: {
        md: "h-12 px-6 text-[0.8125rem]",
        lg: "h-14 px-7 text-[0.8125rem]",
      },
    },
    defaultVariants: { variant: "forest", size: "md" },
  }
);

type Variants = VariantProps<typeof buttonVariants>;

const arrowTone: Record<NonNullable<Variants["variant"]>, string> = {
  gold: "text-botanical",
  forest: "text-gold",
  outlineCream: "text-gold",
  outlineForest: "text-gold-deep",
};

function Arrow({ variant }: { variant: Variants["variant"] }) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={cn("size-4 transition-transform duration-(--dur-normal) ease-(--ease-premium) group-hover/btn:translate-x-1", arrowTone[variant ?? "forest"])}
    />
  );
}

type ButtonProps = React.ComponentProps<"button"> & Variants & { arrow?: boolean };
type LinkProps = React.ComponentProps<"a"> & Variants & { arrow?: boolean };

export function Button({ className, variant, size, arrow, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </button>
  );
}

export function ButtonLink({ className, variant, size, arrow, children, ...props }: LinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && <Arrow variant={variant} />}
    </a>
  );
}
