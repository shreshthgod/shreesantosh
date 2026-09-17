"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { StudioLights, createRandom, createSeedGeometry, useReducedMotion } from "./shared";

export type SeedFieldVariant = "cool" | "warm" | "white" | "pile";

interface VariantConfig {
  seed: string;
  bg: string;
  key: string;
  light: number;
  count: number;
  radius: number;
  height: number;
  size: number;
  camera: [number, number, number];
  target: [number, number, number];
  fov: number;
  orbit: boolean;
  randomSeed: number;
}

// Indian poppy seed (khus khus) reads cream to pale tan; each grade gets its own light and tone.
const VARIANTS: Record<SeedFieldVariant, VariantConfig> = {
  cool: { seed: "#c9bda4", bg: "#0b0c0e", key: "#e6eeff", light: 0.9, count: 4200, radius: 1.1, height: 0.22, size: 0.028, camera: [0, 0.95, 0.95], target: [0, 0.05, -0.15], fov: 26, orbit: false, randomSeed: 101 },
  warm: { seed: "#c4a97f", bg: "#170f08", key: "#ffb46b", light: 1, count: 4200, radius: 1.1, height: 0.22, size: 0.028, camera: [0.15, 0.9, 1.0], target: [0, 0.05, -0.15], fov: 26, orbit: false, randomSeed: 202 },
  white: { seed: "#f1eee6", bg: "#f1eee8", key: "#ffffff", light: 0.7, count: 4200, radius: 1.1, height: 0.22, size: 0.028, camera: [0, 0.95, 0.95], target: [0, 0.05, -0.15], fov: 26, orbit: false, randomSeed: 303 },
  pile: { seed: "#b8a78a", bg: "#131313", key: "#f2f2f2", light: 1, count: 3600, radius: 0.95, height: 0.75, size: 0.026, camera: [0, 1.1, 3.1], target: [0, 0.25, 0], fov: 28, orbit: true, randomSeed: 404 },
};

function Seeds({ config }: { config: VariantConfig }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => createSeedGeometry(), []);
  const [count] = useState(() => Math.round(config.count * (window.innerWidth < 768 ? 0.6 : 1)));

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const rand = createRandom(config.randomSeed);
    const dummy = new THREE.Object3D();
    const base = new THREE.Color(config.seed);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const r = Math.sqrt(rand()) * config.radius;
      const angle = rand() * Math.PI * 2;
      const t = r / config.radius;
      const falloff = config.orbit ? Math.max(0, 1 - t) : Math.pow(Math.max(0, 1 - t * t), 1.5);
      const y = config.height * falloff - rand() * config.size * 2;

      dummy.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      dummy.rotation.set((rand() - 0.5) * 1.2, rand() * Math.PI * 2, (rand() - 0.5) * 1.2);
      dummy.scale.setScalar(config.size * (0.85 + rand() * 0.3));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);

      color.copy(base).offsetHSL((rand() - 0.5) * 0.02, (rand() - 0.5) * 0.06, (rand() - 0.5) * 0.1);
      m.setColorAt(i, color);
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [config, count]);

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
      <meshStandardMaterial roughness={0.7} metalness={0} />
    </instancedMesh>
  );
}

function CameraRig({ config }: { config: VariantConfig }) {
  const reduced = useReducedMotion();
  const target = useMemo(() => new THREE.Vector3(...config.target), [config]);

  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const [cx, cy, cz] = config.camera;
    if (config.orbit) {
      const radius = Math.hypot(cx, cz);
      const a = t * 0.08;
      state.camera.position.set(Math.sin(a) * radius + state.pointer.x * 0.15, cy + state.pointer.y * 0.1, Math.cos(a) * radius);
    } else {
      state.camera.position.set(cx + Math.sin(t * 0.1) * 0.08 + state.pointer.x * 0.04, cy + state.pointer.y * 0.03, cz + Math.cos(t * 0.08) * 0.05);
    }
    state.camera.lookAt(target);
  });

  return null;
}

export default function SeedFieldScene({ variant, active }: { variant: SeedFieldVariant; active: boolean }) {
  const config = VARIANTS[variant];
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: config.camera, fov: config.fov, near: 0.05, far: 20 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[config.bg]} />
      <fog attach="fog" args={[config.bg, config.orbit ? 3.2 : 1.1, config.orbit ? 6.5 : 2.6]} />
      <StudioLights keyColor={config.key} intensity={config.light} />
      <Seeds config={config} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={config.bg} roughness={1} />
      </mesh>
      <CameraRig config={config} />
    </Canvas>
  );
}
