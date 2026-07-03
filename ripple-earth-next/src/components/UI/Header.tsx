"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Experience", href: "/" },
  { label: "Archive", href: "/stories" },
  { label: "Intelligence", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pulse", href: "#" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseNearTop = useRef(false);
  const atBottom = useRef(false);

  useEffect(() => {
    function startTimer(delay: number) {
      if (hideTimer.current !== null) { clearTimeout(hideTimer.current); hideTimer.current = null; }
      hideTimer.current = setTimeout(function () {
        if (!mouseNearTop.current && !atBottom.current) setVisible(false);
        hideTimer.current = null;
      }, delay);
    }

    function handleMove(e: MouseEvent) {
      var nearTop = e.clientY < 60;
      mouseNearTop.current = nearTop;
      if (nearTop) {
        setVisible(true);
        if (hideTimer.current !== null) { clearTimeout(hideTimer.current); hideTimer.current = null; }
      } else if (e.clientY > 120 && !atBottom.current) { startTimer(2000); }
    }

    function handleScroll() {
      var b = window.innerHeight + window.scrollY;
      var h = document.documentElement.scrollHeight;
      var nearBottom = b >= h - 100;
      atBottom.current = nearBottom;
      if (nearBottom) {
        setVisible(true);
        if (hideTimer.current !== null) { clearTimeout(hideTimer.current); hideTimer.current = null; }
      } else if (!mouseNearTop.current) { startTimer(1500); }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer.current !== null) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    };
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 30,
      transform: visible ? "translateY(0)" : "translateY(-100%)",
      transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      background: "rgba(0,0,0,0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px 0 24px", height: "52px",
        maxWidth: "100%", margin: "0 auto",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "rgba(255,255,255,0.92)", flexShrink: 0 }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", boxShadow: "0 0 10px rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "-0.01em", fontFamily: "Inter, -apple-system, system-ui, sans-serif" }}>Ripple Earth</span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            {NAV_ITEMS.map(function (item) {
              var enabled = item.href !== "#";
              return (
                <Link key={item.label} href={item.href}
                  data-cursor-interactive
                  style={{
                    padding: "6px 10px", borderRadius: "4px", textDecoration: "none",
                    color: enabled ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)",
                    fontSize: "12px", fontFamily: "Inter, -apple-system, system-ui, sans-serif",
                    fontWeight: 400, letterSpacing: "0.02em",
                    transition: "color 0.2s",
                    cursor: enabled ? "pointer" : "default",
                  }}
                  onMouseEnter={function (e) { if (enabled) e.currentTarget.style.color = "rgba(255,255,255,0.85)"; }}
                  onMouseLeave={function (e) { e.currentTarget.style.color = enabled ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)"; }}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button onClick={function () { setSoundOn(!soundOn); }}
            data-cursor-interactive
            type="button" aria-pressed={soundOn}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "rgba(255,255,255,0.25)", fontSize: "11px", fontFamily: "Inter, -apple-system, system-ui, sans-serif", fontWeight: 300, letterSpacing: "0.02em", cursor: "pointer", padding: "4px 8px" }}>
            <span style={{ display: "inline-flex", alignItems: "flex-end", gap: "2px", width: "12px", height: "10px" }}>
              {[0, 1, 2].map(function (i) {
                return <i key={i} style={{ width: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.4)", height: [4, 8, 6][i] + "px", opacity: soundOn ? 1 : 0.4 }} />;
              })}
            </span>
            <span className="hidden sm:inline" style={{ fontSize: "11px" }}>Ambient</span>
          </button>
        </div>
      </div>
    </header>
  );
}
