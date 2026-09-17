"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduced, anchors: false, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
