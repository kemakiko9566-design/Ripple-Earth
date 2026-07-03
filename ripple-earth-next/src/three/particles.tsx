"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Shader source – custom GPU-based twinkling star field
// ---------------------------------------------------------------------------

const STAR_VERTEX = `
attribute float aSize;
attribute float aTwinklePhase;
attribute float aTwinkleFreq;
attribute vec3  aColor;

uniform float uTime;

varying vec3  vColor;
varying float vTwinkle;

void main() {
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  float depth = -mvPos.z;

  // Twinkle: asymmetric sine so stars spend more time bright than dim
  float raw = sin(uTime * aTwinkleFreq + aTwinklePhase);
  float twinkle = 0.45 + 0.55 * (raw * 0.5 + 0.5);

  gl_PointSize = aSize * (180.0 / max(1.0, depth));
  gl_PointSize = clamp(gl_PointSize, 0.5, 24.0);
  gl_Position  = projectionMatrix * mvPos;

  vColor    = aColor;
  vTwinkle  = twinkle;
}
`;

const STAR_FRAGMENT = `
varying vec3  vColor;
varying float vTwinkle;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);

  // Soft round point with a tiny bright core
  float alpha = 1.0 - smoothstep(0.0, 0.5, d);
  // Core bright spot
  float core = exp(-d * 20.0);
  float brightness = mix(alpha, 1.0, core) * vTwinkle;

  if (brightness < 0.005) discard;

  gl_FragColor = vec4(vColor, brightness);
}
`;

// ---------------------------------------------------------------------------
// Star geometry factory
// ---------------------------------------------------------------------------

export interface StarFieldConfig {
  count?: number;
  radiusMin?: number;
  radiusMax?: number;
  sizeMin?: number;
  sizeMax?: number;
}

export const STAR_DEFAULTS: Required<StarFieldConfig> = {
  count: 4000,
  radiusMin: 12,
  radiusMax: 55,
  sizeMin: 0.4,
  sizeMax: 2.0,
};

export function createStarGeometry(config: StarFieldConfig = {}): THREE.BufferGeometry {
  const {
    count,
    radiusMin,
    radiusMax,
    sizeMin,
    sizeMax,
  } = { ...STAR_DEFAULTS, ...config };

  const pos   = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const freqs  = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const tmpColor = new THREE.Color();

  for (let i = 0; i < count; i++) {
    // Spherical-shell position
    const r   = radiusMin + Math.random() * (radiusMax - radiusMin);
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);

    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);

    // Size: most small, a few large "bright" stars
    const roll = Math.random();
    sizes[i] = roll < 0.02
      ? sizeMax * (0.8 + Math.random() * 0.4)
      : sizeMin + Math.random() * (sizeMax - sizeMin) * (roll < 0.1 ? 1.5 : 0.6);

    // Twinkle params
    phases[i] = Math.random() * Math.PI * 2;
    freqs[i]  = 0.3 + Math.random() * 1.2;

    // Color: mix of white, blue-white, warm-white
    const tint = Math.random();
    if (tint < 0.6) {
      tmpColor.setHSL(0.0, 0.0, 0.9 + Math.random() * 0.1);        // pure white
    } else if (tint < 0.85) {
      tmpColor.setHSL(0.6, 0.2 + Math.random() * 0.3, 0.7 + Math.random() * 0.2); // blue-white
    } else {
      tmpColor.setHSL(0.08, 0.3 + Math.random() * 0.4, 0.7 + Math.random() * 0.2); // warm-white
    }

    colors[i * 3]     = tmpColor.r;
    colors[i * 3 + 1] = tmpColor.g;
    colors[i * 3 + 2] = tmpColor.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position",       new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSize",          new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("aTwinklePhase",  new THREE.BufferAttribute(phases, 1));
  geo.setAttribute("aTwinkleFreq",   new THREE.BufferAttribute(freqs, 1));
  geo.setAttribute("aColor",         new THREE.BufferAttribute(colors, 3));

  return geo;
}

export function createStarMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

// ---------------------------------------------------------------------------
// R3F component
// ---------------------------------------------------------------------------

export default function StarField({ config }: { config?: StarFieldConfig }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const [geometry, material] = useMemo(() => {
    const geo = createStarGeometry(config);
    const mat = createStarMaterial();
    return [geo, mat];
  }, [config?.count, config?.radiusMin, config?.radiusMax]);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points>
      <primitive object={geometry} />
      <primitive ref={matRef} object={material} attach="material" />
    </points>
  );
}
