"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Keeps ScrollTrigger in step with Lenis on every smooth-scroll frame.
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
// Off for reduced motion. Touch devices keep native scrolling (syncTouch: false).
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // Look the instance up on every tick: Lenis is created asynchronously by <ReactLenis>.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [enabled]);

  if (!enabled) return <>{children}</>;
  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: { offset: -80 } }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
