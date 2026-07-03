"use client";

import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";

// ---------------------------------------------------------------------------
// Depth of Field fragment shader
// Uses depth buffer for circle-of-confusion-based blur
// ---------------------------------------------------------------------------
const dofFragment = `
uniform float uFocusDistance;
uniform float uFocalLength;
uniform float uAperture;
uniform float uMaxBlur;

// Depth unpack (logarithmic depth buffer)
float readDepth(const in vec2 uv) {
  float d = texture2D(uDepthBuffer, uv).r;
  // For perspective cameras with logarithmic depth:
  // d = (z_near * z_far) / (z_far - d * (z_far - z_near))
  return d;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float depth = readDepth(uv);

  // Circle of confusion: distance from focal plane
  float coc = abs(depth - uFocusDistance);
  coc = coc * uFocalLength / (depth * uFocusDistance);
  coc *= uAperture;
  coc = min(coc, uMaxBlur);

  // Poisson disc-like blur (simplified: weighted gather)
  vec3 color = vec3(0.0);
  float totalWeight = 0.0;
  float samples = 12.0;

  for (float i = 0.0; i < samples; i++) {
    float angle = (i / samples) * 6.28319;
    float radius = (i / samples) * coc;
    vec2 offset = vec2(cos(angle), sin(angle)) * radius;

    vec2 sampUv = uv + offset * uTexelSize;
    float weight = 1.0;

    // Disc weight: outer samples contribute less
    weight = 1.0 - (i / samples) * 0.5;

    vec3 samp = texture2D(uInputBuffer, sampUv).rgb;
    float sampDepth = readDepth(sampUv);

    // Reject samples that are far in front of focal plane
    float reject = smoothstep(uFocusDistance * 0.8, uFocusDistance * 1.2, sampDepth);
    weight *= reject;

    color += samp * weight;
    totalWeight += weight;
  }

  color = totalWeight > 0.0 ? color / totalWeight : inputColor.rgb;

  // Blend with original (sharp center, blurred edges)
  float blend = smoothstep(0.0, 0.02, coc);
  color = mix(inputColor.rgb, color, blend);

  outputColor = vec4(color, inputColor.a);
}
`;

// ---------------------------------------------------------------------------
// Custom DepthOfFieldEffect
// ---------------------------------------------------------------------------
export class CustomDOFEffect extends Effect {
  constructor(
    focusDistance = 0.5,
    focalLength = 0.1,
    aperture = 0.03,
    maxBlur = 0.02
  ) {
    super("CustomDOFEffect", dofFragment, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([
        ["uFocusDistance", new Uniform(focusDistance)],
        ["uFocalLength", new Uniform(focalLength)],
        ["uAperture", new Uniform(aperture)],
        ["uMaxBlur", new Uniform(maxBlur)],
      ]),
      attributes: Effect.Attribute.DEPTH,
    });
  }

  set focusDistance(v: number) { this.uniforms.get("uFocusDistance")!.value = v; }
  get focusDistance(): number { return this.uniforms.get("uFocusDistance")!.value as number; }
  set aperture(v: number) { this.uniforms.get("uAperture")!.value = v; }
  get aperture(): number { return this.uniforms.get("uAperture")!.value as number; }
}

export default CustomDOFEffect;
