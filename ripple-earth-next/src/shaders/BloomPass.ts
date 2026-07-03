"use client";

import { Effect, BlendFunction } from "postprocessing";
import { Uniform } from "three";

const bloomFragment = `
uniform float uIntensity;
uniform float uThreshold;
uniform float uSmoothing;

const vec3 LUM = vec3(0.2126, 0.7152, 0.0722);

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 color = inputColor.rgb;
  float luminance = dot(color, LUM);
  float amount = smoothstep(uThreshold, uThreshold + uSmoothing, luminance);
  vec3 bloom = color * amount;
  bloom = max(bloom, vec3(0.0));
  outputColor = vec4(bloom * uIntensity, amount);
}
`;

export class CustomBloomEffect extends Effect {
  constructor(intensity = 1.5, threshold = 0.6, smoothing = 0.08) {
    super("CustomBloomEffect", bloomFragment, {
      blendFunction: BlendFunction.ADD,
      uniforms: new Map([
        ["uIntensity", new Uniform(intensity)],
        ["uThreshold", new Uniform(threshold)],
        ["uSmoothing", new Uniform(smoothing)],
      ]),
    });
  }
}

export default CustomBloomEffect;
