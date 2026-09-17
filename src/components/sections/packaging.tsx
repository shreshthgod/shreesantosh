"use client";

import { packaging } from "@/data/packaging";
import { Reveal } from "@/components/reveal";
import { useEnquirySelection } from "@/components/enquiry-context";
import { cn } from "@/lib/utils";
import { InfoSection } from "./info-section";

function PackButton({
  size,
  description,
  large,
}: {
  size: string;
  description?: string;
  large?: boolean;
}) {
  const { packing, setPacking } = useEnquirySelection();
  const selected = packing === size;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => setPacking(size)}
      className={cn(
        "flex items-center justify-between border border-black uppercase transition-colors duration-300 ease-tonalli",
        large ? "flex-col items-start gap-3 px-6 py-6 text-left" : "px-4 py-3 text-xs font-medium leading-[14.4px]",
        selected ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
      )}
    >
      <span className={cn("whitespace-nowrap", large && "text-[clamp(28px,3vw,40px)] font-medium leading-none")}>{size}</span>
      {description && <span className="text-xs leading-[14.4px] opacity-60">{description}</span>}
    </button>
  );
}

export function Packaging() {
  return (
    <InfoSection id="packaging" label="Packaging" index="02" statement="Bulk sacks. Retail packs. Built to order.">
      <div className="grid gap-14 xl:grid-cols-2 xl:gap-10">
        <Reveal>
          <p className="text-xs font-bold uppercase leading-[14.4px]">Standard — always available</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {packaging.standard.map((pack) => (
              <PackButton key={pack.size} size={pack.size} description={pack.description} large />
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-xs font-bold uppercase leading-[14.4px]">On demand</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {packaging.onDemand.map((pack) => (
              <PackButton key={pack.size} size={pack.size} />
            ))}
          </div>
          <p className="mt-8 max-w-[420px] text-xs leading-[16.8px] text-black/60">{packaging.note}</p>
          <p className="mt-6 text-xs font-bold uppercase leading-[14.4px]">{packaging.custom.label}</p>
          <p className="mt-[3px] text-xs leading-[16.8px] text-black/60">{packaging.custom.description}</p>
        </Reveal>
      </div>
    </InfoSection>
  );
}
