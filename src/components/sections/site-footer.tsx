import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { getContactItems } from "@/lib/contact";
import { PodMark, SeedScatter } from "@/components/decor";

export function SiteFooter() {
  const contacts = getContactItems();

  return (
    <footer className="on-dark grain relative isolate overflow-hidden bg-botanical text-cream">
      <SeedScatter className="absolute -right-10 top-10 -z-10 size-72 text-gold/10" seed={31} count={40} />

      <div className="container-page pb-8 pt-20 md:pt-28">
        <p aria-hidden="true" className="font-serif text-[clamp(3.25rem,12.5vw,11.5rem)] font-medium leading-[0.86] tracking-[-0.03em]">
          Shrisantosh
          <br />
          <em className="font-medium italic text-gold">Traders</em>
        </p>
        <span aria-hidden="true" className="mt-10 block h-px w-full bg-gradient-to-r from-gold/70 via-gold/30 to-transparent" />

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <PodMark className="h-12 text-gold" />
            <p className="mt-5 font-serif text-2xl">{siteConfig.name}</p>
            <p className="micro-label mt-3 text-gold">Quality poppy seeds</p>
            <p className="micro-label mt-1 text-cream-muted">Bulk &amp; export supply</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="micro-label text-gold">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="group/f flex min-h-11 items-center text-cream-muted transition-colors hover:text-cream">
                    <span aria-hidden="true" className="h-px w-0 bg-gold transition-[width,margin] duration-(--dur-normal) ease-(--ease-premium) group-hover/f:mr-2 group-hover/f:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="micro-label text-gold">Contact</h2>
            {contacts.length > 0 ? (
              <ul className="mt-4 space-y-2 text-cream-muted">
                {contacts.map((item) => (
                  <li key={item.kind}>
                    <span className="sr-only">{item.label}: </span>
                    {item.href ? (
                      <a href={item.href} className="hover:text-cream">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <a href="#contact" className="mt-4 inline-flex min-h-11 items-center border-b border-gold/50 text-cream hover:border-gold">
                Send us an enquiry
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/10 pt-6 text-sm text-cream-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a href="#home" className="group/top inline-flex min-h-11 items-center gap-2 hover:text-cream">
            Back to top
            <ArrowUp aria-hidden="true" className="size-4 text-gold transition-transform duration-(--dur-normal) group-hover/top:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
