"use client";

/**
 * Lighting config for the Ripple Earth scene.
 *
 * The palette mixes cool starlight (ambient / hemisphere) with a warm
 * directional key and a cool rim fill to give the globe depth.
 */

export const AMBIENT_LIGHT = {
  intensity: 1.2,
  color: "#222244",
} as const;

export const DIRECTIONAL_LIGHT = {
  position: [5, 3, 5] as [number, number, number],
  intensity: 1.4,
  color: "#ffeedd",
} as const;

/** Subtle fill from below to lift the shadow side */
export const HEMISPHERE_LIGHT = {
  skyColor: "#4466aa",
  groundColor: "#222233",
  intensity: 0.6,
} as const;

/** Cool back-rim for the atmosphere glow */
export const RIM_LIGHT = {
  position: [-4, -1, -3] as [number, number, number],
  intensity: 0.6,
  color: "#4488ff",
} as const;

// Convenience lookup
export const LIGHT_CONFIGS = {
  ambient: AMBIENT_LIGHT,
  directional: DIRECTIONAL_LIGHT,
  hemisphere: HEMISPHERE_LIGHT,
  rim: RIM_LIGHT,
} as const;

// ---------------------------------------------------------------------------
// R3F component – renders all scene lights
// ---------------------------------------------------------------------------

export function SceneLights() {
  return (
    <>
      <ambientLight
        intensity={AMBIENT_LIGHT.intensity}
        color={AMBIENT_LIGHT.color}
      />
      <directionalLight
        position={DIRECTIONAL_LIGHT.position}
        intensity={DIRECTIONAL_LIGHT.intensity}
        color={DIRECTIONAL_LIGHT.color}
      />
      <hemisphereLight
        args={[HEMISPHERE_LIGHT.skyColor, HEMISPHERE_LIGHT.groundColor, HEMISPHERE_LIGHT.intensity]}
      />
      <directionalLight
        position={RIM_LIGHT.position}
        intensity={RIM_LIGHT.intensity}
        color={RIM_LIGHT.color}
      />
    </>
  );
}
