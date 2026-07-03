"use client";
import { useEffect, useState, useCallback } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";

const SCENES = ["Origin", "Systems", "Descent", "Surface", "Spill", "Drift", "Future"];

export default function SceneIndex() {
  const [active, setActive] = useState(0);
  const { scrollTo } = useLenisScroll();

  useEffect(() => {
    var ids = ["origin", "systems", "descent", "surface", "spill", "impact", "legacy"];

    var onScroll = function () {
      var mid = window.innerHeight * 0.5;
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) {
          var r = el.getBoundingClientRect();
          if (r.top <= mid && r.bottom >= mid) {
            setActive(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return function () { window.removeEventListener("scroll", onScroll); };
  }, []);

  var handleClick = useCallback(function (id: string) {
    scrollTo("#" + id, { duration: 1.8, easing: function (t: number) { return Math.min(1, 1 - Math.pow(1 - t, 3)); } });
  }, [scrollTo]);

  return (
    <aside className="glass-panel hidden md:flex flex-col gap-[6px] w-[104px] p-[8px] rounded-[8px] fixed right-[clamp(16px,3vw,42px)] top-1/2 z-25 -translate-y-1/2">
      {(["origin", "systems", "descent", "surface", "spill", "impact", "legacy"] as const).map(function (id, i) {
        var isActive = i === active;
        return (
          <button
            key={id}
            data-cursor-interactive
            onClick={function () { handleClick(id); }}
            style={{
              padding: "8px 9px",
              borderRadius: "6px",
              fontSize: "11px",
              cursor: "pointer",
              border: "none",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontWeight: isActive ? 500 : 400,
              textAlign: "left",
              letterSpacing: "0.02em",
              background: isActive ? "rgba(109,231,255,0.12)" : "transparent",
              color: isActive ? "var(--ink)" : "rgba(240,248,255,0.44)",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              width: "100%",
            }}
            onMouseEnter={function (e) { if (!isActive) { e.currentTarget.style.background = "rgba(109,231,255,0.08)"; e.currentTarget.style.color = "rgba(240,248,255,0.7)"; }}}
            onMouseLeave={function (e) { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(240,248,255,0.44)"; }}}
          >
            {SCENES[i]}
          </button>
        );
      })}
    </aside>
  );
}
