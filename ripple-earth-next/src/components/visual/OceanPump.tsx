"use client";
import { useRef, useEffect, useMemo } from "react";

// Whale silhouette (approximate) as a simple path of points
const WHALE_PATH = [
  [0.08, 0.50], [0.12, 0.44], [0.18, 0.40], [0.25, 0.38],
  [0.35, 0.37], [0.45, 0.37], [0.55, 0.38], [0.62, 0.40],
  [0.68, 0.43], [0.72, 0.47], [0.74, 0.50], [0.72, 0.53],
  [0.68, 0.57], [0.62, 0.60], [0.55, 0.62], [0.45, 0.63],
  [0.35, 0.63], [0.25, 0.62], [0.18, 0.60], [0.12, 0.56],
  [0.08, 0.50],
];

const WHALE_EYE = [0.35, 0.48];
const WHALE_FLIPPER = [
  [0.28, 0.55], [0.30, 0.60], [0.33, 0.63], [0.30, 0.62], [0.26, 0.58],
];
const WHALE_TAIL = [
  [0.68, 0.43], [0.72, 0.38], [0.76, 0.36], [0.74, 0.40],
  [0.74, 0.60], [0.76, 0.64], [0.72, 0.62], [0.68, 0.57],
];

export default function OceanPump({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLCanvasElement>(null);

  // Nutrient particles rising from deep ocean
  var particles = useMemo(function () {
    var arr = [];
    for (var i = 0; i < 200; i++) {
      arr.push({
        x: Math.random(),
        y: 0.6 + Math.random() * 0.35,
        size: 1 + Math.random() * 2.5,
        speed: 0.08 + Math.random() * 0.15,
        delay: Math.random() * 20,
        drift: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  // Surface bloom particles (phytoplankton)
  var blooms = useMemo(function () {
    var arr = [];
    for (var i = 0; i < 80; i++) {
      arr.push({
        x: Math.random(),
        y: 0.35 + Math.random() * 0.1,
        size: 2 + Math.random() * 4,
        speed: 0.02 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2,
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

      // Fade based on progress range: 0.38-0.58
      var fade = Math.min(1, Math.max(0, (progress - 0.38) / 0.05, (0.58 - progress) / 0.05));
      if (fade <= 0) { raf = requestAnimationFrame(render); return; }

      var sp = Math.max(0, Math.min(1, (progress - 0.40) / 0.16));
      var time = Date.now() / 1000;

      // Dark overlay
      ctx.fillStyle = "rgba(2, 5, 10, " + (fade * 0.65) + ")";
      ctx.fillRect(0, 0, W, H);

      // ===== Ocean depth gradient =====
      var depth = ctx.createLinearGradient(0, 0, 0, H);
      depth.addColorStop(0, "rgba(0, 30, 60, " + (fade * 0.3) + ")");
      depth.addColorStop(0.35, "rgba(0, 50, 100, " + (fade * 0.2) + ")");
      depth.addColorStop(0.65, "rgba(2, 10, 25, " + (fade * 0.4) + ")");
      depth.addColorStop(1, "rgba(1, 3, 8, " + (fade * 0.6) + ")");
      ctx.fillStyle = depth;
      ctx.fillRect(0, 0, W, H);

      // ===== Depth labels =====
      ctx.save();
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.1) + ")";
      ctx.fillText("SURFACE — EUPHOTIC ZONE", 16, H * 0.32);
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.06) + ")";
      ctx.fillText("DEEP — NUTRIENT POOL", 16, H * 0.88);
      ctx.restore();

      // ===== Main whale silhouette =====
      var whaleScale = 0.45;
      var whaleX = W * 0.52 - (sp * W * 0.08);
      var whaleY = H * 0.48 + Math.sin(time * 0.3) * 4;
      ctx.save();
      ctx.translate(whaleX, whaleY);
      ctx.scale(whaleScale * W * 0.001, whaleScale * H * 0.001);

      ctx.beginPath();
      WHALE_PATH.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p[0] * 100, p[1] * 100);
        else ctx.lineTo(p[0] * 100, p[1] * 100);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(60, 180, 220, " + (fade * 0.25) + ")";
      ctx.fill();
      ctx.strokeStyle = "rgba(60, 180, 220, " + (fade * 0.4) + ")";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(WHALE_EYE[0] * 100, WHALE_EYE[1] * 100, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180, 235, 255, " + (fade * 0.5) + ")";
      ctx.fill();

      // Flipper
      ctx.beginPath();
      WHALE_FLIPPER.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p[0] * 100, p[1] * 100);
        else ctx.lineTo(p[0] * 100, p[1] * 100);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(40, 140, 180, " + (fade * 0.2) + ")";
      ctx.fill();

      // Tail
      ctx.beginPath();
      WHALE_TAIL.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p[0] * 100, p[1] * 100);
        else ctx.lineTo(p[0] * 100, p[1] * 100);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(60, 180, 220, " + (fade * 0.2) + ")";
      ctx.fill();
      ctx.restore();

      // ===== More whales appearing with scroll =====
      var whaleCount = Math.floor(1 + sp * 8);
      for (var wi = 1; wi < whaleCount; wi++) {
        var wx = W * (0.15 + Math.random() * 0.7);
        var wy = H * (0.35 + Math.random() * 0.35);
        var ws = 0.08 + Math.random() * 0.12;
        ctx.save();
        ctx.translate(wx, wy);
        ctx.scale(ws * W * 0.002, ws * H * 0.002);
        ctx.beginPath();
        for (var j = 0; j < WHALE_PATH.length; j++) {
          if (j === 0) ctx.moveTo(WHALE_PATH[j][0] * 100, WHALE_PATH[j][1] * 100);
          else ctx.lineTo(WHALE_PATH[j][0] * 100, WHALE_PATH[j][1] * 100);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(60, 180, 220, " + (fade * 0.08) + ")";
        ctx.fill();
        ctx.strokeStyle = "rgba(60, 180, 220, " + (fade * 0.12) + ")";
        ctx.lineWidth = 0.3;
        ctx.stroke();
        ctx.restore();
      }

      // ===== Nutrient particles rising from deep =====
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var pActive = i < Math.floor(sp * particles.length);
        if (!pActive) continue;

        var py = (p.y - (time * p.speed * sp + p.delay * 0.01)) % 0.5;
        var px = p.x + Math.sin(time * 0.5 + p.phase) * p.drift;

        if (py < 0.32 || py > 0.85) continue;

        var alpha = Math.max(0, Math.min(1, 
          (py - 0.32) / 0.08,
          (0.85 - py) / 0.1
        )) * fade * 0.6;

        var nearSurface = py < 0.42;
        var glow = nearSurface ? 3 : 1;

        if (nearSurface) {
          var grad = ctx.createRadialGradient(px * W, py * H, 0, px * W, py * H, p.size * 4);
          grad.addColorStop(0, "rgba(80, 230, 200, " + (alpha * 0.15) + ")");
          grad.addColorStop(1, "rgba(80, 230, 200, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px * W, py * H, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px * W, py * H, p.size * glow * 0.6, 0, Math.PI * 2);
        var color = nearSurface
          ? "rgba(80, 255, 200, " + alpha + ")"
          : "rgba(60, 180, 220, " + (alpha * 0.5) + ")";
        ctx.fillStyle = color;
        ctx.fill();
      }

      // ===== Surface bloom =====
      for (var bi = 0; bi < blooms.length; bi++) {
        var b = blooms[bi];
        var ba = Math.min(1, Math.max(0, sp * 2 - 0.5));
        var bloomActive = bi < Math.floor(ba * blooms.length);
        if (!bloomActive) continue;

        var bx = b.x + Math.sin(time * 0.1 + b.phase) * 0.01;
        var by = b.y + Math.sin(time * 0.15 + b.phase * 1.5) * 0.005;
        var bs = b.size * (0.8 + 0.2 * Math.sin(time + b.phase));

        var bloomGrad = ctx.createRadialGradient(bx * W, by * H, 0, bx * W, by * H, bs * 4);
        bloomGrad.addColorStop(0, "rgba(60, 255, 180, " + (fade * 0.06) + ")");
        bloomGrad.addColorStop(1, "rgba(60, 255, 180, 0)");
        ctx.fillStyle = bloomGrad;
        ctx.beginPath();
        ctx.arc(bx * W, by * H, bs * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bx * W, by * H, bs * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(60, 255, 180, " + (fade * 0.2) + ")";
        ctx.fill();
      }

      // ===== Chart: Whale Population Decline =====
      var chartX = W * 0.06;
      var chartY = H * 0.65;
      var chartW = W * 0.18;
      var chartH = H * 0.18;

      ctx.fillStyle = "rgba(5, 10, 20, " + (fade * 0.3) + ")";
      ctx.strokeStyle = "rgba(232,232,232," + (fade * 0.06) + ")";
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      ctx.roundRect(chartX - 8, chartY - 12, chartW + 16, chartH + 20, 2);
      ctx.fill();
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = "rgba(232,232,232," + (fade * 0.03) + ")";
      ctx.lineWidth = 0.2;
      for (var gi = 0; gi < 4; gi++) {
        var gy = chartY + (chartH / 4) * gi;
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
      }

      var barFill = Math.min(1, sp * 1.5);
      var histH = chartH * 0.92 * barFill;
      ctx.fillStyle = "rgba(60, 180, 220, " + (fade * 0.4) + ")";
      ctx.fillRect(chartX + chartW * 0.12, chartY + chartH - histH, chartW * 0.3, histH);
      ctx.strokeStyle = "rgba(60, 180, 220, " + (fade * 0.6) + ")";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(chartX + chartW * 0.12, chartY + chartH - histH, chartW * 0.3, histH);

      var currH = chartH * 0.092 * barFill;
      ctx.fillStyle = "rgba(255, 138, 61, " + (fade * 0.4) + ")";
      ctx.fillRect(chartX + chartW * 0.58, chartY + chartH - currH, chartW * 0.3, currH);
      ctx.strokeStyle = "rgba(255, 138, 61, " + (fade * 0.6) + ")";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(chartX + chartW * 0.58, chartY + chartH - currH, chartW * 0.3, currH);

      // Chart labels
      ctx.save();
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.25) + ")";
      ctx.fillText("~1,000,000", chartX + chartW * 0.27, chartY + chartH - histH - 6);
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.25) + ")";
      ctx.fillText("~10,000", chartX + chartW * 0.73, chartY + chartH - currH - 6);

      ctx.font = "6px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.15) + ")";
      ctx.fillText("BEFORE WHALING", chartX + chartW * 0.27, chartY + chartH + 14);
      ctx.fillText("TODAY", chartX + chartW * 0.73, chartY + chartH + 14);

      ctx.textAlign = "left";
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.12) + ")";
      ctx.fillText("SOUTHERN OCEAN", chartX + chartW * 0.12, chartY - 16);
      ctx.fillText("BLUE WHALE POPULATION", chartX + chartW * 0.12, chartY - 7);
      ctx.restore();

      // ===== Pump efficiency indicator =====
      var pumpEfficiency = sp * 0.95;
      var pumpX = W * 0.06;
      var pumpY = H * 0.42;

      ctx.save();
      ctx.font = "7px JetBrains Mono, monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.12) + ")";
      ctx.fillText("WHALE PUMP EFFICIENCY", pumpX, pumpY);

      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.04) + ")";
      ctx.fillRect(pumpX, pumpY + 4, chartW, 3);
      ctx.fillStyle = "rgba(60, 255, 200, " + (fade * 0.4) + ")";
      ctx.fillRect(pumpX, pumpY + 4, chartW * pumpEfficiency, 3);

      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.15) + ")";
      ctx.textAlign = "right";
      ctx.fillText(Math.round(pumpEfficiency * 100) + "%", pumpX + chartW, pumpY);
      ctx.restore();

      // ===== Main data text =====
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "11px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.2) + ")";
      ctx.fillText("90% OF WHALES REMOVED", W / 2, H * 0.935);
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.1) + ")";
      ctx.fillText("THE PUMP IS SLOWLY RESTARTING", W / 2, H * 0.935 + 14);
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

