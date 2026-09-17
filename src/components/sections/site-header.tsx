"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/data/site-config";
import { RollingText } from "@/components/rolling-text";
import { SectionLink } from "@/components/section-link";
import { Wordmark } from "@/components/tonalli-icons";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export const primaryNav = [
  { label: "Grades", href: "#grades" },
  { label: "Packaging", href: "#packaging" },
  { label: "Process", href: "#process" },
  { label: "Uses", href: "#uses" },
  { label: "Contact", href: "#contact" },
] as const;

const sectionIds = primaryNav.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const active = useActiveSection(sectionIds);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();

    // Everything behind the dialog becomes inert, which also traps focus inside it.
    document.querySelectorAll<HTMLElement>("[data-page-layer]").forEach((el) => {
      el.inert = open;
    });

    if (open) {
      firstLinkRef.current?.focus();
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const close = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-(--header-h)",
          open ? "text-black" : "text-white mix-blend-difference"
        )}
      >
        <div className="flex h-full items-start justify-between px-(--gutter) pt-[18px]">
          <SectionLink
            href="#home"
            onNavigate={() => setOpen(false)}
            aria-label={`${siteConfig.name} — back to top`}
            className="group/logo flex h-11 items-center"
          >
            <Wordmark monogram={open} className="text-[1.625rem] leading-none group-hover/logo:tracking-[-0.06em]" />
          </SectionLink>

          <SectionLink
            href="#contact"
            className="group/roll hidden h-11 items-center gap-1.5 text-ui font-medium uppercase lg:flex"
          >
            <span
              aria-hidden="true"
              className="block size-[11px] bg-current transition-transform duration-300 ease-tonalli group-hover/roll:-translate-x-10 group-focus-visible/roll:-translate-x-10"
            />
            <RollingText text={siteConfig.cta.primary} />
          </SectionLink>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="group/roll -mr-3 flex h-11 min-w-11 items-center justify-center px-3 text-ui font-medium uppercase lg:hidden"
          >
            <RollingText text={open ? "Close" : "Menu"} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-(--gutter) pb-10 pt-28 text-black lg:hidden",
          open
            ? "visible opacity-100 transition-opacity duration-300 ease-tonalli"
            : "invisible opacity-0 transition-[opacity,visibility] duration-200 ease-exit"
        )}
      >
        <nav aria-label="Menu">
          <ul>
            {primaryNav.map((link, i) => (
              <li key={link.href}>
                <SectionLink
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active === link.href.slice(1) ? "true" : undefined}
                  onNavigate={() => setOpen(false)}
                  className="mask-line flex min-h-14 items-center text-[2.75rem] font-medium uppercase leading-none tracking-[-0.01em] aria-[current=true]:underline aria-[current=true]:decoration-2 aria-[current=true]:underline-offset-[6px]"
                >
                  <span style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}>{link.label}</span>
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 text-label uppercase">
          <p className="mask-line font-bold">
            <span style={{ transitionDelay: open ? "260ms" : "0ms" }}>E-mail</span>
          </p>
          <p className="mask-line mt-1 text-body normal-case">
            <span style={{ transitionDelay: open ? "300ms" : "0ms" }}>{siteConfig.contact.email}</span>
          </p>
        </div>
      </div>
    </>
  );
}
