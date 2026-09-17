"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/data/site-config";
import { isWhatsAppAvailable, openWhatsApp } from "@/lib/whatsapp";
import { useSectionNav } from "@/hooks/use-section-nav";
import { RollingText } from "@/components/rolling-text";
import { CrossIcon } from "@/components/tonalli-icons";
import { cn } from "@/lib/utils";

const itemClass =
  "group/roll flex min-h-12 w-full items-center justify-between px-4 text-left text-ui font-medium uppercase transition-colors duration-200 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:text-muted-foreground";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { goTo } = useSectionNav();
  const whatsappReady = isWhatsAppAvailable();

  useLenis((l) => setShowTop(l.scroll > 800));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={rootRef}
      data-page-layer=""
      className="fixed right-(--gutter) bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex flex-col items-end gap-2 lg:bottom-16"
    >
      <button
        type="button"
        onClick={() => goTo("#home")}
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={cn(
          "group/roll flex h-11 items-center border border-foreground bg-background px-4 text-ui font-medium uppercase text-foreground transition-[opacity,transform] duration-200 ease-tonalli",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <RollingText text="Back to top" />
      </button>

      {open && (
        <div id="contact-options" role="group" aria-label="Contact options" className="w-60 border border-foreground bg-background text-foreground">
          <button
            type="button"
            disabled={!whatsappReady}
            onClick={() => {
              openWhatsApp(encodeURIComponent(`Hi ${siteConfig.name}, I'd like to enquire about ${siteConfig.product}.`));
              close();
            }}
            className={itemClass}
          >
            <RollingText text={siteConfig.cta.whatsapp} />
            {!whatsappReady && <span className="text-label normal-case">Coming soon</span>}
          </button>
          <a href={`tel:${siteConfig.contact.phone}`} onClick={close} className={itemClass}>
            <RollingText text="Call us" />
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} onClick={close} className={itemClass}>
            <RollingText text="E-mail us" />
          </a>
          <button
            type="button"
            onClick={() => {
              close();
              goTo("#contact");
            }}
            className={cn(itemClass, "border-t border-foreground")}
          >
            <RollingText text={siteConfig.cta.primary} />
          </button>
        </div>
      )}

      <button
        ref={toggleRef}
        type="button"
        aria-label="Contact options"
        aria-expanded={open}
        aria-controls="contact-options"
        onClick={() => setOpen((v) => !v)}
        className="flex size-14 items-center justify-center bg-foreground text-background transition-transform duration-150 active:scale-95"
      >
        <CrossIcon className={cn("size-3.5 transition-transform duration-300 ease-tonalli", open && "rotate-45")} />
      </button>
    </div>
  );
}
