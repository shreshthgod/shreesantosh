import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { RollingText } from "@/components/rolling-text";
import { SectionLink } from "@/components/section-link";
import { ArrowIcon } from "@/components/tonalli-icons";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate min-h-svh overflow-hidden bg-black text-white">
      <SceneCanvas name="pod" className="-z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-black/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/25 lg:to-transparent"
      />

      <div className="flex min-h-svh flex-col justify-between gap-16 px-(--gutter) pb-[max(3rem,12vh)] pt-[calc(var(--header-h)+8vh)]">
        <h1 id="hero-title" className="max-w-[14ch] text-balance text-hero font-medium uppercase tracking-[-0.02em]">
          Quality-graded poppy seeds, supplied in bulk.
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[var(--col-label)_var(--col-label)_1fr] lg:items-start lg:gap-0">
          <div>
            <h2 className="text-ui font-medium uppercase">Who we are</h2>
            <p className="mt-4 max-w-[34ch] text-body text-white/85">
              {siteConfig.name} supplies quality-graded poppy seeds to distributors, food
              manufacturers, retailers and export buyers.
            </p>
            <SectionLink href="#about" className="group/roll mt-3 inline-flex min-h-11 items-center text-ui font-medium uppercase underline decoration-1 underline-offset-4">
              <RollingText text="About our supply" />
            </SectionLink>
          </div>

          {/* Secondary on mobile: the grade panels follow immediately, so the primary CTA stays above the fold. */}
          <div className="hidden lg:block">
            <h2 className="text-ui font-medium uppercase">Our grades</h2>
            <ul className="mt-2">
              {products.map((product) => (
                <li key={product.id}>
                  <SectionLink
                    href={`#grade-${product.id}`}
                    className="group/arrow flex min-h-11 items-center text-body lg:min-h-8"
                  >
                    <span className="flex -translate-x-[17px] items-center gap-1 transition-transform duration-300 ease-tonalli group-hover/arrow:translate-x-0 group-focus-visible/arrow:translate-x-0">
                      <ArrowIcon className="opacity-0 transition-opacity duration-300 ease-tonalli group-hover/arrow:opacity-100 group-focus-visible/arrow:opacity-100" />
                      <span>
                        {product.name} <span className="text-white/70">— {product.category}</span>
                      </span>
                    </span>
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:self-end lg:justify-end">
            <SectionLink
              href="#contact"
              className="group/roll inline-flex min-h-14 items-center gap-2 bg-white px-6 text-ui font-medium uppercase text-black transition-transform duration-150 active:scale-[0.98]"
            >
              <span aria-hidden="true" className="block size-[11px] bg-current transition-transform duration-300 ease-tonalli group-hover/roll:-translate-x-1" />
              <RollingText text="Request a quote" />
            </SectionLink>
            <SectionLink href="#grades" className="group/roll inline-flex min-h-11 items-center text-ui font-medium uppercase">
              <RollingText text={siteConfig.cta.secondary} />
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
