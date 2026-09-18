"use client";

import Image from "next/image";
import { packaging } from "@/data/packaging";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { PouchGlyph, SackGlyph } from "@/components/illustrations";
import { RingOutline, SeedScatter } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { useTabs } from "@/hooks/use-tabs";
import { cn } from "@/lib/utils";

const modes = [
  {
    id: "bulk",
    label: "Bulk",
    title: "Standard bulk sacks",
    copy: `Always available in ${packaging.standard.map((p) => p.size).join(" and ")} sacks for wholesale and export orders.`,
  },
  {
    id: "retail",
    label: "Retail",
    title: "Retail packs on demand",
    copy: `Smaller packs from ${packaging.onDemand[0].size} to ${packaging.onDemand[packaging.onDemand.length - 1].size}, packed to order.`,
  },
];

const pouchSizes = ["h-7 sm:h-10", "h-8 sm:h-12", "h-9 sm:h-14", "h-10 sm:h-16", "h-11 sm:h-[4.5rem]", "h-12 sm:h-20"];

export function Packaging() {
  const { active, tabProps, panelProps } = useTabs(modes.length);
  const mode = modes[active];

  return (
    <section
      id="packaging"
      aria-labelledby="packaging-title"
      className="section-space relative overflow-hidden bg-[linear-gradient(180deg,#f6f0e4_0%,#e2eadc_100%)]"
    >
      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="packaging-title"
            eyebrow="Packaging"
            className="lg:col-span-7"
            title={
              <>
                Packed for <em>every scale.</em>
              </>
            }
          />
          <p className="max-w-md text-lead text-ink-muted lg:col-span-5 lg:justify-self-end">{packaging.note}</p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16">
          <div className="on-dark grain relative isolate overflow-hidden rounded-xl bg-forest p-6 text-cream shadow-soft sm:p-10 lg:p-14">
            <RingOutline className="-right-16 -top-16 size-64 border-gold/20" />
            <RingOutline className="-right-4 -top-4 size-32 border-gold/15" />
            <SeedScatter className="absolute -bottom-6 left-[38%] -z-10 size-48 text-gold/15" seed={5} count={30} />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-5">
                <p className="micro-label text-gold">Choose a format</p>
                <div role="tablist" aria-label="Packaging format" className="mt-4 grid w-full max-w-xs grid-cols-2 gap-1 rounded-md border border-cream/15 bg-botanical/60 p-1">
                  {modes.map((m, i) => (
                    <button
                      key={m.id}
                      {...tabProps(i)}
                      className={cn(
                        "h-11 rounded-sm text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-[background-color,color] duration-(--dur-normal) ease-(--ease-premium)",
                        active === i ? "bg-gold text-botanical" : "text-cream-muted hover:text-cream"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div key={mode.id} className="mt-8 animate-panel-in">
                  <h3 className="font-serif text-title font-medium">{mode.title}</h3>
                  <p className="mt-3 max-w-sm text-lead text-cream-muted">{mode.copy}</p>
                </div>

                <p className="mt-6 max-w-sm border-l-2 border-saffron pl-4 text-cream-muted">
                  <span className="font-semibold text-cream">{packaging.custom.label}.</span> {packaging.custom.description}.
                </p>

                <ButtonLink href="#contact" variant="gold" arrow className="mt-8">
                  Ask about packaging
                </ButtonLink>
              </div>

              <div {...panelProps()} className="grid lg:col-span-7">
                <div
                  inert={active !== 0}
                  className={cn(
                    "grid content-start gap-3 transition-[opacity,transform] duration-(--dur-premium) ease-(--ease-premium) [grid-area:1/1] sm:gap-4 lg:content-center",
                    active === 0 ? "opacity-100" : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-cream/15 sm:aspect-[16/9]">
                    <Image src="/images/packaging-sacks.webp" alt="Illustration of 25 KG and 50 KG poppy seed sacks" fill sizes="(min-width: 1024px) 640px, 90vw" className="object-cover" />
                    <span className="micro-label absolute left-4 top-4 rounded-sm bg-gold px-2.5 py-1 text-botanical">Always available</span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {packaging.standard.map((pack, i) => (
                      <li key={pack.size} className="flex items-end justify-between gap-3 rounded-lg border border-cream/15 bg-botanical/45 p-5 sm:p-6">
                        <div>
                          <p className="font-serif text-4xl font-medium leading-none sm:text-5xl">{pack.label}</p>
                          <p className="micro-label mt-3 text-cream-muted">{pack.description}</p>
                        </div>
                        <SackGlyph className={cn("shrink-0 text-gold", i === 0 ? "h-10 sm:h-12" : "h-14 sm:h-16")} />
                      </li>
                    ))}
                  </ul>
                </div>

                <ul
                  inert={active !== 1}
                  className={cn(
                    "grid auto-rows-fr grid-cols-2 gap-3 transition-[opacity,transform] duration-(--dur-premium) ease-(--ease-premium) [grid-area:1/1] sm:grid-cols-3 sm:gap-4",
                    active === 1 ? "opacity-100" : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
                  )}
                >
                  {packaging.onDemand.map((pack, i) => (
                    <li key={pack.size} className="flex flex-col rounded-lg border border-cream/15 bg-cream/[0.05] p-4 sm:p-5">
                      <span className="micro-label hidden text-saffron sm:block">On demand</span>
                      {/* Pouch grows with pack size, so the card itself shows the scale. */}
                      <div className="flex flex-1 items-end justify-center py-1 sm:py-4">
                        <PouchGlyph className={cn("text-saffron", pouchSizes[i])} />
                      </div>
                      <p className="font-serif text-3xl font-medium leading-none sm:text-4xl">{pack.label}</p>
                      <p className="micro-label mt-2 text-cream-muted">{pack.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
