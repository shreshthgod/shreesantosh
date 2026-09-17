import { siteConfig } from "@/data/site-config";
import { products } from "@/data/products";
import { RollingText } from "@/components/rolling-text";
import { LiveClock } from "@/components/live-clock";
import { Wordmark } from "@/components/tonalli-icons";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-black pb-8 pt-[120px] text-white lg:pb-[80px]">
      <div className="grid grid-cols-2 gap-y-12 px-5 lg:grid-cols-[348px_348px_348px_1fr] lg:px-[30px]">
        <div>
          <p className="text-xs font-bold uppercase leading-[14.4px]">Navigate</p>
          <ul className="mt-4 space-y-[2px] text-xs uppercase leading-[16.8px]">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group/roll inline-block text-white/70 transition-colors hover:text-white">
                  <RollingText text={item.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase leading-[14.4px]">Grades</p>
          <ul className="mt-4 space-y-[2px] text-xs uppercase leading-[16.8px] text-white/70">
            {products.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase leading-[14.4px]">Contact</p>
          <ul className="mt-4 space-y-[2px] text-xs uppercase leading-[16.8px] text-white/70">
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.address}</li>
          </ul>
        </div>

        <div className="lg:text-right">
          <p className="text-xs font-bold uppercase leading-[14.4px]">India</p>
          <LiveClock className="mt-4 block text-xs uppercase leading-[16.8px] text-white/70" />
        </div>
      </div>

      <a href="#home" aria-label="Back to top" className="group/logo mt-[120px] block whitespace-nowrap px-5 lg:px-[30px]">
        <Wordmark className="text-[15vw] leading-[0.8] tracking-[-0.02em] group-hover/logo:tracking-[-0.06em]" />
      </a>

      <div className="mt-10 flex flex-col justify-between gap-2 px-5 pr-24 text-xs uppercase leading-[14.4px] text-white/45 sm:flex-row lg:pl-[30px] lg:pr-[110px]">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p>{siteConfig.product} — Bulk &amp; export supply</p>
      </div>
    </footer>
  );
}
