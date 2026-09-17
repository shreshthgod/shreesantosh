"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 }, autoRaf: true }}>
      {children}
    </ReactLenis>
  );
}
