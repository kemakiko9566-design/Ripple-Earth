"use client";
import { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { Float, Stars } from "@react-three/drei";

// Shared geometries – created once to reduce GPU memory churn
var GEO = {
  sphere96: new THREE.SphereGeometry(2, 96, 96),
  sphere64: new THREE.SphereGeometry(2.01, 64, 64),
  glow: new THREE.SphereGeometry(2.15, 64, 64),
};

function GlobeCore({ progress, globeOpacity }: { progress: number; globeOpacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);

  const [map, cld, spec, norm] = useLoader(TextureLoader, [
    "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  // Texture memory optimization: cloud texture doesn't need full mip chain
  useEffect(function () {
    if (cld) {
      cld.generateMipmaps = false;
      cld.minFilter = THREE.LinearFilter;
      cld.magFilter = THREE.LinearFilter;
    }
    // Normal and specular maps should stay linear
    if (norm) { norm.colorSpace = THREE.LinearSRGBColorSpace; }
    if (spec) { spec.colorSpace = THREE.LinearSRGBColorSpace; }
  }, [cld, norm, spec]);

  useFrame((s) => {
    var t = s.clock.elapsedTime;
    if (ref.current) { ref.current.rotation.y = 0.1 + t * 0.025 + progress * 0.5; }
    if (clouds.current) clouds.current.rotation.y = 0.1 + t * 0.03 + progress * 0.5;
  });

  return (
    <group>
      <mesh ref={ref} geometry={GEO.sphere96}>
        <meshPhongMaterial
          map={map} specularMap={spec} normalMap={norm}
          specular={new THREE.Color("#888")} shininess={20}
          emissive={new THREE.Color("#3366aa")} emissiveIntensity={0.25}
          transparent opacity={globeOpacity}
        />
      </mesh>
      <mesh ref={clouds} geometry={GEO.sphere64}>
        <meshPhongMaterial map={cld} transparent opacity={0.12 * globeOpacity} depthWrite={false} />
      </mesh>
      <mesh geometry={GEO.glow}>
        <meshBasicMaterial color="#4CC9F0" transparent opacity={0.06 * globeOpacity} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function Earth({ progress, visible }: { progress: number; visible: boolean }) {
  var globeOpacity = Math.max(0, Math.min(1, 1 - progress));
  var scale = (0.6 + progress * 0.5);
  if (!visible && globeOpacity <= 0) return null;

  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} style={{ background: "#050505" }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.0} />
        <Float speed={2} rotationIntensity={0} floatIntensity={0.15}>
          <group scale={scale}>
            <GlobeCore progress={progress} globeOpacity={globeOpacity} />
          </group>
        </Float>
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
