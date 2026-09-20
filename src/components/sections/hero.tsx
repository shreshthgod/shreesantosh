"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { packaging } from "@/data/packaging";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/button";
import { BotanicalStem, CurveEdge, RingOutline, SeedScatter } from "@/components/decor";
import { useHeroScroll } from "@/components/motion/use-hero-scroll";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const standardPacks = packaging.standard.map((p) => p.size).join(" · ");
  const sectionRef = useRef<HTMLElement>(null);
  useHeroScroll(sectionRef);

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="on-dark grain relative isolate overflow-hidden bg-forest text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-fade bg-[radial-gradient(90%_70%_at_78%_40%,#1e4d3b_0%,#12372a_50%,#0b2419_100%)]"
      />
      <BotanicalStem className="absolute -left-6 bottom-0 -z-10 hidden h-[26rem] animate-fade text-gold/25 md:block" />
      <svg aria-hidden="true" viewBox="0 0 800 400" fill="none" className="absolute -right-40 top-24 -z-10 hidden w-[56rem] animate-fade text-gold/15 lg:block" style={delay(600)}>
        <path d="M0 360C160 250 300 90 520 70s250 110 280 190" stroke="currentColor" strokeWidth="1" />
        <path d="M60 400C220 300 330 150 540 130s220 90 260 160" stroke="currentColor" strokeWidth="1" />
      </svg>

      <canvas data-hero-seeds aria-hidden="true" className="hero-seeds" />

      <div className="container-page relative z-10 grid gap-14 pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-24 lg:min-h-[min(100svh,62rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-28 lg:pt-[calc(var(--header-h)+2rem)]">
        <div data-hero-copy className="lg:col-span-7">
          <p className="micro-label flex animate-rise items-center gap-3 text-gold" style={delay(80)}>
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            {siteConfig.name} · Poppy seed suppliers
          </p>

          <h1 id="hero-title" className="mt-7 font-serif text-hero font-medium">
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="block animate-line-up" style={delay(160)}>
                Selected with <em className="font-medium italic text-gold">care.</em>
              </span>
            </span>
            <span className="-mb-2 block overflow-hidden pb-2">
              <span className="block animate-line-up" style={delay(280)}>
                Supplied with <em className="font-medium italic text-gold">consistency.</em>
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-[30rem] animate-rise text-lead text-cream-muted" style={delay(440)}>
            {siteConfig.name} supplies quality-graded poppy seeds to distributors, food businesses and export buyers —
            {` ${products.length} grades, in bulk sacks or retail packs.`}
          </p>

          <div className="mt-10 flex animate-rise flex-wrap gap-3" style={delay(560)}>
            <ButtonLink href="#grades" variant="gold" size="lg" arrow>
              Explore grades
            </ButtonLink>
            <ButtonLink href="#contact" variant="outlineCream" size="lg">
              Send enquiry
            </ButtonLink>
          </div>

          <a
            href="#grades"
            className="group/scroll mt-14 hidden w-fit animate-fade items-center gap-4 text-cream-muted transition-colors hover:text-cream md:flex"
            style={delay(1000)}
          >
            <span className="micro-label text-gold">01</span>
            <span className="relative block h-12 w-px overflow-hidden bg-cream/15">
              <span aria-hidden="true" className="absolute inset-0 animate-scroll-line bg-gold" />
            </span>
            <span className="micro-label">Scroll to explore</span>
          </a>
        </div>

        <div data-hero-visual className="relative mx-auto aspect-square w-full max-w-[32rem] sm:aspect-[4/5] lg:col-span-5 lg:mr-0">
          <div aria-hidden="true" className="absolute right-0 top-[7%] h-[86%] w-[80%] animate-fade rounded-t-full rounded-b-xl border border-cream/10 bg-cream/[0.06]" style={delay(420)} />
          <RingOutline className="-left-4 top-[4%] size-32 animate-settle border-gold/40 sm:size-40" />

          <div className="absolute left-[6%] top-0 h-[90%] w-[76%] animate-settle overflow-hidden rounded-t-full rounded-b-xl shadow-soft ring-1 ring-cream/10" style={delay(320)}>
            <Image
              src="/images/hero-poppy-pod.webp"
              alt="Illustration of a poppy seed pod"
              fill
              loading="eager"
              fetchPriority="high"
              data-hero-pod
              sizes="(min-width: 1024px) 420px, 76vw"
              className="object-cover object-[50%_34%]"
            />
          </div>

          <SeedScatter className="absolute bottom-[20%] right-[2%] size-24 animate-fade text-gold/70 sm:size-32" seed={11} />

          <div className="absolute bottom-[4%] left-0 size-28 animate-settle overflow-hidden rounded-full border-4 border-forest shadow-lift sm:size-36" style={delay(600)}>
            <Image src="/images/grade-king.webp" alt="" fill sizes="144px" className="object-cover" />
          </div>

          {/* Outer div moves on scroll (GSAP); inner div keeps the CSS entrance animation. */}
          <div data-hero-chip className="absolute right-0 top-[14%]">
            <div className="animate-rise rounded-md bg-cream px-4 py-3 text-forest shadow-lift sm:px-5 sm:py-4" style={delay(720)}>
              <p className="micro-label text-gold-deep">Quality grade</p>
              <p className="mt-1 font-serif text-xl font-semibold sm:text-2xl">{products[0].category}</p>
            </div>
          </div>

          <div data-hero-chip className="absolute bottom-0 right-[3%]">
            <div className="animate-rise rounded-md border border-gold/30 bg-botanical/90 px-4 py-3 shadow-lift sm:px-5 sm:py-4" style={delay(820)}>
              <p className="font-serif text-xl font-semibold text-gold sm:text-2xl">{standardPacks}</p>
              <p className="micro-label mt-1 text-cream-muted">Bulk supply</p>
            </div>
          </div>
        </div>
      </div>

      <CurveEdge fill="#f6f0e4" className="absolute inset-x-0 -bottom-px z-10" />
    </section>
  );
}
