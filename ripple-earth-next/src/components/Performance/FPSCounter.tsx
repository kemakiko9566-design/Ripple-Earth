"use client";
import { useEffect, useRef, useState } from "react";

/**
 * FPSCounter – monitors real-time frame rate.
 * Use during development; remove or disable in production.
 */
export default function FPSCounter() {
  const [fps, setFps] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    var frames = 0;
    var last = performance.now();

    function tick() {
      frames++;
      var now = performance.now();
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  var color = fps >= 55 ? "#22c55e" : fps >= 30 ? "#eab308" : "#ef4444";

  return (
    <div
      style={{
        position: "fixed", bottom: 12, left: 12, zIndex: 9999,
        fontFamily: "JetBrains Mono, monospace", fontSize: 12,
        color, background: "rgba(0,0,0,0.65)",
        padding: "4px 8px", borderRadius: 4,
        pointerEvents: "none", userSelect: "none",
      }}
    >
      {fps} FPS
    </div>
  );
}
