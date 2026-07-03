"use client";

import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";

const chromaticFragment = `
uniform float uIntensity;
uniform float uDistortion;
uniform vec2 uCenter;
uniform float uRadialModulate;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 dir = uv - uCenter;
  float dist = length(dir);
  vec2 dirN = dist > 0.0 ? dir / dist : vec2(0.0);
  float radialFactor = 1.0 + uRadialModulate * dist;
  float offset = uIntensity * radialFactor;
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

export class CustomChromaticEffect extends Effect {
  constructor(intensity = 0.005, distortion = 0.3, radialModulate = 1.5) {
    super("CustomChromaticEffect", chromaticFragment, {
      blendFunction: BlendFunction.NORMAL,
      uniforms: new Map([
        ["uIntensity", new Uniform(intensity)],
        ["uDistortion", new Uniform(distortion)],
              ["uRadialModulate", new Uniform(radialModulate)],
      ]),
    });
  }
}

export default CustomChromaticEffect;
