"use client";
import { useRef, useEffect } from "react";

const PORTS = [
  { x:0.72,y:0.33,name:"Shanghai" }, { x:0.60,y:0.58,name:"Singapore" },
  { x:0.35,y:0.30,name:"Rotterdam" }, { x:0.10,y:0.28,name:"Los Angeles" },
  { x:0.28,y:0.42,name:"New York" }, { x:0.55,y:0.42,name:"Dubai" },
  { x:0.42,y:0.72,name:"Cape Town" }, { x:0.08,y:0.42,name:"Panama" },
  { x:0.38,y:0.22,name:"London" }, { x:0.20,y:0.45,name:"Rio" },
];

const ROUTES = [[0,1],[1,2],[2,3],[3,0],[0,2],[4,2],[5,1],[5,6],[4,7],[7,6],[8,2],[9,4]];

export default function BallastData({ progress, visible }: { progress: number; visible: boolean }) {
  var ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!visible) return;
    var canvas = ref.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    var raf = 0;

    function render() { if (!canvas) return; if (!canvas) return;
      var dpr = window.devicePixelRatio || 1;
      var W = canvas.offsetWidth;
      var H = canvas.offsetHeight;
      if (W === 0 || H === 0) { raf = requestAnimationFrame(render); return; }
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, W, H);

      var fade = Math.min(1, Math.max(0, (progress - 0.62) / 0.04, (0.82 - progress) / 0.04));
      if (fade <= 0) { raf = requestAnimationFrame(render); return; }
      var sp = Math.max(0, Math.min(1, (progress - 0.65) / 0.14));

      ctx.fillStyle = "rgba(5,5,5," + (fade * 0.6) + ")";
      ctx.fillRect(0, 0, W, H);

      // Lat/lon grid
      ctx.strokeStyle = "rgba(232,232,232," + (fade * 0.03) + ")";
      ctx.lineWidth = 0.3;
      for (var gx = 0; gx < W; gx += W / 18) { ctx.beginPath(); ctx.moveTo(gx,0); ctx.lineTo(gx,H); ctx.stroke(); }
      for (var gy = 0; gy < H; gy += H / 10) { ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke(); }

      // Routes
      var routeCount = Math.floor(sp * ROUTES.length);
      for (var ri = 0; ri < routeCount; ri++) {
        var r = ROUTES[ri];
        var p1 = PORTS[r[0]], p2 = PORTS[r[1]];
        var cx = (p1.x + p2.x) / 2;
        var cy = (p1.y + p2.y) / 2;
        var offset = (p1.y - p2.y) * 0.3;
        ctx.save();
        ctx.strokeStyle = "rgba(76,201,240," + (fade * 0.12) + ")";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p1.x * W, p1.y * H);
        ctx.quadraticCurveTo(cx * W + offset * W, cy * H, p2.x * W, p2.y * H);
        ctx.stroke();
        ctx.restore();
      }

      // Ports
      PORTS.forEach(function (p, i) {
        var isActive = i < routeCount + 1;
        if (!isActive) return;
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,232,232," + (fade * 0.5) + ")";
        ctx.fill();
        ctx.font = "6px JetBrains Mono, monospace";
        ctx.fillStyle = "rgba(232,232,232," + (fade * 0.2) + ")";
        ctx.fillText(p.name, p.x * W + 5, p.y * H + 1);
      });

      // Species spread
      for (var si = 0; si < 3; si++) {
        var origin = PORTS[(si * 3) % PORTS.length];
        var radius = sp * 0.08 * W * (1 + Math.sin(Date.now() / 2000 + si) * 0.1);
        ctx.beginPath(); ctx.arc(origin.x * W, origin.y * H, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,138,61," + (fade * 0.04) + ")";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,138,61," + (fade * 0.1) + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Text
      ctx.save(); ctx.textAlign = "center";
      ctx.font = "10px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.3) + ")";
      ctx.fillText("7,000 SPECIES TRANSPORTED DAILY", W / 2, H * 0.86);
      ctx.font = "8px JetBrains Mono, monospace";
      ctx.fillStyle = "rgba(232,232,232," + (fade * 0.12) + ")";
      ctx.fillText("IN BALLAST WATER", W / 2, H * 0.86 + 14);
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

