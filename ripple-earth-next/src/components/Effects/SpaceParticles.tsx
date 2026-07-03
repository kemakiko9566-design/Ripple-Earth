"use client";
import { useRef, useEffect } from "react";

export default function SpaceParticles({ progress }: { progress: number }) {
  var canvasRef = useRef<HTMLCanvasElement>(null);
  var animRef = useRef(0);

  useEffect(() => {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var w = 0, h = 0;
    var resize = function () {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    var stars = Array.from({ length: 400 }, function () {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * (Math.random() > 0.95 ? 2.5 : 1.0),
        dx: (Math.random() - 0.5) * 0.08,
        dy: (Math.random() - 0.5) * 0.08,
        alpha: 0.3 + Math.random() * 0.7,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.015,
      };
    });

    var start = performance.now();

    var animate = function () {
      var t = (performance.now() - start) / 1000;
      ctx!.clearRect(0, 0, w, h);

      // Very subtle dark blue gradient background
      var bg = ctx!.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w, h) * 0.7);
      bg.addColorStop(0, "rgba(5, 12, 25, 1)");
      bg.addColorStop(1, "rgba(2, 5, 10, 1)");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      // Draw stars
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        s.pulse += s.speed;
        var a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));

        // Glow for brighter stars
        if (s.r > 1.5) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(180, 235, 255, " + (a * 0.12).toFixed(3) + ")";
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(200, 240, 255, " + a.toFixed(3) + ")";
        ctx!.fill();
      }

      // Subtle connections between nearby stars
      for (var j = 0; j < stars.length; j += 3) {
        var s1 = stars[j];
        for (var k = j + 1; k < j + 4 && k < stars.length; k++) {
          var s2 = stars[k];
          var dx = s1.x - s2.x;
          var dy = s1.y - s2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var connAlpha = (1 - dist / 120) * 0.08;
            ctx!.beginPath();
            ctx!.moveTo(s1.x, s1.y);
            ctx!.lineTo(s2.x, s2.y);
            ctx!.strokeStyle = "rgba(150, 220, 255, " + connAlpha.toFixed(3) + ")";
            ctx!.lineWidth = 0.4;
            ctx!.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return function () {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
