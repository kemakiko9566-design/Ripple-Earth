"use client";
import { useRef, useEffect, useMemo } from "react";

export default function SandData({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLCanvasElement>(null);

  var particles = useMemo(function () {
    var arr = [];
    for (var i = 0; i < 150; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 2.5,
        speed: 0.15 + Math.random() * 0.3,
        delay: Math.random(),
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    if (!visible) return;
    var canvas = ref.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    var raf = 0;

    function render() { if (!canvas) return;
      var dpr = window.devicePixelRatio || 1;
      var W = canvas.offsetWidth;
      var H = canvas.offsetHeight;
      if (W === 0 || H === 0) { raf = requestAnimationFrame(render); return; }
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, W, H);

      var fade = Math.min(1, Math.max(0, (progress - 0.33) / 0.04, (0.50 - progress) / 0.04));
      if (fade <= 0) { raf = requestAnimationFrame(render); return; }

      var sp = Math.max(0, Math.min(1, (progress - 0.35) / 0.12));

      // Dark overlay
      ctx.fillStyle = "rgba(5,5,5," + (fade * 0.6) + ")";
      ctx.fillRect(0, 0, W, H);

      // Sand grains falling
      var time = Date.now() / 1000;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var py = (p.y + (time * p.speed - sp * 2) * 0.15) % 1.2 - 0.1;
        var alpha = Math.max(0, Math.min(1, 1 - Math.abs(py - 0.3) * 2)) * fade * 0.6;
        ctx.beginPath();
        ctx.arc(p.x * W, py * H, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(194,178,128," + alpha + ")";
        ctx.fill();
      }

      // Depletion counter
      var remaining = Math.max(0, Math.round(50 * (1 - sp)));
      ctx.save();
      ctx.font = "42px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.7) + ")";
      ctx.fillText(remaining + " BILLION", W / 2, H * 0.35);
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.3) + ")";
      ctx.fillText("TONS PER YEAR", W / 2, H * 0.35 + 28);
      ctx.restore();

      // Bottom label
      ctx.save();
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.15) + ")";
      ctx.fillText("SECOND MOST CONSUMED RESOURCE ON EARTH", W / 2, H * 0.88);
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.1) + ")";
      ctx.fillText("AFTER WATER", W / 2, H * 0.88 + 14);
      ctx.restore();

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);
    return function () { cancelAnimationFrame(raf); };
  }, [progress, visible]);

  if (!visible) return null;

  return (
    <canvas ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      pointerEvents: "none", zIndex: 2,
    }} />
  );
}

