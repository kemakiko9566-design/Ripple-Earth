"use client";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

/* ─── Ozone Shader ─────────────────────────────────────────── */

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D uTexture;
uniform vec3 uOzoneColor;
uniform float uOzoneIntensity;
uniform float uOzoneSpread;
varying vec2 vUv;
void main() {
  vec4 tex = texture2D(uTexture, vUv);
  float southLat = 1.0 - vUv.y;
  float latFactor = smoothstep(0.3, 0.9, southLat);
  float mask = pow(latFactor, 1.5) * uOzoneSpread;
  vec3 final = mix(tex.rgb, uOzoneColor, min(1.0, mask * uOzoneIntensity));
  gl_FragColor = vec4(final, tex.a);
}
`;

const GEO = new THREE.SphereGeometry(1.2, 64, 64);
const GEO_GLOW = new THREE.SphereGeometry(1.25, 48, 48);

export type OzoneState = "damage" | "worst" | "recovery";

const OZONE: Record<OzoneState, { color: THREE.Color; intensity: number; spread: number }> = {
  damage:   { color: new THREE.Color("#FF6B4A"), intensity: 0.35, spread: 0.5 },
  worst:    { color: new THREE.Color("#C53A3A"), intensity: 0.60, spread: 0.85 },
  recovery: { color: new THREE.Color("#2ECC71"), intensity: 0.20, spread: 0.25 },
};

/* ─── Single Globe ─────────────────────────────────────────── */

function Globe3D({ map, state }: { map: THREE.Texture; state: OzoneState }) {
  var ref = useRef<THREE.Mesh>(null);
  var glowRef = useRef<THREE.Mesh>(null);
  var p = OZONE[state];

  var mat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTexture: { value: map }, uOzoneColor: { value: p.color.clone() }, uOzoneIntensity: { value: p.intensity }, uOzoneSpread: { value: p.spread } },
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
  }), [map, state]);

  useFrame((s) => {
    var t = s.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.025;
    if (glowRef.current) glowRef.current.rotation.y = t * 0.008;
  });

  return (<>
    <mesh ref={ref} geometry={GEO}><primitive object={mat} attach="material" /></mesh>
    <mesh ref={glowRef} geometry={GEO_GLOW}><meshBasicMaterial color="#fff" transparent opacity={0.04} side={THREE.BackSide} /></mesh>
  </>);
}

function StarsField({ count = 400 }) {
  var geo = useMemo(function () {
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) { var r = 8 + Math.random() * 18; var t = Math.random() * Math.PI * 2; var p = Math.acos(2 * Math.random() - 1); pos[i*3] = r * Math.sin(p) * Math.cos(t); pos[i*3+1] = r * Math.sin(p) * Math.sin(t); pos[i*3+2] = r * Math.cos(p); }
    var g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); return g;
  }, [count]);
  return <points><primitive object={geo} attach="geometry" /><pointsMaterial color="#fff" size={0.03} transparent opacity={0.35} /></points>;
}

function SceneInner({ map, state }: { map: THREE.Texture; state: OzoneState }) {
  return (<><ambientLight intensity={2} /><directionalLight position={[5, 3, 5]} intensity={0.8} /><Globe3D map={map} state={state} /><StarsField /></>);
}

/* ─── Single-Globe Timeline Component ──────────────────────── */

export default function TimelineGlobe({ state }: { state: OzoneState }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 180 }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 30 }} style={{ width: "100%", height: "100%", background: "transparent" }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <TextureGate state={state} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function TextureGate({ state }: { state: OzoneState }) {
  var [map] = useLoader(TextureLoader, ["https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"]);
  if (!map) return null;
  return <SceneInner map={map} state={state} />;
}
