"use client";
// @ts-nocheck
import { useRef, useEffect } from "react";

// detailed route 閳?48 points for smooth curve
// path: north pacific spill 閳?south toward indonesia 閳?australia 閳?southern ocean 閳?north atlantic 閳?uk
const ROUTE = [
  [0.75,0.12],[0.76,0.14],[0.77,0.16],[0.78,0.18],
  [0.79,0.20],[0.80,0.22],[0.805,0.25],[0.81,0.28],
  [0.815,0.31],[0.81,0.34],[0.80,0.37],[0.79,0.40],
  [0.78,0.43],[0.76,0.46],[0.74,0.49],[0.72,0.52],
  [0.70,0.55],[0.68,0.58],[0.65,0.61],[0.62,0.64],
  [0.59,0.67],[0.56,0.69],[0.53,0.71],[0.50,0.72],
  [0.47,0.73],[0.44,0.74],[0.41,0.74],[0.38,0.73],
  [0.35,0.72],[0.32,0.70],[0.29,0.67],[0.26,0.64],
  [0.24,0.60],[0.22,0.56],[0.21,0.53],[0.20,0.50],
  [0.20,0.47],[0.20,0.44],[0.21,0.41],[0.22,0.38],
  [0.23,0.35],[0.24,0.32],[0.25,0.30],[0.26,0.27],
  [0.28,0.24],[0.30,0.22],[0.32,0.19],[0.34,0.17],
];

const LAT_LINES = [40, 20, 0, -20, -40];

// documented landings from real friendly floatees data
const LANDINGS = [
  { x:0.63, y:0.63, label:"indonesia", year:"1992" },
  { x:0.52, y:0.70, label:"australia", year:"1993" },
  { x:0.38, y:0.73, label:"new zealand", year:"1994" },
  { x:0.22, y:0.52, label:"south america", year:"1998" },
  { x:0.24, y:0.42, label:"brazil", year:"2000" },
  { x:0.28, y:0.22, label:"uk", year:"2003" },
  { x:0.22, y:0.18, label:"canada", year:"2004" },
  { x:0.18, y:0.25, label:"us east coast", year:"2005" },
  { x:0.48, y:0.06, label:"arctic ice", year:"1996-2000" },
  { x:0.72, y:0.04, label:"bering strait", year:"1995" },
];

