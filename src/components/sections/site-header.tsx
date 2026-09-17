"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/data/site-config";
import { RollingText } from "@/components/rolling-text";
import { Wordmark } from "@/components/tonalli-icons";
import { cn } from "@/lib/utils";

const menuLinks = [
  { label: "Grades", href: "#grades" },
  { label: "Packaging", href: "#packaging" },
  { label: "Process", href: "#process" },
  { label: "Uses", href: "#uses" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href, { offset: -80 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-20 transition-colors duration-300",
          open ? "text-black mix-blend-normal" : "text-white mix-blend-difference"
        )}
      >
        <div className="flex h-full items-start justify-between px-5 pt-[30px] lg:px-[30px]">
          <a
            href="#home"
            onClick={(e) => navigate(e, "#home")}
            aria-label={`${siteConfig.name} — home`}
            className="group/logo -mt-[3px] block h-[21px]"
          >
            <Wordmark
              monogram={open}
              className="text-[26px] leading-[21px] group-hover/logo:tracking-[-0.06em]"
            />
          </a>

          <a
            href="#contact"
            onClick={(e) => navigate(e, "#contact")}
            className="group/roll hidden items-center gap-[6px] text-sm font-medium uppercase leading-[16.8px] lg:flex"
          >
            <span className="block h-[11px] w-[11px] bg-current transition-transform duration-[450ms] ease-tonalli group-hover/roll:-translate-x-10" />
            <RollingText text="Enquire" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="group/roll text-sm font-medium uppercase leading-[16.8px] lg:hidden"
          >
            <RollingText text={open ? "Close" : "Menu"} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        data-open={open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-white px-5 pb-10 pt-[110px] text-black transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav className="flex flex-col">
          {menuLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={(e) => navigate(e, link.href)}
              className="mask-line py-[6px] text-[44px] font-medium uppercase leading-none tracking-[-0.01em]"
            >
              <span style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="mask-line mt-12 text-xs font-medium uppercase">
          <span style={{ transitionDelay: open ? "320ms" : "0ms" }}>E-mail</span>
        </div>
        <div className="mask-line mt-2 text-xs uppercase">
          <span style={{ transitionDelay: open ? "360ms" : "0ms" }}>{siteConfig.contact.email}</span>
        </div>
      </div>
    </>
  );
}
