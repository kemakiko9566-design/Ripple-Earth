"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Shared geometry instances
var GEO = {
  sphere: new THREE.SphereGeometry(2, 48, 48),
};

function WireSphere({ progress }: { progress: number }) {
  var meshRef = useRef<THREE.Mesh>(null!);
  var lineRef = useRef<THREE.Mesh>(null!);

  var grid = useMemo(function () {
    var pts = [];
    var r = 2.05;
    for (var lat = -75; lat <= 75; lat += 15) {
      var phi = (90 - lat) * Math.PI / 180;
      for (var lon = 0; lon <= 360; lon += 3) {
        var theta = lon * Math.PI / 180;
        pts.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)));
      }
    }
    for (var lon = -165; lon <= 165; lon += 15) {
      var theta = lon * Math.PI / 180;
      for (var lat = 0; lat <= 180; lat += 3) {
        var phi = lat * Math.PI / 180;
        pts.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)));
      }
    }
    var geo = new THREE.BufferGeometry().setFromPoints(pts);
    return new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: "#E8E8E8", transparent: true, opacity: 0.2 }));
  }, []);

  var mat = useMemo(function () {
    return new THREE.MeshBasicMaterial({ color: "#E8E8E8", wireframe: true, transparent: true, opacity: 0.25 });
  }, []);

  useFrame(function (s) {
    var t = s.clock.elapsedTime;
    if (meshRef.current) meshRef.current.rotation.y = t * 0.015 + progress * 1.5;
    if (lineRef.current) lineRef.current.rotation.y = t * 0.015 + progress * 1.5;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={GEO.sphere} material={mat} />
      <primitive ref={lineRef} object={grid} />
    </group>
  );
}

export default function WireframeGlobe({ progress, visible }: { progress: number; visible: boolean }) {
  var opacity = Math.min(1, Math.max(0, (progress - 0.15) / 0.1));
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 1, opacity }}>
      <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }} style={{ background: "transparent" }}>
        <WireSphere progress={progress} />
      </Canvas>
    </div>
  );
}
