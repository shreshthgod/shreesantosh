"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Faq() {
  // Deep-link support: #faq-<id> opens the matching item on load (lazy init, no effect).
  const [open, setOpen] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const id = window.location.hash.replace("#faq-", "");
    return faqs.some((f) => f.id === id) ? id : null;
  });

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-space relative overflow-hidden bg-warm-white">
      <JsonLd
        id="faq-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title={
                <>
                  Questions buyers <em>actually ask.</em>
                </>
              }
              description="Straight answers on grades, pack sizes, custom packing, bulk and export supply — before you even need to ask."
            />
            <ButtonLink href="#contact" arrow size="lg" className="mt-8">
              Ask something else
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <ul className="border-t border-forest/15">
            {faqs.map((faq) => {
              const expanded = open === faq.id;
              return (
                <li key={faq.id} id={`faq-${faq.id}`} className="scroll-mt-[calc(var(--header-h)+1rem)] border-b border-forest/15">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${faq.id}-panel`}
                    onClick={() => setOpen(expanded ? null : faq.id)}
                    className="group/faq flex min-h-[4.5rem] w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-serif text-xl font-semibold text-charcoal transition-transform duration-(--dur-normal) ease-(--ease-premium) group-hover/faq:translate-x-1 sm:text-2xl">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,color,border-color,transform] duration-(--dur-normal) ease-(--ease-premium)",
                        expanded ? "rotate-45 border-forest bg-forest text-cream" : "border-forest/25 text-forest group-hover/faq:border-forest"
                      )}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>
                  <div
                    id={`${faq.id}-panel`}
                    role="region"
                    aria-label={faq.question}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-(--dur-premium) ease-(--ease-premium)",
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-2 leading-relaxed text-ink-muted">{faq.answer}</p>
                      <a
                        href={faq.link.href}
                        tabIndex={expanded ? 0 : -1}
                        className="group/link inline-flex min-h-11 items-center gap-2 pb-6 font-semibold text-forest hover:text-gold-deep"
                      >
                        <span className="border-b border-forest/30 group-hover/link:border-gold-deep">{faq.link.label}</span>
                        <ArrowRight aria-hidden="true" className="size-4 text-gold-deep transition-transform duration-(--dur-normal) group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
