"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { StudioLights, createRandom, createSeedGeometry, useReducedMotion } from "./shared";

const STREAM_COUNT = 1400;
const MOUND_COUNT = 2200;
const TOP = 2.1;
const MOUND_RADIUS = 0.95;
const MOUND_HEIGHT = 0.55;
const SIZE = 0.028;

const moundHeight = (r: number) => MOUND_HEIGHT * Math.max(0, 1 - r / MOUND_RADIUS);

function Mound({ geometry }: { geometry: THREE.BufferGeometry }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const rand = createRandom(11);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < MOUND_COUNT; i++) {
      const r = Math.sqrt(rand()) * MOUND_RADIUS;
      const a = rand() * Math.PI * 2;
      dummy.position.set(Math.cos(a) * r, moundHeight(r) - rand() * SIZE * 2 - 1, Math.sin(a) * r);
      dummy.rotation.set(rand() * 6.28, rand() * 6.28, rand() * 6.28);
      dummy.scale.setScalar(SIZE * (0.85 + rand() * 0.3));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, MOUND_COUNT]}>
      <meshStandardMaterial color="#5f6168" roughness={0.6} />
    </instancedMesh>
  );
}

interface Particle {
  x: number;
  z: number;
  y: number;
  vy: number;
  spin: number;
  spinRate: number;
  scale: number;
  drift: number;
}

function createParticles(): Particle[] {
  const rand = createRandom(7);
  return Array.from({ length: STREAM_COUNT }, () => ({
    x: (rand() - 0.5) * 0.09,
    z: (rand() - 0.5) * 0.09,
    y: -1 + rand() * (TOP + 1),
    vy: 0.4 + rand() * 0.5,
    spin: rand() * 6.28,
    spinRate: (rand() - 0.5) * 8,
    scale: SIZE * (0.85 + rand() * 0.3),
    drift: rand() * 6.28,
  }));
}

function Stream({ geometry }: { geometry: THREE.BufferGeometry }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reduced = useReducedMotion();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    if (particlesRef.current.length === 0) particlesRef.current = createParticles();
    const particles = particlesRef.current;
    const dt = reduced ? 0 : Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.vy += 2.4 * dt;
      p.y -= p.vy * dt;
      p.spin += p.spinRate * dt;
      const spread = THREE.MathUtils.clamp((TOP - p.y) / 3, 0, 1);
      const x = p.x * (1 + spread * 1.6) + Math.sin(t * 1.3 + p.drift) * 0.012 * spread;
      const z = p.z * (1 + spread * 1.6);
      const floor = moundHeight(Math.hypot(x, z)) - 1;

      if (p.y < floor) {
        p.y = TOP + (p.vy % 0.3);
        p.vy = 0.4 + ((p.drift * 13.37) % 0.5);
      }

      dummy.position.set(x, p.y, z);
      dummy.rotation.set(p.spin, p.spin * 0.7, p.spin * 0.3);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, STREAM_COUNT]} frustumCulled={false}>
      <meshStandardMaterial color="#6b6e76" roughness={0.55} />
    </instancedMesh>
  );
}

function Rig() {
  const target = useMemo(() => new THREE.Vector3(0, 0.1, 0), []);
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.3, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.15 + state.pointer.y * 0.15, 0.03);
    state.camera.lookAt(target);
  });
  return null;
}

export default function SeedStreamScene({ active }: { active: boolean }) {
  const geometry = useMemo(() => createSeedGeometry(), []);
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 4.4], fov: 32 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 4, 8]} />
      <StudioLights keyColor="#ffffff" intensity={0.8} />
      <spotLight position={[0, 5, 0.5]} angle={0.3} penumbra={0.7} intensity={60} decay={2} color="#ffffff" />
      <Stream geometry={geometry} />
      <Mound geometry={geometry} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      <Rig />
    </Canvas>
  );
}