export default function DuckAnimation({ progress, visible }: { progress: number; visible: boolean }) {
  var canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d")!;

    var rafId = 0;

    function render() {
      var dpr = window.devicePixelRatio || 1;
      var W = canvas.offsetWidth;
      var H = canvas.offsetHeight;
      if (W === 0 || H === 0) { rafId = requestAnimationFrame(render); return; }
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, W, H);

      function stp(t: number){return t<0?0:t>1?1:t*t*(3-2*t)}
      var rawFade = Math.min(1, Math.max(0,
        (progress - 0.28) / 0.12,
        (0.65 - progress) / 0.10
      ));
      var fade = stp(rawFade);
      if (fade <= 0) { rafId = requestAnimationFrame(render); return; }

      // ship travel progress (0-1)
      var sp = Math.max(0, Math.min(1, (progress - 0.35) / 0.25));

      // --- dark ocean background ---
      ctx.fillStyle = "rgba(5,8,20," + (fade * 0.85) + ")";
      ctx.fillRect(0, 0, W, H);

      // --- latitude reference lines ---
      ctx.strokeStyle = "rgba(255,255,255," + (0.035 * fade) + ")";
      ctx.lineWidth = 0.5;
      ctx.font = "7px monospace";
      ctx.fillStyle = "rgba(255,255,255," + (0.08 * fade) + ")";
      LAT_LINES.forEach(function (lat) {
        var y = (60 - lat) / 120 * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        ctx.fillText(lat + "\u00B0", 4, y - 2);
      });

      // --- header ---
      ctx.font = "8px monospace";
      ctx.fillStyle = "rgba(0,229,255," + (0.2 * fade) + ")";
      ctx.fillText("ANOMALY TRACE // PACIFIC OCEAN CURRENT DRIFT", 14, 24);

      // project route to pixel coords
      var routePx = ROUTE.map(function (p) { return [p[0] * W, p[1] * H]; });

      // --- full route: fine white dashed with animated offset ---
      ctx.save();
      ctx.strokeStyle = "rgba(255,255,255," + (0.25 * fade) + ")";
      ctx.lineWidth = 0.7;
      ctx.setLineDash([3, 5]);
      ctx.lineDashOffset = -Date.now() / 250;
      ctx.beginPath();
      routePx.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]);
      });
      ctx.stroke();
      ctx.restore();

      // --- travelled trail: yellow ---
      var trailLen = Math.floor(sp * (ROUTE.length - 1));
      if (trailLen > 0) {
        // glow
        ctx.save();
        ctx.strokeStyle = "rgba(255,200,50," + (0.12 * fade) + ")";
        ctx.lineWidth = 8;
        ctx.beginPath();
        for (var i = 0; i <= trailLen; i++) { var p = routePx[i]; if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); }
        ctx.stroke();
        ctx.restore();
        // core line
        ctx.save();
        ctx.strokeStyle = "rgba(255,200,50," + (0.7 * fade) + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (var i = 0; i <= trailLen; i++) { var p = routePx[i]; if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); }
        ctx.stroke();
        ctx.restore();
      }

      // --- container ship emoji (large, with glow) ---
      if (trailLen > 0) {
        var si = Math.min(trailLen, routePx.length - 2);
        var sx = routePx[si][0], sy = routePx[si][1];
        // glow
        var grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 35);
        grad.addColorStop(0, "rgba(255,200,50,0.12)");
        grad.addColorStop(1, "rgba(255,200,50,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(sx, sy, 35, 0, Math.PI * 2); ctx.fill();
        // ship emoji (large)
        ctx.font = "38px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("\uD83D\uDEA2", sx, sy);
      }

      // --- start marker ---
      var [mx, my] = routePx[0];
      ctx.save();
      ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,200,80," + (0.5 * fade) + ")";
      ctx.fill();
      ctx.beginPath(); ctx.arc(mx, my, 7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,200,80," + (0.15 * fade) + ")";
      ctx.lineWidth = 0.5; ctx.stroke();
      ctx.restore();
      // label
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255,200,80," + (0.6 * fade) + ")";
      ctx.fillText("1992 \u2022 28,800 DUCKS RELEASED", mx + 14, my + 4);

      // --- duck scatter at landing points (emoji + label) ---
      LANDINGS.forEach(function (l, idx) {
        var appearAt = 0.3 + (idx / LANDINGS.length) * 0.5;
        var dFade = Math.min(1, Math.max(0, (sp - appearAt + 0.08) / 0.08));
        if (dFade <= 0) return;

        var lx = l.x * W, ly = l.y * H;
        var pulse = 1 + Math.sin(Date.now() / 400 + idx) * 0.15;

        // glow
        ctx.beginPath(); ctx.arc(lx, ly, 10 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,0," + (0.04 * dFade) + ")"; ctx.fill();

        // duck emoji
        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = dFade;
        ctx.fillText("\uD83D\uDC24", lx, ly);
        ctx.globalAlpha = 1;

        // label
        ctx.font = "7px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255,200,80," + (0.5 * dFade) + ")";
        ctx.fillText(l.label, lx + 13, ly - 1);
        ctx.fillStyle = "rgba(255,255,255," + (0.2 * dFade) + ")";
        ctx.fillText(l.year, lx + 13, ly + 8);
      });

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);
    return function () { cancelAnimationFrame(rafId); };
  }, [progress, visible]);

  if (!visible) return null;

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      pointerEvents: "none", zIndex: 2,
    }} />
  );
}
