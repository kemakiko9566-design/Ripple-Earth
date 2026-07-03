"use client";
import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    var onScroll = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return function () { window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "2px",
        zIndex: 100,
        pointerEvents: "none",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          width: (pct * 100) + "%",
          height: "100%",
          background: "linear-gradient(90deg, #6de7ff, #20d8a3)",
          transition: "width 0.08s ease-out",
          boxShadow: "0 0 8px rgba(109,231,255,0.4)",
        }}
      />
    </div>
  );
}
