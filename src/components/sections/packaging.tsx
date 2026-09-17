"use client";

import { packaging } from "@/data/packaging";
import { Reveal } from "@/components/reveal";
import { useEnquirySelection } from "@/components/enquiry-context";
import { cn } from "@/lib/utils";
import { InfoSection } from "./info-section";

function PackButton({ size, description, large }: { size: string; description?: string; large?: boolean }) {
  const { packing, setPacking } = useEnquirySelection();
  const selected = packing === size;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => setPacking(selected ? "" : size)}
      className={cn(
        "border border-foreground uppercase transition-colors duration-200 ease-tonalli active:scale-[0.98]",
        large ? "flex flex-col items-start gap-3 p-6 text-left" : "inline-flex min-h-11 items-center px-4 text-ui font-medium",
        selected ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-foreground hover:text-background"
      )}
    >
      <span className={cn("whitespace-nowrap", large && "text-display font-medium")}>{size}</span>
      {description && <span className="text-label opacity-80">{description}</span>}
    </button>
  );
}

export function Packaging() {
  const { packing } = useEnquirySelection();

  return (
    <InfoSection id="packaging" label="Packaging" index="02" statement="Bulk sacks. Retail packs. Built to order.">
      <div className="grid gap-12 xl:grid-cols-2 xl:gap-10">
        <Reveal>
          <h3 className="text-ui font-bold uppercase">Standard — always available</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {packaging.standard.map((pack) => (
              <PackButton key={pack.size} size={pack.size} description={pack.description} large />
            ))}
          </div>
        </Reveal>

        <Reveal delay={40}>
          <h3 className="text-ui font-bold uppercase">On demand</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {packaging.onDemand.map((pack) => (
              <PackButton key={pack.size} size={pack.size} />
            ))}
          </div>
          <p className="mt-6 max-w-[52ch] text-body text-muted-foreground">{packaging.note}</p>
          <h3 className="mt-8 text-ui font-bold uppercase">{packaging.custom.label}</h3>
          <p className="mt-1 text-body text-muted-foreground">{packaging.custom.description}</p>
        </Reveal>
      </div>

      <p aria-live="polite" className="mt-10 border-t border-border pt-5 text-ui font-medium uppercase">
        {packing ? `${packing} added to your enquiry` : "Select a pack size to add it to your enquiry"}
      </p>
    </InfoSection>
  );
}
