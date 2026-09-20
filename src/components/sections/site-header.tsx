"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { useActiveSection } from "@/hooks/use-active-section";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.nav.map((item) => item.href.slice(1)).filter((id) => id !== "home");

// Shared with the intro so the flying name lands pixel-perfect on the header logo.
export const WORDMARK_LINE1_SIZE = "text-[1.15rem] min-[375px]:text-[1.3rem] sm:text-[1.4rem]";

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex flex-col leading-none", className)}>
      <span className={cn("font-serif font-semibold uppercase tracking-[0.08em]", compact ? "text-xl" : WORDMARK_LINE1_SIZE)}>{siteConfig.wordmark.line1}</span>
      <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.42em] opacity-80">{siteConfig.wordmark.line2}</span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const solid = scrolled || open;
  const close = () => setOpen(false);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-24 w-px" />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-(--dur-premium) ease-(--ease-premium)",
          solid ? "border-forest/10 bg-cream/95 text-forest backdrop-blur-md" : "on-dark border-transparent bg-transparent text-cream"
        )}
      >
        <div className="container-page flex h-(--header-h) items-center justify-between gap-6">
          <a href="#home" className="flex h-11 items-center" aria-label={`${siteConfig.name} — home`}>
            <Wordmark className="header-wordmark" />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-8">
              {siteConfig.nav.map((item) => {
                const current = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={current ? "true" : undefined}
                      className={cn(
                        "group/nav relative flex h-11 items-center text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-[color,transform] duration-(--dur-normal) ease-(--ease-premium) hover:translate-x-0.5",
                        solid ? "hover:text-gold-deep" : "hover:text-gold"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 bottom-2.5 h-px origin-left transition-transform duration-(--dur-normal) ease-(--ease-premium)",
                          solid ? "bg-gold-deep" : "bg-gold",
                          current ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="#contact" variant={solid ? "forest" : "gold"} arrow className="hidden h-11 lg:inline-flex">
              Enquire
            </ButtonLink>
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex h-11 items-center gap-2 rounded-md px-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] lg:hidden"
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              <span className="max-[359px]:sr-only">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>

        <div ref={panelRef} id="mobile-nav" hidden={!open} className="border-t border-forest/10 bg-cream text-forest lg:hidden">
          <nav aria-label="Mobile" className="container-page pb-6 pt-2">
            <ol>
              {siteConfig.nav.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={active === item.href.slice(1) ? "true" : undefined}
                    className="flex h-14 items-baseline gap-4 border-b border-forest/10 pt-4 font-serif text-2xl font-medium aria-[current=true]:text-gold-deep"
                  >
                    <span aria-hidden="true" className="micro-label w-6 text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
            <ButtonLink href="#contact" onClick={close} arrow size="lg" className="mt-6 w-full">
              Send enquiry
            </ButtonLink>
          </nav>
        </div>
      </header>
    </>
  );
}
