"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { packaging } from "@/data/packaging";
import { useEnquirySelection } from "@/components/enquiry-context";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { PodMark } from "@/components/decor";
import { Reveal } from "@/components/reveal";
import { useTabs } from "@/hooks/use-tabs";
import { cn } from "@/lib/utils";

// Subtle per-grade identity within the brand palette: backdrop, accent and readable accent text.
const identity: Record<string, { image: string; backdrop: string; accent: string; accentText: string }> = {
  king: { image: "/images/grade-king.webp", backdrop: "#e7dbbd", accent: "#c49a45", accentText: "#8a6420" },
  "shubh-laxmi": { image: "/images/grade-shubh-laxmi.webp", backdrop: "#d5e0cf", accent: "#6d8b68", accentText: "#5b6630" },
  shri: { image: "/images/grade-shri.webp", backdrop: "#efd2c3", accent: "#b85c3d", accentText: "#9a4a2f" },
  "white-tinopal": { image: "/images/grade-white-tinopal.webp", backdrop: "#efe5cf", accent: "#d4ae5e", accentText: "#8a6420" },
};

const retailRange = `${packaging.onDemand[0].size} – ${packaging.onDemand[packaging.onDemand.length - 1].size}`;

export function Grades() {
  const { setGrade } = useEnquirySelection();
  const { active, select, tabProps, panelProps } = useTabs(products.length);
  const listRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);

  // Remember the outgoing grade so its image can exit while the new one enters.
  const [view, setView] = useState({ active, previous: null as number | null });
  if (view.active !== active) setView({ active, previous: view.active });

  useEffect(() => {
    const list = listRef.current;
    const tab = list?.children[active] as HTMLElement | undefined;
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 20, behavior: "smooth" });
    }
  }, [active]);

  const product = products[active];
  const look = identity[product.id];

  return (
    <section id="grades" aria-labelledby="grades-title" className="section-space relative overflow-hidden bg-cream">
      <PodMark className="absolute -right-8 top-16 hidden h-56 text-gold/20 lg:block" />

      <div className="container-page">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="grades-title"
            eyebrow="Product grades"
            className="lg:col-span-7"
            title={
              <>
                Four grades. <em>One standard of care.</em>
              </>
            }
          />
          <p className="max-w-md text-lead text-ink-muted lg:col-span-5 lg:justify-self-end">
            Each grade is selected, cleaned and sorted to its own specification. Choose the one that suits your application.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Poppy seed grades"
            className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {products.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  {...tabProps(i)}
                  className={cn(
                    "group/tab relative flex min-w-[10.5rem] shrink-0 snap-start flex-col items-start gap-1 overflow-hidden rounded-md px-5 py-4 text-left transition-[background-color,color,box-shadow] duration-(--dur-normal) ease-(--ease-premium) sm:min-w-0",
                    selected ? "bg-forest text-cream shadow-card" : "bg-warm-white text-ink-muted hover:bg-white hover:text-charcoal"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-(--dur-premium) ease-(--ease-premium)", selected ? "scale-x-100" : "scale-x-0")}
                    style={{ backgroundColor: identity[item.id].accent }}
                  />
                  <span className={cn("micro-label", selected ? "text-gold" : "text-gold-deep")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl font-medium leading-tight">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div {...panelProps()} className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="relative isolate lg:col-span-7">
              <div
                aria-hidden="true"
                className="absolute -left-3 top-6 -z-10 h-[78%] w-[72%] rounded-xl transition-colors duration-(--dur-premium) ease-(--ease-premium) sm:-left-6"
                style={{ backgroundColor: look.backdrop }}
              />
              <div
                className="relative ml-4 aspect-[4/3] touch-pan-y overflow-hidden rounded-xl bg-botanical shadow-soft sm:ml-10"
                onPointerDown={(e) => (swipeStart.current = e.clientX)}
                onPointerUp={(e) => {
                  if (swipeStart.current === null) return;
                  const dx = e.clientX - swipeStart.current;
                  swipeStart.current = null;
                  if (Math.abs(dx) > 50) select(active + (dx < 0 ? 1 : -1));
                }}
              >
                {products.map((item, i) => {
                  const state = i === view.active ? "active" : i === view.previous ? "leaving" : "idle";
                  return (
                    <Image
                      key={item.id}
                      src={identity[item.id].image}
                      alt={i === active ? `Illustrative close-up of ${item.name} grade poppy seeds` : ""}
                      aria-hidden={i !== active}
                      fill
                      sizes="(min-width: 1024px) 700px, 92vw"
                      className={cn(
                        "object-cover transition-[opacity,transform] ease-(--ease-premium)",
                        state === "active" && "scale-100 opacity-100 duration-(--dur-premium)",
                        state === "leaving" && "scale-[1.04] opacity-0 duration-(--dur-premium)",
                        state === "idle" && "scale-[0.96] opacity-0 duration-0"
                      )}
                      draggable={false}
                    />
                  );
                })}
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-botanical/70 to-transparent" />
                <p className="absolute bottom-5 left-5 flex items-baseline gap-3 text-cream">
                  <span className="font-serif text-5xl font-medium leading-none" style={{ color: look.accent }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="micro-label">{product.category}</span>
                </p>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <span className="micro-label mr-2 text-ink-muted" aria-live="polite">
                  {String(active + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  aria-label="Previous grade"
                  className="flex size-11 items-center justify-center rounded-md border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream"
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  aria-label="Next grade"
                  className="flex size-11 items-center justify-center rounded-md border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream"
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>

            <div key={product.id} className="animate-panel-in lg:col-span-5">
              <p className="micro-label" style={{ color: look.accentText }}>
                {product.category} grade
              </p>
              <h3 className="mt-3 font-serif text-statement font-medium text-charcoal">{product.name}</h3>
              <p className="mt-5 text-lead text-ink-muted">{product.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 rounded-sm border border-forest/15 bg-warm-white px-3 py-1.5 text-sm font-medium text-charcoal">
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ backgroundColor: look.accent }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-forest/15 pt-6">
                <div>
                  <dt className="micro-label text-ink-muted">Standard packs</dt>
                  <dd className="mt-2 font-serif text-2xl font-semibold text-forest">{product.availablePacks.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="micro-label text-ink-muted">Retail packs</dt>
                  <dd className="mt-2 font-serif text-2xl font-semibold text-forest">On demand</dd>
                  <dd className="text-sm text-ink-muted">{retailRange}</dd>
                </div>
              </dl>

              <ButtonLink href="#contact" arrow size="lg" onClick={() => setGrade(product.name)} className="mt-8">
                Enquire about {product.name}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
