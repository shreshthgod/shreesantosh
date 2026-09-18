import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { benefits } from "@/data/features";
import { processSteps } from "@/data/process";
import { siteConfig } from "@/data/site-config";
import { Eyebrow } from "@/components/section-heading";
import { featureIcons } from "@/components/icons";
import { RingOutline, SeedScatter } from "@/components/decor";
import { Reveal } from "@/components/reveal";

const numberTones = ["text-gold-deep", "text-terracotta-deep", "text-leaf-deep", "text-forest"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-space relative overflow-hidden bg-warm-white">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Eyebrow>About {siteConfig.shortName}</Eyebrow>
            <h2 id="about-title" className="mt-6 font-serif text-statement font-medium text-charcoal">
              A supply process built for buyers who value <em className="font-medium italic text-forest">consistency.</em>
            </h2>
            <p className="mt-8 max-w-xl text-lead text-ink-muted">{siteConfig.description}</p>
            <a
              href="#process"
              className="group/link mt-8 inline-flex min-h-11 items-center gap-3 border-b border-forest/30 font-semibold text-forest transition-colors hover:border-forest"
            >
              See how every batch is processed
              <ArrowRight aria-hidden="true" className="size-4 text-gold-deep transition-transform duration-(--dur-normal) group-hover/link:translate-x-1" />
            </a>
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md">
              <div aria-hidden="true" className="absolute -right-2 top-8 h-[84%] w-[78%] rounded-t-full rounded-b-xl bg-sage/60" />
              <RingOutline className="-top-4 left-2 size-24 border-gold/50" />
              <div className="absolute left-0 top-0 h-[88%] w-[80%] overflow-hidden rounded-t-full rounded-b-xl shadow-soft">
                <Image src="/images/grade-shri.webp" alt="Illustrative pile of graded poppy seeds" fill sizes="(min-width: 1024px) 360px, 80vw" className="object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 size-32 overflow-hidden rounded-full border-4 border-warm-white shadow-lift sm:size-40">
                <Image src="/images/grade-white-tinopal.webp" alt="" fill sizes="160px" className="object-cover" />
              </div>
              <div className="absolute -left-2 bottom-[10%] rounded-md bg-forest px-5 py-4 text-cream shadow-lift sm:-left-6">
                <p className="font-serif text-5xl font-medium leading-none text-gold">{processSteps.length}</p>
                <p className="micro-label mt-2 text-cream-muted">Controlled stages</p>
              </div>
              <SeedScatter className="absolute -right-6 top-0 size-24 text-gold-deep/40" seed={23} count={18} />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 lg:mt-28">
          <ol className="grid border-t border-forest/15 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = featureIcons[benefit.icon];
              return (
                <li key={benefit.id} className="border-b border-forest/15 py-8 sm:pr-8 xl:border-b-0 xl:border-r xl:px-8 xl:first:pl-0 xl:last:border-r-0">
                  <div className="flex items-start justify-between">
                    <span aria-hidden="true" className={`font-serif text-7xl font-medium leading-none ${numberTones[i % numberTones.length]}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon aria-hidden="true" className="mt-2 size-6 text-forest/70" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-semibold text-charcoal">{benefit.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{benefit.description}</p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
