"use client";
import { useEffect, useRef } from "react";

export default function RipplePath({ progress }: { progress: number }) {
  var pathRef = useRef<SVGPathElement>(null);
  var len = progress * 3200;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 3 }}>
      <svg width="100%" height="100%" viewBox="0 0 1600 6400" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M 400,0 Q 600,400 300,800 T 500,1600 T 200,2400 T 600,3200 T 350,4000 T 550,4800 T 400,5600 L 400,6400"
          fill="none"
          stroke="#FF8A3D"
          strokeWidth="0.5"
          opacity="0.3"
          strokeDasharray={len}
          strokeDashoffset={3200 - len}
        />
      </svg>
    </div>
  );
}
