"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

var ROT = 3.56;

// Shared geometries 鈥?created once to reduce GPU memory churn
var GEO = {
  main: new THREE.SphereGeometry(2, 96, 96),
  clouds: new THREE.SphereGeometry(2.01, 64, 64),
  glow1: new THREE.SphereGeometry(2.15, 64, 64),
  glow2: new THREE.SphereGeometry(2.35, 64, 64),
  glow3: new THREE.SphereGeometry(2.6, 64, 64),
};

// Lower-poly LOD fallback for when globe is mostly faded
var GEO_LOW = {
  main: new THREE.SphereGeometry(2, 48, 48),
  clouds: new THREE.SphereGeometry(2.01, 32, 32),
};

function EarthCore({ progress, globeOpacity }: { progress: number; globeOpacity: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const clouds = useRef<THREE.Mesh>(null!);
  const g1 = useRef<THREE.Mesh>(null!);
  const g2 = useRef<THREE.Mesh>(null!);
  const g3 = useRef<THREE.Mesh>(null!);
  const scrollStart = useRef<number | null>(null);

  const [map, cld, spec, norm] = useLoader(TextureLoader, [
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  // Texture memory optimization: reduce mipmap memory for cloud texture
  useEffect(function () {
    if (cld) {
      cld.generateMipmaps = false;
      cld.minFilter = THREE.LinearFilter;
      cld.magFilter = THREE.LinearFilter;
    }
    // Normal map doesn't need sRGB
    if (norm) { norm.colorSpace = THREE.LinearSRGBColorSpace; }
    if (spec) { spec.colorSpace = THREE.LinearSRGBColorSpace; }
  }, [cld, norm, spec]);

  // LOD: switch to lower-poly when globe is mostly faded
  var isLowDetail = globeOpacity < 0.3;
  var activeGeo = isLowDetail ? GEO_LOW : GEO;

  useFrame(function (s) {
    var t = s.clock.elapsedTime;
    if (progress < 0.005) {
      scrollStart.current = t;
    } else if (scrollStart.current === null) {
      scrollStart.current = t;
    }
    var elapsed = t - (scrollStart.current || t);
    var rot = ROT + elapsed * 0.0275 + progress * 0.5;
    var tilt = Math.sin(t * 0.15) * 0.03;
    if (ref.current) { ref.current.rotation.y = rot; ref.current.rotation.x = tilt; }
    if (clouds.current) clouds.current.rotation.y = ROT + elapsed * 0.04 + progress * 0.5;
    if (g1.current) g1.current.rotation.y = t * 0.015;
    if (g2.current) g2.current.rotation.y = t * 0.01;
    if (g3.current) g3.current.rotation.y = t * 0.008;
  });

  return (
    <group>
      <mesh ref={g3} geometry={GEO.glow3}>
        <meshBasicMaterial color="#fff" transparent opacity={0.015 * globeOpacity} side={THREE.BackSide} />
      </mesh>
      <mesh ref={g2} geometry={GEO.glow2}>
        <meshBasicMaterial color="#fff" transparent opacity={0.03 * globeOpacity} side={THREE.BackSide} />
      </mesh>
      <mesh ref={g1} geometry={GEO.glow1}>
        <meshBasicMaterial color="#fff" transparent opacity={0.06 * globeOpacity} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ref} geometry={activeGeo.main}>
        <meshPhongMaterial map={map} specularMap={spec} normalMap={norm} specular={new THREE.Color("#888")} shininess={20} emissive={new THREE.Color("#3366aa")} emissiveIntensity={0.25} transparent opacity={globeOpacity} />
      </mesh>
      <mesh ref={clouds} geometry={activeGeo.clouds}>
        <meshPhongMaterial map={cld} transparent opacity={0.12 * globeOpacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Stars({ count = 2000 }) {
  var geo = useMemo(function () {
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var r = 15 + Math.random() * 30;
      var t = Math.random() * Math.PI * 2;
      var p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  return <points><primitive object={geo} attach="geometry" /><pointsMaterial color="#fff" size={0.04} transparent opacity={0.5} /></points>;
}

export default function Globe({ progress }: { progress: number }) {
  var globeOpacity = Math.max(0, Math.min(1, 1 - Math.pow(progress, 0.6)));
  var scale = (0.6 + progress * 1.5) * 1.1;
  var offsetX = 2.0 - 2.2 * Math.min(1, progress / 0.25);
  offsetX = Math.max(-0.2, offsetX);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ width: "100%", height: "100%", background: "#000" }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.0} />
        <group position={[offsetX, 0, 0]} scale={scale}>
          <EarthCore progress={progress} globeOpacity={globeOpacity} />
        </group>
        <Stars />
      </Canvas>
    </div>
  );
}
