"use client";

import { Effect, BlendFunction } from "postprocessing";
import { Uniform, Vector2 } from "three";

// ---------------------------------------------------------------------------
// Chromatic aberration fragment shader
// Separates R/G/B channels radially from centre
// ---------------------------------------------------------------------------
const chromaticFragment = `
uniform float uIntensity;
uniform float uDistortion;
uniform vec2  uCenter;
uniform float uRadialModulate;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 dir = uv - uCenter;
  float dist = length(dir);
  vec2 dirN = dist > 0.0 ? dir / dist : vec2(0.0);

  // Radial modulation makes aberration stronger at edges
  float radialFactor = 1.0 + uRadialModulate * dist;
  float offset = uIntensity * radialFactor;

  // Per-channel shift
  float rOffset = offset * (1.0 + uDistortion);
  float gOffset = offset;
  float bOffset = offset * (1.0 - uDistortion);

  vec2 rUv = uv + dirN * rOffset;
  vec2 gUv = uv + dirN * gOffset;
  vec2 bUv = uv + dirN * bOffset;

  float r = texture2D(uInputBuffer, rUv).r;
  float g = texture2D(uInputBuffer, gUv).g;
  float b = texture2D(uInputBuffer, bUv).b;

  outputColor = vec4(r, g, b, inputColor.a);
}
`;

// ---------------------------------------------------------------------------
// Custom ChromaticAberrationEffect
// ---------------------------------------------------------------------------
export class CustomChromaticEffect extends Effect {
  constructor(
    intensity = 0.005,
    distortion = 0.3,
    radialModulate = 1.5
  ) {
    super("CustomChromaticEffect", chromaticFragment, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([
        ["uIntensity", new Uniform(intensity)],
        ["uDistortion", new Uniform(distortion)],
        ["uCenter", new Uniform(new Vector2(0.5, 0.5))],
        ["uRadialModulate", new Uniform(radialModulate)],
      ]),
      attributes: Effect.Attribute.NONE,
    });
  }

  set intensity(v: number) { this.uniforms.get("uIntensity")!.value = v; }
  get intensity(): number { return this.uniforms.get("uIntensity")!.value as number; }
  set distortion(v: number) { this.uniforms.get("uDistortion")!.value = v; }
  get distortion(): number { return this.uniforms.get("uDistortion")!.value as number; }
}

export default CustomChromaticEffect;
