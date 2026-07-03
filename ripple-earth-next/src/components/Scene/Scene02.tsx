"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SYSTEMS = [
  {
    id: "climate",
    label: "Climate",
    metric: "427 ppm",
    subMetric: "+1.45°C anomaly",
    description:
      "Atmospheric CO₂ at its highest in 3+ million years. The climate system responds — shifting currents, intensifying storms, rewriting seasonal rhythms across every continent.",
    sources: ["NOAA GML", "NASA GISS"],
    accent: "var(--signal-orange)",
  },
  {
    id: "pollution",
    label: "Pollution",
    metric: "125–350T",
    subMetric: "+50% light in 25 yrs",
    description:
      "Microplastic particles float in every ocean basin, falling from the sky onto Arctic ice. Artificial night light has rewritten the planet's day-night cycle, disrupting migration and bloom.",
    sources: ["UNEP", "Science Advances"],
    accent: "var(--alert-red)",
  },
  {
    id: "forest",
    label: "Forest",
    metric: "289 Gt C",
    subMetric: "–10M ha / yr",
    description:
      "Forests store more carbon than all known oil reserves. Every year, an area the size of Iceland is cleared — releasing ancient carbon and silencing the planet's largest terrestrial filter.",
    sources: ["FAO", "IPCC"],
    accent: "var(--success-green)",
  },
  {
    id: "ocean",
    label: "Ocean",
    metric: "+4.8 mm/yr",
    subMetric: "pH 8.07 · 30% more acidic",
    description:
      "The ocean has absorbed 90% of excess heat and 25% of all CO₂ emissions. Rising seas and shifting chemistry are redrawing coastlines and dissolving the foundation of the marine food web.",
    sources: ["NOAA", "IPCC AR6"],
    accent: "var(--accent-cyan)",
  },
];

export default function Scene02() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current!.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: "#systems",
            start: "top 65%",
            end: "top 30%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        gridRef.current!.children,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: "#systems",
            start: "top 55%",
            end: "top 15%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="scene-section flex flex-col justify-center min-h-[112vh] px-[clamp(20px,4vw,56px)] py-[12vh]"
    >
      {/* ---- decorative grid lines (blueprint aesthetic) ---- */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="sys-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sys-grid)" />
        </svg>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-30" />
      </div>

      {/* ---- heading ---- */}
      <div ref={headingRef} className="relative z-10 mb-[clamp(32px,5vh,60px)] max-w-[800px]">
        <p className="text-[var(--accent-cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[14px] font-mono">
          02 / The Hidden Systems
        </p>
        <h2 className="text-[clamp(26px,3.4vw,50px)] font-[680] leading-[1.05] mb-3">
          Four systems.
          <br />
          One planet. Everything connected.
        </h2>
        <p className="text-[var(--text-secondary)] text-[clamp(14px,1.6vw,19px)] leading-[1.6] max-w-[580px]">
          Each domain hides a network of interactions that shape the world beneath the surface we see.
        </p>
      </div>

      {/* ---- data cards grid ---- */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-[clamp(10px,1.2vw,18px)] max-w-[1060px] w-full"
      >
        {SYSTEMS.map((sys) => (
          <div
            key={sys.id}
            className="group glass-panel rounded-[10px] p-[clamp(18px,2.2vw,30px)] transition-all duration-[400ms] hover:border-[rgba(255,255,255,0.12)]"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            {/* indicator bar */}
            <div
              className="w-[32px] h-[2.5px] rounded-full mb-[14px] transition-all duration-500 group-hover:w-[48px]"
              style={{ background: sys.accent }}
            />

            {/* title row */}
            <div className="flex items-center justify-between mb-[10px]">
              <h3 className="text-[14px] font-[600] tracking-[0.06em] uppercase text-[rgba(255,255,255,0.8)]">
                {sys.label}
              </h3>
              <span className="font-mono text-[10px] tracking-[0.1em] text-[var(--text-secondary)]">
                SYS-{sys.id.toUpperCase()}
              </span>
            </div>

            {/* metric */}
            <p
              className="font-mono text-[clamp(32px,3vw,44px)] font-[500] leading-[1] mb-[4px] tracking-[-0.02em]"
              style={{ color: sys.accent }}
            >
              {sys.metric}
            </p>
            <p className="font-mono text-[11px] text-[var(--text-secondary)] tracking-[0.02em] mb-[14px]">
              {sys.subMetric}
            </p>

            {/* description */}
            <p className="text-[var(--text-data)] text-[13px] leading-[1.7]">
              {sys.description}
            </p>

            {/* sources */}
            <div className="flex gap-[10px] mt-[14px] pt-[12px] border-t border-[rgba(255,255,255,0.04)]">
              {sys.sources.map((src) => (
                <span
                  key={src}
                  className="font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--text-muted)]"
                >
                  {src}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
