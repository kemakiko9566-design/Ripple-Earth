"use client";

import { ShaderMaterial, Color, Uniform, Vector2 } from "three";

export interface WaterShaderUniforms {
  uTime: Uniform<number>;
  uWaveHeight: Uniform<number>;
  uWaveLength: Uniform<number>;
  uWaveSpeed: Uniform<number>;
  uNumWaves: Uniform<number>;
  uDeepColor: Uniform<Color>;
  uShallowColor: Uniform<Color>;
  uFoamColor: Uniform<Color>;
  uSunDir: Uniform<Vector3Like>;
  uFresnelPower: Uniform<number>;
  uOpacity: Uniform<number>;
  uNormalStrength: Uniform<number>;
}

interface Vector3Like { x: number; y: number; z: number; }

export const defaultWaterUniforms: WaterShaderUniforms = {
  uTime: new Uniform(0),
  uWaveHeight: new Uniform(0.15),
  uWaveLength: new Uniform(2.0),
  uWaveSpeed: new Uniform(0.8),
  uNumWaves: new Uniform(6),
  uDeepColor: new Uniform(new Color("#001a33")),
  uShallowColor: new Uniform(new Color("#4dc9f6")),
  uFoamColor: new Uniform(new Color("#ffffff")),
  uSunDir: new Uniform({ x: 0.5, y: 0.3, z: 0.8 }),
  uFresnelPower: new Uniform(3.0),
  uOpacity: new Uniform(0.95),
  uNormalStrength: new Uniform(0.4),
};

const waterVertex = `
uniform float uTime;
uniform float uWaveHeight;
uniform float uWaveLength;
uniform float uWaveSpeed;
uniform float uNumWaves;
uniform float uNormalStrength;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewDir;
varying float vHeight;

// Gerstner wave function
vec3 gerstnerWave(vec4 wave, vec3 pos, inout vec3 tangent, inout vec3 binormal) {
  float steepness = wave.z;
  float wavelength = wave.x;
  float speed = uWaveSpeed * sqrt(9.8 * wavelength / 6.2832);
  float dirX = cos(wave.w);
  float dirZ = sin(wave.w);
  vec2 direction = vec2(dirX, dirZ);
  float freq = 2.0 * 3.14159 / wavelength;
  float phase = speed * freq;
  float theta = freq * dot(direction, pos.xz) + uTime * phase;
  float S = sin(theta);
  float C = cos(theta);
  float a = steepness / freq;

  vec3 displacement = vec3(
    direction.x * a * C,
    a * S,
    direction.y * a * C
  );

  // Tangent & binormal perturbation
  vec3 wt = vec3(
    1.0 - direction.x * direction.x * steepness * S,
    direction.x * freq * a * C,
    -direction.x * direction.y * steepness * S
  );
  vec3 wb = vec3(
    -direction.x * direction.y * steepness * S,
    direction.y * freq * a * C,
    1.0 - direction.y * direction.y * steepness * S
  );
  tangent += wt;
  binormal += wb;

  return displacement;
}

void main() {
  vec3 pos = position;
  vec3 tangent = vec3(1, 0, 0);
  vec3 binormal = vec3(0, 0, 1);

  // Generate multiple Gerstner waves
  float numWaves = floor(uNumWaves);
  float totalHeight = 0.0;

  for (int i = 0; i < 8; i++) {
    if (float(i) >= numWaves) break;
    float fi = float(i + 1);
    float wl = uWaveLength * (0.3 + fi * 0.1);
    float h = uWaveHeight / fi;
    float angle = fi * 1.3 + fi * 0.7;
    vec4 wave = vec4(wl, h, 0.3 + fi * 0.05, angle);
    pos += gerstnerWave(wave, pos, tangent, binormal);
  }

  vec3 normal = normalize(cross(binormal, tangent));

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  vHeight = pos.y;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const waterFragment = `
uniform float uTime;
uniform vec3  uDeepColor;
uniform vec3  uShallowColor;
uniform vec3  uFoamColor;
uniform vec3  uSunDir;
uniform float uFresnelPower;
uniform float uOpacity;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewDir;
varying float vHeight;

void main() {
  vec3 normal = normalize(vWorldNormal);
  vec3 viewDir = normalize(vViewDir);
  vec3 sunDir = normalize(uSunDir);

  // Fresnel (Schlick approximation)
  float cosTheta = max(dot(viewDir, normal), 0.0);
  float fresnel = pow(1.0 - cosTheta, uFresnelPower);

  // Deep/shallow blend based on view angle & height
  float depthFactor = smoothstep(-0.5, 0.5, vHeight * 0.5 + fresnel * 0.3);
  vec3 waterColor = mix(uDeepColor, uShallowColor, depthFactor);

  // Specular (Blinn-Phong)
  vec3 halfVec = normalize(viewDir + sunDir);
  float spec = pow(max(dot(normal, halfVec), 0.0), 64.0);
  vec3 specColor = vec3(1.0) * spec * 0.6;

  // Diffuse
  float diff = max(dot(normal, sunDir), 0.0);
  waterColor += vec3(0.15, 0.35, 0.5) * diff * 0.15;

  // Foam
  float foam = smoothstep(0.3, 0.7, fresnel);
  foam *= smoothstep(-0.1, 0.2, vHeight);
  waterColor = mix(waterColor, uFoamColor, foam * 0.15);

  // Reflection (simple sky tint)
  vec3 reflectDir = reflect(-viewDir, normal);
  float reflBright = max(dot(reflectDir, sunDir), 0.0);
  vec3 reflection = vec3(0.05, 0.15, 0.3) + vec3(0.8, 0.9, 1.0) * pow(reflBright, 8.0) * 0.4;

  vec3 finalColor = mix(waterColor, reflection, fresnel * 0.6);
  finalColor += specColor;

  gl_FragColor = vec4(finalColor, uOpacity);
}
`;

export class WaterShaderMaterial extends ShaderMaterial {
  declare uniforms: WaterShaderUniforms;
  constructor(uniforms?: Partial<WaterShaderUniforms>) {
    super({
      uniforms: { ...defaultWaterUniforms, ...uniforms },
      vertexShader: waterVertex,
      fragmentShader: waterFragment,
      transparent: true,
      side: 2, // DoubleSide
    });
  }

  updateTime(delta: number): void {
    this.uniforms.uTime.value += delta;
  }
}

export default WaterShaderMaterial;
