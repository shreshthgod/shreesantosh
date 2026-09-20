"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { siteConfig } from "@/data/site-config";
import { WORDMARK_LINE1_SIZE } from "@/components/sections/site-header";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/*
 * Company-name intro.
 * 1. Name letters rise from masks in the centre of the screen, "TRADERS" settles, a gold line draws.
 * 2. The name flies into the exact position of the header logo while the green curtain fades.
 * 3. The hero entrance starts as the flight begins (html[data-hero] is removed).
 *
 * Plays once per browser session. Skipped for reduced motion and when JavaScript is off.
 * The inline script in layout.tsx sets html[data-intro] before first paint, so there is no flash.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  // Lenis is created after this component mounts, so stop it as soon as it exists.
  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && document.documentElement.dataset.intro === "play") lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.dataset.intro !== "play") {
        setDone(true);
        return;
      }

      const q = gsap.utils.selector(root);
      const mark = q("[data-intro-mark]")[0] as HTMLElement;
      const target = document.querySelector<HTMLElement>(".header-wordmark");
      window.scrollTo(0, 0);

      // Start position: centred and scaled up. End position: exactly on the header logo (x 0, y 0, scale 1).
      const place = () => {
        if (!target) return { x: 0, y: 0, scale: 1 };
        const r = target.getBoundingClientRect();
        mark.style.left = `${r.left}px`;
        mark.style.top = `${r.top}px`;
        const scale = Math.min(4, (window.innerWidth * 0.78) / r.width);
        return {
          x: (window.innerWidth - r.width * scale) / 2 - r.left,
          y: (window.innerHeight - r.height * scale) / 2 - r.top,
          scale,
        };
      };
      const start = place();

      const finish = () => {
        delete html.dataset.intro;
        lenisRef.current?.start();
        setDone(true);
      };

      lenisRef.current?.stop();
      gsap.set(mark, { ...start, transformOrigin: "0 0" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
      tl.from(q("[data-intro-char]"), { yPercent: 115, duration: 0.8, stagger: 0.045 })
        .from(q("[data-intro-line2]"), { opacity: 0, letterSpacing: "0.9em", duration: 0.8 }, 0.35)
        .from(q("[data-intro-rule]"), { scaleX: 0, duration: 0.6, ease: "power3.inOut" }, 0.55)
        .addLabel("fly", 1.3)
        .call(
          () => {
            delete html.dataset.hero; // hero entrance plays now
            try {
              sessionStorage.setItem("ss-intro", "1");
            } catch {}
          },
          [],
          "fly"
        )
        .to(q("[data-intro-rule]"), { opacity: 0, duration: 0.3 }, "fly")
        .to(mark, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.inOut" }, "fly")
        .to(q("[data-intro-curtain]"), { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "fly+=0.25");

      // Safety net: never leave a visitor behind the curtain.
      const guard = window.setTimeout(() => tl.progress(1), 4000);
      return () => window.clearTimeout(guard);
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} aria-hidden="true" className="intro fixed inset-0 z-[70]">
      <div data-intro-curtain className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,#1e4d3b_0%,#12372a_55%,#0b2419_100%)]" />
      <div data-intro-mark className="fixed text-cream">
        <span className="flex flex-col leading-none">
          <span className={cn("flex overflow-hidden pb-[0.08em] font-serif font-semibold uppercase tracking-[0.08em]", WORDMARK_LINE1_SIZE)}>
            {Array.from(siteConfig.wordmark.line1).map((char, i) => (
              <span key={i} data-intro-char className="inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </span>
          <span data-intro-line2 className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.42em] opacity-80">
            {siteConfig.wordmark.line2}
          </span>
          <span data-intro-rule className="mt-2 block h-px w-full origin-left bg-gold" />
        </span>
      </div>
    </div>
  );
}
