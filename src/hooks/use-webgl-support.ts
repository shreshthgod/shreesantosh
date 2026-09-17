"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | null = null;

function detect() {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

const noopSubscribe = () => () => {};

// Checked before mounting any <Canvas>, so unsupported devices never hit a context error.
export function useWebGLSupport() {
  return useSyncExternalStore(noopSubscribe, detect, () => false);
}
