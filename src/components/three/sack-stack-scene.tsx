"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { StudioLights, createRandom, useReducedMotion, type SceneFrameloop } from "./shared";

function createJuteTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const rand = createRandom(42);
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < size; i += 8) {
    ctx.fillStyle = `rgba(255,255,255,${0.18 + rand() * 0.12})`;
    ctx.fillRect(0, i, size, 4);
    ctx.fillStyle = `rgba(0,0,0,${0.2 + rand() * 0.12})`;
    ctx.fillRect(i, 0, 3, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 8);
  return texture;
}

function createLabelTexture(weight: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, 512, 384);
  ctx.fillStyle = "rgba(20,18,15,0.82)";
  ctx.textAlign = "center";
  ctx.font = "300 58px Futura, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("SHRISANTOSH", 256, 120);
  ctx.font = "500 30px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("POPPY SEEDS · SUPER FINE", 256, 190);
  ctx.fillRect(96, 222, 320, 3);
  ctx.font = "500 92px 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(weight, 256, 330);
  return new THREE.CanvasTexture(canvas);
}

function createSackGeometry(seed: number) {
  const geometry = new RoundedBoxGeometry(1, 1.4, 0.72, 10, 0.3);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  const rand = createRandom(seed);
  const phase = rand() * Math.PI * 2;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const bottomBulge = 1 + 0.14 * THREE.MathUtils.smoothstep(-v.y, -0.2, 0.7);
    const topPinch = 1 - 0.18 * THREE.MathUtils.smoothstep(v.y, 0.3, 0.7);
    const wrinkle = 1 + 0.03 * Math.sin(v.x * 7 + v.y * 5 + phase) * Math.cos(v.z * 6 + v.y * 9);
    pos.setXYZ(i, v.x * bottomBulge * topPinch * wrinkle, v.y, v.z * bottomBulge * topPinch * wrinkle);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Gathered neck: flows from the sack shoulder into a tie and a short frilled top.
function createNeckGeometry() {
  const keys: [number, number][] = [
    [0.34, 0.0],
    [0.24, 0.07],
    [0.11, 0.15],
    [0.085, 0.2],
    [0.1, 0.25],
    [0.17, 0.33],
    [0.19, 0.36],
    [0.001, 0.34],
  ];
  const curve = new THREE.CatmullRomCurve3(keys.map(([x, y]) => new THREE.Vector3(x, y, 0)));
  const points = curve.getSpacedPoints(40).map((p) => new THREE.Vector2(Math.max(p.x, 0.001), p.y));
  const geometry = new THREE.LatheGeometry(points, 48);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    const folds = 1 + 0.12 * Math.sin(theta * 14) * THREE.MathUtils.smoothstep(v.y, 0.02, 0.15);
    pos.setXYZ(i, v.x * folds, v.y, v.z * folds);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function Sack({
  position,
  rotation,
  seed,
  weight,
  jute,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  seed: number;
  weight?: string;
  jute: THREE.Texture | null;
}) {
  const geometry = useMemo(() => createSackGeometry(seed), [seed]);
  const neck = useMemo(() => createNeckGeometry(), []);
  const label = useMemo(() => (weight ? createLabelTexture(weight) : null), [weight]);

  return (
    <group position={position} rotation={rotation}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#b9a88a" roughness={0.95} bumpMap={jute ?? undefined} bumpScale={0.6} map={jute ?? undefined} />
      </mesh>
      <mesh geometry={neck} position={[0, 0.62, 0]}>
        <meshStandardMaterial color="#ad9d80" roughness={0.95} bumpMap={jute ?? undefined} bumpScale={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.83, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.095, 0.022, 10, 32]} />
        <meshStandardMaterial color="#4a3f30" roughness={0.8} />
      </mesh>
      {label && (
        <mesh position={[0, -0.05, 0.43]}>
          <planeGeometry args={[0.78, 0.585]} />
          <meshStandardMaterial map={label} transparent roughness={1} depthWrite={false} />
        </mesh>
      )}
    </group>
  );
}

function Stack() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const jute = useMemo(() => createJuteTexture(), []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    g.rotation.y = -0.35 + Math.sin(t * 0.12) * 0.25 + state.pointer.x * 0.08;
  });

  return (
    <group ref={group} position={[0, -1.05, 0]}>
      <Sack position={[-0.58, 0.7, 0]} rotation={[0, 0.12, 0.02]} seed={1} weight="50 KG" jute={jute} />
      <Sack position={[0.6, 0.7, -0.1]} rotation={[0, -0.18, -0.03]} seed={2} weight="25 KG" jute={jute} />
      <Sack position={[0.02, 1.78, -0.2]} rotation={[Math.PI / 2 - 0.08, 0.35, 0]} seed={3} jute={jute} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0e0d0b" roughness={1} />
      </mesh>
    </group>
  );
}

export default function SackStackScene({ frameloop }: { frameloop: SceneFrameloop }) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.0, 6.4], fov: 30 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#0e0d0b"]} />
      <fog attach="fog" args={["#0e0d0b", 6, 12]} />
      <StudioLights keyColor="#ffe2b8" intensity={1} />
      <Stack />
    </Canvas>
  );
}
