"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const PoppyPodScene = dynamic(() => import("./poppy-pod-scene"), { ssr: false });
const SeedFieldScene = dynamic(() => import("./seed-field-scene"), { ssr: false });
const SackStackScene = dynamic(() => import("./sack-stack-scene"), { ssr: false });
const SeedStreamScene = dynamic(() => import("./seed-stream-scene"), { ssr: false });

export type SceneName = "pod" | "seeds-cool" | "seeds-warm" | "seeds-white" | "seeds-pile" | "sacks" | "stream";

export const sceneBackground: Record<SceneName, string> = {
  pod: "#050505",
  "seeds-cool": "#0b0c0e",
  "seeds-warm": "#170f08",
  "seeds-white": "#f1eee8",
  "seeds-pile": "#131313",
  sacks: "#0e0d0b",
  stream: "#000000",
};

function renderScene(name: SceneName, active: boolean) {
  switch (name) {
    case "pod":
      return <PoppyPodScene active={active} />;
    case "seeds-cool":
      return <SeedFieldScene variant="cool" active={active} />;
    case "seeds-warm":
      return <SeedFieldScene variant="warm" active={active} />;
    case "seeds-white":
      return <SeedFieldScene variant="white" active={active} />;
    case "seeds-pile":
      return <SeedFieldScene variant="pile" active={active} />;
    case "sacks":
      return <SackStackScene active={active} />;
    case "stream":
      return <SeedStreamScene active={active} />;
  }
}

// Without WebGL the page must still work: fall back to the plain scene background.
class SceneErrorBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Mount within one viewport of the screen (so scenes are warm when they arrive),
// but only render frames while actually on screen.
export function SceneCanvas({ name, className }: { name: SceneName; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
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
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={cn("absolute inset-0", className)} style={{ backgroundColor: sceneBackground[name] }}>
      {near && <SceneErrorBoundary>{renderScene(name, visible)}</SceneErrorBoundary>}
    </div>
  );
}
