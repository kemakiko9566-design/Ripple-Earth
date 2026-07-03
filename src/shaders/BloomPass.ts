"use client";

import { Effect, KawaseBlurPass, BlendFunction } from "postprocessing";
import { Uniform } from "three";

// ---------------------------------------------------------------------------
// Bloom fragment shader: luminance threshold extraction + composite
// ---------------------------------------------------------------------------
const bloomFragment = `
uniform float uIntensity;
uniform float uThreshold;
uniform float uSmoothing;
uniform float uBlurScale;

// Luminance weight (Rec. 709)
const vec3 LUM = vec3(0.2126, 0.7152, 0.0722);

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 color = inputColor.rgb;
  float luminance = dot(color, LUM);

  // Soft threshold
  float amount = smoothstep(uThreshold, uThreshold + uSmoothing, luminance);

  // Keep hue, boost saturated brights
  vec3 bloom = color * amount;

  // Prevent black edges by adding a tiny bleed
  bloom = max(bloom, vec3(0.0));

  outputColor = vec4(bloom * uIntensity, amount);
}
`;

// ---------------------------------------------------------------------------
// Custom BloomEffect using the underlying postprocessing Effect class
// ---------------------------------------------------------------------------
export class CustomBloomEffect extends Effect {
  constructor(
    intensity = 1.5,
    threshold = 0.6,
    smoothing = 0.08,
    blurScale = 0.5
  ) {
    super("CustomBloomEffect", bloomFragment, {
      blendFunction: BlendFunction.ADD,
      uniforms: new Map([
        ["uIntensity", new Uniform(intensity)],
        ["uThreshold", new Uniform(threshold)],
        ["uSmoothing", new Uniform(smoothing)],
        ["uBlurScale", new Uniform(blurScale)],
      ]),
      attributes: Effect.Attribute.NONE,
    });
  }

  set intensity(v: number) { this.uniforms.get("uIntensity")!.value = v; }
  get intensity(): number { return this.uniforms.get("uIntensity")!.value as number; }
  set threshold(v: number) { this.uniforms.get("uThreshold")!.value = v; }
  get threshold(): number { return this.uniforms.get("uThreshold")!.value as number; }
  set smoothing(v: number) { this.uniforms.get("uSmoothing")!.value = v; }
  get smoothing(): number { return this.uniforms.get("uSmoothing")!.value as number; }
}

export default CustomBloomEffect;
