"use client";
import { useRef, useEffect } from "react";

function particle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, alpha: number) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(109, 231, 255, " + alpha.toFixed(3) + ")";
  ctx.fill();
}

export default function RippleEffect({ progress }: { progress: number }) {
  var canvasRef = useRef<HTMLCanvasElement>(null!);
  var animRef = useRef(0);

  var visibleOpacity = Math.max(0, Math.min(1, (progress - 0.02) * 5));

  useEffect(() => {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    var w = 0, h = 0;
    var resize = function () {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    var particles: any[] = [];
    var lastWave = 0;
    var start = performance.now();
    var running = true;

    var animate = function () {
      if (!running) return;

      // Adaptive rate: skip frames when not visible
      if (visibleOpacity <= 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      var t = (performance.now() - start) / 1000;
      var cx = w * 0.5;
      var cy = h * 0.5;

      var wavePhase = (t * 1.8) % 1;

      // Layer 1: Center disturbance
      var corePulse = 0.7 + Math.sin(t * 4) * 0.3;
      var coreRadius = 18 * corePulse;
      var cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2);
      cg.addColorStop(0, "rgba(190, 245, 255, " + (0.6 * corePulse).toFixed(3) + ")");
      cg.addColorStop(0.5, "rgba(109, 231, 255, " + (0.3 * corePulse).toFixed(3) + ")");
      cg.addColorStop(1, "rgba(109, 231, 255, 0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Layer 2: Expanding wave rings
      var waveRings = 3;
      for (var i = 0; i < waveRings; i++) {
        var offset = i * 0.25;
        var ringPhase = (wavePhase + offset) % 1;
        var ringRadius = ringPhase * Math.max(w, h) * 0.6;
        var ringAlpha = Math.max(0, 1 - ringPhase * 1.2) * 0.18 * (1 - i * 0.15);
        if (ringAlpha > 0.01) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, ringRadius, ringRadius * 0.65, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(109, 231, 255, " + ringAlpha.toFixed(3) + ")";
          ctx.lineWidth = Math.max(0.5, 3 * (1 - ringPhase));
          ctx.stroke();
        }
      }

      // Layer 3: Particle scatter
      var waveFront = wavePhase * Math.max(w, h) * 0.6;
      if (wavePhase > 0.01 && wavePhase < 0.98) {
        var spawnRate = Math.floor(1 + (1 - wavePhase) * 2);
        for (var p = 0; p < spawnRate; p++) {
          var angle = Math.random() * Math.PI * 2;
          var dist = waveFront + (Math.random() - 0.5) * 30;
          particles.push({
            angle: angle,
            dist: dist,
            speed: 80 + Math.random() * 40,
            size: 1.0 + Math.random() * 1.8,
            life: 1.0,
          });
        }
      }

      // Update and draw particles
      for (var pi = particles.length - 1; pi >= 0; pi--) {
        var pt = particles[pi];
        pt.dist += pt.speed * (1 / 60);
        pt.life -= 0.012 * (1 + (1 - pt.life) * 2);
        if (pt.life <= 0) {
          particles.splice(pi, 1);
          continue;
        }
        var px = cx + Math.cos(pt.angle) * pt.dist;
        var py = cy + Math.sin(pt.angle) * pt.dist;
        var pa = pt.life * 0.35;
        if (px > 0 && px < w && py > 0 && py < h) {
          particle(ctx, px, py, pt.size * pt.life, pa);
        } else {
          particles.splice(pi, 1);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return function () {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [visibleOpacity]);

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none"
      style={{ opacity: visibleOpacity }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}

