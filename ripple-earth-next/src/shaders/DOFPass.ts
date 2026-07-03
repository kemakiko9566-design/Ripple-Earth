"use client";

import { Effect, BlendFunction, EffectAttribute } from "postprocessing";
import { Uniform } from "three";

const dofFragment = `
uniform float uFocusDistance;
uniform float uFocalLength;
uniform float uAperture;
uniform float uMaxBlur;

float readDepth(const in vec2 uv) {
  float d = texture2D(uDepthBuffer, uv).r;
  return d;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float depth = readDepth(uv);
  float coc = abs(depth - uFocusDistance);
  coc = coc * uFocalLength / max(depth * uFocusDistance, 0.001);
  coc *= uAperture;
  coc = min(coc, uMaxBlur);
  vec3 color = vec3(0.0);
  float totalWeight = 0.0;
  float samples = 12.0;
  for (float i = 0.0; i < samples; i++) {
    float angle = (i / samples) * 6.28319;
    float radius = (i / samples) * coc;
    vec2 offset = vec2(cos(angle), sin(angle)) * radius;
    vec2 sampUv = uv + offset * uTexelSize;
    float weight = 1.0 - (i / samples) * 0.5;
    vec3 samp = texture2D(uInputBuffer, sampUv).rgb;
    float sampDepth = readDepth(sampUv);
    float reject = smoothstep(uFocusDistance * 0.8, uFocusDistance * 1.2, sampDepth);
    weight *= reject;
    color += samp * weight;
    totalWeight += weight;
  }
  color = totalWeight > 0.0 ? color / totalWeight : inputColor.rgb;
  float blend = smoothstep(0.0, 0.02, coc);
  color = mix(inputColor.rgb, color, blend);
  outputColor = vec4(color, inputColor.a);
}
`;

export class CustomDOFEffect extends Effect {
  constructor(focusDistance = 0.5, focalLength = 0.1, aperture = 0.03, maxBlur = 0.02) {
    super("CustomDOFEffect", dofFragment, {
      blendFunction: BlendFunction.NORMAL,
      attributes: EffectAttribute.DEPTH,
      uniforms: new Map([
        ["uFocusDistance", new Uniform(focusDistance)],
        ["uFocalLength", new Uniform(focalLength)],
        ["uAperture", new Uniform(aperture)],
        ["uMaxBlur", new Uniform(maxBlur)],
      ]),
    });
  }
}

export default CustomDOFEffect;
