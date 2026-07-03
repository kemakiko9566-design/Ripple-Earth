"use client";

import { ShaderMaterial, Color, Uniform, CubeTexture } from "three";

export interface GlassShaderUniforms {
  uTime: Uniform<number>;
  uColor: Uniform<Color>;
  uIOR: Uniform<number>;
  uFresnelPower: Uniform<number>;
  uRefractionStrength: Uniform<number>;
  uReflectionStrength: Uniform<number>;
  uSpecularStrength: Uniform<number>;
  uRoughness: Uniform<number>;
  uOpacity: Uniform<number>;
  uEnvMapIntensity: Uniform<number>;
  uThickness: Uniform<number>;
}

export const defaultGlassUniforms: GlassShaderUniforms = {
  uTime: new Uniform(0),
  uColor: new Uniform(new Color("#88ddff")),
  uIOR: new Uniform(1.5),
  uFresnelPower: new Uniform(4.0),
  uRefractionStrength: new Uniform(0.05),
  uReflectionStrength: new Uniform(0.3),
  uSpecularStrength: new Uniform(1.0),
  uRoughness: new Uniform(0.1),
  uOpacity: new Uniform(0.85),
  uEnvMapIntensity: new Uniform(1.0),
  uThickness: new Uniform(0.5),
};

// ---------------------------------------------------------------------------
// Vertex: pass normal, view dir, world position
// ---------------------------------------------------------------------------
const glassVertex = `
varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying vec3 vLocalPos;
varying vec3 vObjectNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vObjectNormal = normal;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPos = worldPos.xyz;
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  vLocalPos = position;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

// ---------------------------------------------------------------------------
// Fragment: fresnel, refraction, specular, thin-film tint
// ---------------------------------------------------------------------------
const glassFragment = `
uniform vec3  uColor;
uniform float uIOR;
uniform float uFresnelPower;
uniform float uRefractionStrength;
uniform float uReflectionStrength;
uniform float uSpecularStrength;
uniform float uRoughness;
uniform float uOpacity;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vObjectNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

// Pseudo-random noise for micro-surface scattering
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 On = normalize(vObjectNormal);

  // Fresnel (Schlick)
  float cosTheta = max(dot(V, N), 0.0);
  float f0 = pow((1.0 - uIOR) / (1.0 + uIOR), 2.0);
  float fresnel = f0 + (1.0 - f0) * pow(1.0 - cosTheta, uFresnelPower);

  // Refraction pseudo-effect using normal perturbation
  float time = uTime * 0.15;
  vec3 perturb = vec3(
    sin(vWorldPos.x * 3.0 + vWorldPos.y * 2.0 + time),
    cos(vWorldPos.y * 3.0 + vWorldPos.z * 2.0 + time * 0.7),
    sin(vWorldPos.z * 3.0 + vWorldPos.x * 2.0 + time * 0.5)
  ) * uRefractionStrength;

  vec3 refrN = normalize(N + perturb);

  // Base color with thin-film interference approximation
  float film = 0.5 + 0.5 * sin(dot(V, On) * 20.0 * uThickness + uTime * 0.5);
  vec3 tint = mix(uColor, uColor * 1.3, film * 0.1);

  // Refraction color (darker, wavelength-shifted)
  vec3 refrColor = tint * 0.6 * (1.0 - fresnel * 0.5);

  // Reflection color (sky-like with tint)
  vec3 reflectDir = reflect(-V, refrN);
  vec3 reflColor = mix(
    vec3(0.1, 0.15, 0.25),
    vec3(0.4, 0.6, 0.8),
    max(dot(reflectDir, vec3(0.0, 1.0, 0.0)), 0.0)
  );
  reflColor = mix(reflColor, tint, 0.3);

  // Specular highlight (Blinn-Phong with roughness)
  vec3 lightDir = normalize(vec3(0.5, 1.0, 0.3));
  vec3 H = normalize(V + lightDir);
  float spec = pow(max(dot(N, H), 0.0), (1.0 - uRoughness) * 128.0 + 8.0);
  vec3 specColor = vec3(1.0) * spec * uSpecularStrength;

  // Edge light / rim
  float rim = pow(1.0 - cosTheta, 5.0) * 0.4;

  // Composite
  vec3 finalColor = mix(refrColor, reflColor, fresnel * uReflectionStrength);
  finalColor += specColor;
  finalColor += tint * rim * 0.15;

  // Chromatic edge (subtle rainbow at glancing angles)
  float chromaticEdge = pow(1.0 - cosTheta, 6.0) * 0.06;
  finalColor.r += chromaticEdge;
  finalColor.b -= chromaticEdge * 0.5;

  gl_FragColor = vec4(finalColor, uOpacity);

  // Preserve highlight at total internal reflection angles
  if (fresnel > 0.9) {
    gl_FragColor.rgb = mix(gl_FragColor.rgb, reflColor * 1.2, (fresnel - 0.9) * 5.0);
  }
}
`;

export class GlassShaderMaterial extends ShaderMaterial {
  declare uniforms: GlassShaderUniforms;
  constructor(uniforms?: Partial<GlassShaderUniforms>) {
    super({
      uniforms: { ...defaultGlassUniforms, ...uniforms },
      vertexShader: glassVertex,
      fragmentShader: glassFragment,
      transparent: true,
      side: 2, // DoubleSide
      depthWrite: false,
    });
  }

  updateTime(delta: number): void {
    this.uniforms.uTime.value += delta;
  }
}

export default GlassShaderMaterial;
