"use client";
import { useEffect, useRef } from "react";

export default function AnomalyNode({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    var el = ref.current;
    var id = setInterval(() => {
      el.style.transform = "scale(" + (1 + Math.sin(Date.now() / 400) * 0.4) + ")";
    }, 50);
    return () => clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", top: "46%", left: "42%", zIndex: 5, textAlign: "center", pointerEvents: "none" }}>
      <div ref={ref} style={{
        width: 12, height: 12, borderRadius: "50%",
        background: "#FF8A3D", margin: "0 auto",
        boxShadow: "0 0 20px rgba(255,138,61,0.6), 0 0 60px rgba(255,138,61,0.2)",
        transition: "transform 0.05s",
      }} />
    </div>
  );
}
