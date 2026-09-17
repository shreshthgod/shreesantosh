import { siteConfig } from "@/data/site-config";
import { products } from "@/data/products";
import { RollingText } from "@/components/rolling-text";
import { LiveClock } from "@/components/live-clock";
import { SectionLink } from "@/components/section-link";
import { Wordmark } from "@/components/tonalli-icons";

export function SiteFooter() {
  return (
    <footer data-page-layer="" className="dark overflow-hidden bg-background pb-28 pt-24 text-foreground lg:pb-20 lg:pt-30">
      <div className="grid grid-cols-1 gap-y-10 px-(--gutter) sm:grid-cols-2 lg:grid-cols-[var(--col-label)_var(--col-label)_var(--col-label)_1fr]">
        <nav aria-labelledby="footer-nav-title">
          <p id="footer-nav-title" className="text-label font-bold uppercase">
            Navigate
          </p>
          <ul className="mt-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href as `#${string}`}
                  className="group/roll flex min-h-11 items-center text-ui uppercase text-muted-foreground transition-colors duration-200 hover:text-foreground lg:min-h-8"
                >
                  <RollingText text={item.label} />
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-label font-bold uppercase">Grades</p>
          <ul className="mt-3 space-y-2 text-ui uppercase text-muted-foreground">
            {products.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label font-bold uppercase">Contact</p>
          <ul className="mt-3 space-y-2 break-words text-ui text-muted-foreground">
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>

        <div className="lg:text-right">
          <p className="text-label font-bold uppercase">India</p>
          <LiveClock className="mt-3 block text-ui tabular-nums text-muted-foreground" />
        </div>
      </div>

      <SectionLink href="#home" aria-label="Back to top" className="group/logo mt-24 block whitespace-nowrap px-(--gutter) lg:mt-30">
        <Wordmark className="text-[15vw] leading-[0.8] tracking-[-0.02em] group-hover/logo:tracking-[-0.06em]" />
      </SectionLink>

      <div className="mt-10 flex flex-col justify-between gap-2 px-(--gutter) text-label uppercase text-muted-foreground sm:flex-row lg:pr-28">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>{siteConfig.product} — bulk &amp; export supply</p>
      </div>
    </footer>
  );
}
