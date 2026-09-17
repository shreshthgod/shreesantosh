# 3D Models Specification (replacement for source CGI video)

## Overview
- **Target files:** `src/components/three/*.tsx`
- **Why replaced:** every source media file is a pre-rendered CGI film made for a third-party luxury client (YSL, Miu Miu, Ralph Lauren, LV, Azzaro, Balenciaga, L'Oréal). These are copyrighted client works and brand marks, so they are not reused. The replacements are original procedural real-time models that match the source's art direction:
  - monochrome or single-hue grading
  - studio softbox lighting
  - macro product framing
  - slow continuous motion
- **Interaction model:** time-driven (continuous animation) + subtle pointer parallax. Canvases mount only while within 1 viewport of the screen.

## Shared rendering rules
- `<Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: false }} camera={{ fov: 30 }}>`
- Lighting uses no network HDRIs. The environment is built procedurally from drei `<Environment>` + `<Lightformer>` softboxes, so there are no external fetches.
- Tone mapping: ACESFilmic. Background uses a solid color per scene, and `fog` matches the background.
- Respect `prefers-reduced-motion`: freeze time-based rotation.

## Models
### PoppyPod (hero)
- Capsule body: `LatheGeometry` profile. Radius peaks ~1.0 at y 0.1, narrows to 0.35 at the neck (y -1.1), then flares to the stem.
- Longitudinal ribs: radial displacement `r *= 1 + 0.035 * cos(12θ)`.
- Crown (stigmatic disc) at the top: a flattened cylinder r 0.62, h 0.08, plus 12 radial ridges (thin rounded boxes) radiating from the center and slightly domed.
- Stem: tapered cylinder going down out of frame.
- Material: `MeshPhysicalMaterial`, color #d9d6cf, roughness 0.55, clearcoat 0.3 (matte clay look, like the source's white 3D-printed form)
- Scene background #050505; key softbox top-left, rim light right
- Motion: rotation.y += 0.15·dt; float bob ±0.04; pointer tilt ±0.15 rad

### SeedMacro (grades)
- Seed geometry: a kidney shape. Sphere (1, 20, 14) scaled (1, 0.78, 0.62), with the x-axis bent by 0.25·y² so it curves.
- Seed size ≈0.9mm in world units 0.05; 2,400 instances (`InstancedMesh`) scattered on a gentle mound with random rotations
- The camera is low and close, with a narrow fov of 22 for a macro look. Seeds drift slowly and the camera dollies slowly (sin, ±0.1).
- Variants:
  - **slate** (King): seed #5d6470, bg #0b0c0e, cool key
  - **warm** (Shubh Laxmi): seed #6f665c, bg #1a130c, amber key #ffb46b
  - **white** (White Tinopal): seed #e9e4d8, bg #efece6, soft white key; light scene, so the difference label reads black

### SeedPile (Shri)
- 3,200 instances forming a cone pile (height from radius falloff) on a plane of the same hue; bg #151515
- The camera orbits slowly around the pile at 0.08 rad/s

### SackStack (bulk packaging)
- Three jute sacks, each a rounded box (drei `RoundedBox`) with a low-frequency noise vertex displacement.
- The top is gathered using a lathe "neck" with a tie band.
- Material: roughness 0.95, color #b9a88a, with a procedural jute weave (`CanvasTexture`, 256px crosshatch) as the bump map
- Bg #0e0d0b; slow camera orbit

### SeedStream (farm to export)
- 1,500 seeds falling in a narrow stream from top to bottom, respawning at the top with slight turbulence; they accumulate on a floor mound.
- Bg #000; a single hard key light from above makes a thin silhouette
