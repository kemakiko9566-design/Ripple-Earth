"use client";
import { useRef, useEffect } from "react";

// Duck drift path (schematic normalized coords)
const ROUTE = [
  [0.52,0.08],[0.54,0.10],[0.56,0.12],[0.58,0.14],[0.60,0.17],
  [0.62,0.20],[0.63,0.23],[0.64,0.26],[0.64,0.29],[0.63,0.32],
  [0.62,0.35],[0.60,0.38],[0.58,0.41],[0.56,0.44],[0.53,0.47],
  [0.50,0.49],[0.47,0.51],[0.44,0.53],[0.41,0.54],[0.38,0.55],
  [0.35,0.55],[0.32,0.54],[0.29,0.53],[0.26,0.51],[0.24,0.49],
  [0.22,0.47],[0.20,0.44],[0.19,0.41],[0.18,0.38],[0.18,0.35],
  [0.19,0.32],[0.20,0.29],[0.22,0.26],[0.24,0.24],[0.26,0.22],
];

const LANDINGS = [
  { x:0.53,y:0.46,label:"Indonesia",year:"1992" },
  { x:0.44,y:0.52,label:"Australia",year:"1993" },
  { x:0.35,y:0.55,label:"New Zealand",year:"1994" },
  { x:0.19,y:0.42,label:"South America",year:"1998" },
  { x:0.20,y:0.33,label:"Brazil",year:"2000" },
  { x:0.26,y:0.20,label:"UK",year:"2003" },
  { x:0.22,y:0.16,label:"Canada",year:"2004" },
  { x:0.17,y:0.22,label:"US East Coast",year:"2005" },
  { x:0.72,y:0.04,label:"Bering Strait",year:"1995" },
];

export default function DuckTrail({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLCanvasElement>(null);

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

      // scene fade
      var fade = Math.min(1, Math.max(0, (progress - 0.30) / 0.05, (0.62 - progress) / 0.05));
      if (fade <= 0) { raf = requestAnimationFrame(render); return; }

      var sp = Math.max(0, Math.min(1, (progress - 0.33) / 0.25));
      var trailLen = Math.floor(sp * (ROUTE.length - 1));
      var px = ROUTE.map(function (p) { return [p[0] * W, p[1] * H]; });

      // Full route (white dashed)
      ctx.save();
      ctx.strokeStyle = "rgba(232,232,232," + (0.2 * fade) + ")";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.lineDashOffset = -Date.now() / 300;
      ctx.beginPath();
      px.forEach(function (p, i) { if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
      ctx.stroke();
      ctx.restore();

      // Travelled trail (yellow)
      if (trailLen > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,200,50," + (0.6 * fade) + ")";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (var i = 0; i <= trailLen; i++) {
          if (i === 0) ctx.moveTo(px[i][0], px[i][1]); else ctx.lineTo(px[i][0], px[i][1]);
        }
        ctx.stroke();
        // glow
        ctx.strokeStyle = "rgba(255,200,50," + (0.1 * fade) + ")";
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (var i = 0; i <= trailLen; i++) {
          if (i === 0) ctx.moveTo(px[i][0], px[i][1]); else ctx.lineTo(px[i][0], px[i][1]);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Start marker
      var [sx, sy] = px[0];
      ctx.save();
      ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,80," + (0.6 * fade) + ")"; ctx.fill();
      ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,200,80," + (0.15 * fade) + ")"; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(255,200,80," + (0.5 * fade) + ")";
      ctx.fillText("1992 \u2022 28,800 DUCKS RELEASED", sx + 12, sy + 3);
      ctx.restore();

      // Landing markers
      LANDINGS.forEach(function (l, idx) {
        var appear = 0.2 + (idx / LANDINGS.length) * 0.6;
        var lf = Math.min(1, Math.max(0, (sp - appear + 0.06) / 0.06));
        if (lf <= 0) return;
        var lx = l.x * W, ly = l.y * H;
        ctx.beginPath(); ctx.arc(lx, ly, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,200,80," + (0.4 * lf) + ")"; ctx.fill();
        ctx.font = "6px JetBrains Mono, monospace";
        ctx.fillStyle = "rgba(255,200,80," + (0.35 * lf) + ")";
        ctx.fillText(l.label, lx + 5, ly + 1);
        ctx.fillStyle = "rgba(232,232,232," + (0.15 * lf) + ")";
        ctx.fillText(l.year, lx + 5, ly + 8);
      });

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

