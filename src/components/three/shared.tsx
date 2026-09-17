"use client";

import { useSyncExternalStore } from "react";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";

export function createRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Kidney-shaped poppy seed: flattened ellipsoid bent along its long axis.
export function createSeedGeometry() {
  const geometry = new THREE.SphereGeometry(1, 12, 8);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.set(v.x, v.y * 0.78, v.z * 0.55);
    // Bend along the long axis and pinch the inner edge to read as a kidney.
    v.y -= 0.42 * v.x * v.x;
    if (v.y < -0.2) v.y += 0.18 * (1 - Math.abs(v.x));
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function StudioLights({ keyColor = "#ffffff", intensity = 1 }: { keyColor?: string; intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.12 * intensity} />
      <directionalLight position={[-3, 5, 3]} intensity={2.2 * intensity} color={keyColor} />
      <directionalLight position={[4, 1.5, -3]} intensity={0.9 * intensity} color="#ffffff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3 * intensity} color={keyColor} position={[-3, 4, 3]} scale={[5, 2.5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.4 * intensity} position={[4, 1, -3]} scale={[1.2, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={0.6 * intensity} position={[0, -3, 2]} scale={2} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}
