"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/*
 * Hero "pod to seeds" scroll story.
 * Desktop (>=1024px wide and >=700px tall): the hero pins for 120% of a screen and everything is scrubbed.
 * Mobile: no pin; the same story runs lighter while the hero scrolls away (native touch scrolling).
 * Reduced motion: nothing runs.
 *
 * Required markup inside the section (root):
 *   [data-hero-copy]    left text column wrapper (must NOT have a CSS animation class)
 *   [data-hero-visual]  right visual column wrapper (must NOT have a CSS animation class)
 *   [data-hero-pod]     the pod <Image> (rotates and zooms inside its arch)
 *   [data-hero-chip]    floating labels (drift apart)
 *   canvas[data-hero-seeds]
 */

type Seed = { angle: number; speed: number; delay: number; spin: number; size: number; drift: number; tone: number };

// Deterministic random, so scrubbing backwards retraces exactly the same seeds.
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeSeeds(count: number): Seed[] {
  const rand = mulberry32(20260920);
  return Array.from({ length: count }, () => ({
    angle: -Math.PI / 2 + (rand() - 0.5) * Math.PI * 1.1, // mostly upward fan
    speed: 0.35 + rand() * 0.75,
    delay: rand() * 0.4,
    spin: (rand() - 0.5) * 12,
    size: 2.6 + rand() * 2.2,
    drift: (rand() - 0.5) * 0.25,
    tone: rand(),
  }));
}

export function useHeroScroll(root: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const canvas = q("[data-hero-seeds]")[0] as HTMLCanvasElement | undefined;
      const pod = q("[data-hero-pod]")[0] as HTMLElement | undefined;
      const ctx2d = canvas?.getContext("2d");

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference), (max-height: 699.98px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const desktop = Boolean(ctx.conditions?.desktop);
          const seeds = makeSeeds(desktop ? 220 : 70);
          let width = 0;
          let height = 0;
          let origin = { x: 0, y: 0 };
          let lastProgress = 0;

          const measure = () => {
            if (!canvas || !ctx2d) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = section.clientWidth;
            height = section.clientHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (pod) {
              const s = section.getBoundingClientRect();
              const p = pod.getBoundingClientRect();
              // Seeds leave from the crown of the pod (about 22% down the image).
              origin = { x: p.left - s.left + p.width / 2, y: p.top - s.top + p.height * 0.22 };
            }
            draw(lastProgress);
          };

          const draw = (progress: number) => {
            lastProgress = progress;
            if (!ctx2d) return;
            ctx2d.clearRect(0, 0, width, height);
            const reach = Math.min(width, 1400);
            for (const seed of seeds) {
              const t = gsap.utils.clamp(0, 1, (progress - seed.delay) / 0.6);
              if (t <= 0) continue;
              const x = origin.x + Math.cos(seed.angle) * seed.speed * t * reach * 0.32 + seed.drift * t * reach * 0.4;
              const y = origin.y + Math.sin(seed.angle) * seed.speed * t * height * 0.35 + t * t * height * 0.95;
              if (y > height + 10) continue;
              const alpha = Math.min(1, t * 6) * (t > 0.8 ? 1 - (t - 0.8) * 2.5 : 1);
              ctx2d.save();
              ctx2d.translate(x, y);
              ctx2d.rotate(seed.spin * t);
              ctx2d.globalAlpha = Math.max(0, alpha);
              ctx2d.fillStyle = seed.tone > 0.7 ? "#d4ae5e" : seed.tone > 0.35 ? "#efe6d2" : "#d9d2c1";
              ctx2d.beginPath();
              ctx2d.ellipse(0, 0, seed.size, seed.size * 0.62, 0, 0, Math.PI * 2);
              ctx2d.fill();
              ctx2d.restore();
            }
          };

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: desktop ? "+=120%" : "bottom top",
              pin: desktop,
              scrub: desktop ? 0.8 : 0.5,
              invalidateOnRefresh: true,
              onRefresh: measure,
              onUpdate: (self) => draw(self.progress),
            },
          });

          tl.to(q("[data-hero-copy]"), { y: desktop ? -90 : -40, opacity: desktop ? 0 : 0.35, duration: 0.55 }, 0)
            .to(q("[data-hero-visual]"), { y: desktop ? -30 : -20, scale: desktop ? 0.92 : 0.96, duration: 1 }, 0)
            .to(q("[data-hero-pod]"), { rotate: -10, scale: 1.14, yPercent: 4, duration: 0.6 }, 0)
            .to(q("[data-hero-chip]"), { y: (i) => (i % 2 ? 40 : -40), opacity: 0, duration: 0.5, stagger: 0.05 }, 0.1);

          measure();
          window.addEventListener("resize", measure);
          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => {
            window.removeEventListener("resize", measure);
            ctx2d?.clearRect(0, 0, width, height);
          };
        }
      );
    },
    { scope: root }
  );
}
