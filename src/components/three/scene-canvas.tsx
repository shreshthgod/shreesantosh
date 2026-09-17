"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { cn } from "@/lib/utils";
import type { SceneFrameloop } from "./shared";

const PoppyPodScene = dynamic(() => import("./poppy-pod-scene"), { ssr: false });
const SeedFieldScene = dynamic(() => import("./seed-field-scene"), { ssr: false });
const SackStackScene = dynamic(() => import("./sack-stack-scene"), { ssr: false });
const SeedStreamScene = dynamic(() => import("./seed-stream-scene"), { ssr: false });

export type SceneName = "pod" | "seeds-cool" | "seeds-warm" | "seeds-white" | "seeds-pile" | "sacks" | "stream";

export const scenes: Record<SceneName, { background: string; tone: "dark" | "light" }> = {
  pod: { background: "#050505", tone: "dark" },
  "seeds-cool": { background: "#0b0c0e", tone: "dark" },
  "seeds-warm": { background: "#170f08", tone: "dark" },
  "seeds-white": { background: "#cfc9bd", tone: "light" },
  "seeds-pile": { background: "#131313", tone: "dark" },
  sacks: { background: "#0e0d0b", tone: "dark" },
  stream: { background: "#000000", tone: "dark" },
};

function renderScene(name: SceneName, frameloop: SceneFrameloop) {
  switch (name) {
    case "pod":
      return <PoppyPodScene frameloop={frameloop} />;
    case "seeds-cool":
      return <SeedFieldScene variant="cool" frameloop={frameloop} />;
    case "seeds-warm":
      return <SeedFieldScene variant="warm" frameloop={frameloop} />;
    case "seeds-white":
      return <SeedFieldScene variant="white" frameloop={frameloop} />;
    case "seeds-pile":
      return <SeedFieldScene variant="pile" frameloop={frameloop} />;
    case "sacks":
      return <SackStackScene frameloop={frameloop} />;
    case "stream":
      return <SeedStreamScene frameloop={frameloop} />;
  }
}

class SceneErrorBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Mount within one viewport of the screen (so scenes are warm when they arrive), render
// frames only while on screen, and render a single still frame for reduced motion.
export function SceneCanvas({ name, className }: { name: SceneName; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const supported = useWebGLSupport();
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !supported) return;
    const nearObserver = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "100% 0px",
    });
    const visibleObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    nearObserver.observe(node);
    visibleObserver.observe(node);
    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, [supported]);

  const frameloop: SceneFrameloop = !visible ? "never" : reduced ? "demand" : "always";

  return (
    <div ref={ref} aria-hidden="true" className={cn("absolute inset-0", className)} style={{ backgroundColor: scenes[name].background }}>
      {supported && near && <SceneErrorBoundary>{renderScene(name, frameloop)}</SceneErrorBoundary>}
    </div>
  );
}
