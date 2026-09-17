"use client";

import { useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/data/site-config";
import { isWhatsAppAvailable, openWhatsApp } from "@/lib/whatsapp";
import { RollingText } from "@/components/rolling-text";
import { CrossIcon } from "@/components/tonalli-icons";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const whatsappReady = isWhatsAppAvailable();

  const lenis = useLenis((l) => setShowTop(l.scroll > 800));

  const handleWhatsApp = () => {
    openWhatsApp(encodeURIComponent(`Hi ${siteConfig.name}, I'd like to enquire about ${siteConfig.product}.`));
    setOpen(false);
  };

  const itemClass =
    "group/roll flex w-full items-center justify-between px-4 py-3 text-left text-xs font-medium uppercase leading-[14.4px] transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2 lg:bottom-[64px] lg:right-[30px]">
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
        className={cn(
          "group/roll flex h-11 items-center border border-black bg-white px-4 text-xs font-medium uppercase text-black transition-[opacity,transform] duration-300 ease-tonalli",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <RollingText text="Top" />
      </button>

      {open && (
        <div className="w-56 border border-black bg-white text-black">
          <button type="button" onClick={handleWhatsApp} disabled={!whatsappReady} className={itemClass}>
            <RollingText text={siteConfig.cta.whatsapp} />
          </button>
          <a href={`tel:${siteConfig.contact.phone}`} onClick={() => setOpen(false)} className={itemClass}>
            <RollingText text="Call us" />
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} onClick={() => setOpen(false)} className={itemClass}>
            <RollingText text="E-mail us" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              setOpen(false);
              if (lenis) {
                e.preventDefault();
                lenis.scrollTo("#contact", { offset: -80 });
              }
            }}
            className={cn(itemClass, "border-t border-black")}
          >
            <RollingText text={siteConfig.cta.primary} />
          </a>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center bg-black text-white"
      >
        <CrossIcon className={cn("h-3.5 w-3.5 transition-transform duration-[450ms] ease-tonalli", open ? "rotate-45" : "rotate-0")} />
      </button>
    </div>
  );
}
