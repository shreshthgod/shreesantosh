"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { StudioLights, useReducedMotion } from "./shared";

const PROFILE_KEYS: [number, number][] = [
  [0.07, -1.32],
  [0.14, -1.22],
  [0.32, -1.04],
  [0.58, -0.8],
  [0.82, -0.46],
  [0.95, -0.1],
  [0.97, 0.2],
  [0.88, 0.44],
  [0.7, 0.58],
  [0.46, 0.64],
  [0.001, 0.66],
];

function createPodGeometry() {
  const curve = new THREE.CatmullRomCurve3(PROFILE_KEYS.map(([x, y]) => new THREE.Vector3(x, y, 0)));
  const points = curve.getSpacedPoints(80).map((p) => new THREE.Vector2(Math.max(p.x, 0.001), p.y));
  const geometry = new THREE.LatheGeometry(points, 128);
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    const ribStrength = THREE.MathUtils.smoothstep(v.y, -1.15, -0.7) * (1 - THREE.MathUtils.smoothstep(v.y, 0.4, 0.62));
    const scale = 1 + 0.035 * Math.cos(10 * theta) * ribStrength;
    pos.setXYZ(i, v.x * scale, v.y, v.z * scale);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Stigmatic disc: a shallow dome with ridges radiating flat across its surface.
function Crown({ material }: { material: THREE.Material }) {
  const ridges = useMemo(() => Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2 + Math.PI / 10), []);
  return (
    <group position={[0, 0.6, 0]}>
      <mesh material={material} scale={[1, 0.28, 1]}>
        <sphereGeometry args={[0.66, 64, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      {ridges.map((angle) => (
        <group key={angle} rotation={[0, angle, 0]}>
          <mesh material={material} position={[0.33, 0.13, 0]} rotation={[0, 0, Math.PI / 2 + 0.28]}>
            <capsuleGeometry args={[0.03, 0.5, 6, 16]} />
          </mesh>
        </group>
      ))}
      <mesh material={material} position={[0, 0.2, 0]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.08, 24, 16]} />
      </mesh>
    </group>
  );
}

function Pod() {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const aspect = useThree((s) => s.viewport.aspect);
  const geometry = useMemo(() => createPodGeometry(), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d9d6cf",
        roughness: 0.55,
        clearcoat: 0.3,
        clearcoatRoughness: 0.6,
      }),
    []
  );

  const scale = THREE.MathUtils.clamp(aspect * 0.75, 0.55, 0.9);
  const baseY = aspect < 1 ? 0.55 : 0.1;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    if (!reduced) {
      g.rotation.y += delta * 0.15;
      g.position.y = baseY + Math.sin(t * 0.6) * 0.04;
    }
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.18 - state.pointer.y * 0.15, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.15, 0.04);
  });

  return (
    <group ref={group} position={[0, baseY, 0]} scale={scale}>
      <mesh geometry={geometry} material={material} />
      <Crown material={material} />
      <mesh material={material} position={[0, -2.95, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 3.3, 24]} />
      </mesh>
    </group>
  );
}

export default function PoppyPodScene({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 5.6], fov: 30 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 11]} />
      <StudioLights keyColor="#f4f1ea" intensity={0.9} />
      <Pod />
    </Canvas>
  );
}
