"use client";
import { useRef, useEffect, useMemo } from "react";

export default function LightData({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLCanvasElement>(null);

  var lights = useMemo(function () {
    var arr = [];
    for (var i = 0; i < 250; i++) {
      arr.push({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 3,
        phase: Math.random(),
        cluster: Math.floor(Math.random() * 8),
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

      var fade = Math.min(1, Math.max(0, (progress - 0.48) / 0.04, (0.66 - progress) / 0.04));
      if (fade <= 0) { raf = requestAnimationFrame(render); return; }

      var sp = Math.max(0, Math.min(1, (progress - 0.50) / 0.14));
      var litCount = Math.floor(sp * lights.length);

      // Dark overlay
      ctx.fillStyle = "rgba(5,5,5," + (fade * 0.6) + ")";
      ctx.fillRect(0, 0, W, H);

      // Background grid
      ctx.strokeStyle = "rgba(232,232,232," + (fade * 0.03) + ")";
      ctx.lineWidth = 0.3;
      for (var gx = 0; gx < W; gx += W / 20) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (var gy = 0; gy < H; gy += H / 12) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // Lights
      for (var i = 0; i < lights.length; i++) {
        var l = lights[i];
        var isLit = i < litCount;
        if (!isLit) continue;
        var lx = l.x * W, ly = l.y * H;
        var pulse = 1 + Math.sin(Date.now() / 500 + l.phase * 6) * 0.15;
        // Glow
        var grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, l.size * 6 * pulse);
        grad.addColorStop(0, "rgba(255,200,80," + (0.15 * fade) + ")");
        grad.addColorStop(1, "rgba(255,200,80,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(lx, ly, l.size * 6 * pulse, 0, Math.PI * 2); ctx.fill();
        // Core
        ctx.beginPath(); ctx.arc(lx, ly, l.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,220,150," + (0.7 * fade) + ")";
        ctx.fill();
      }

      // Text
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "32px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.5) + ")";
      ctx.fillText(litCount * 100 / lights.length + "%", W / 2, H * 0.35);
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.25) + ")";
      ctx.fillText("INCREASE IN 25 YEARS", W / 2, H * 0.35 + 24);
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.12) + ")";
      ctx.fillText("ARTIFICIAL NIGHT LIGHT", W / 2, H * 0.86);
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

