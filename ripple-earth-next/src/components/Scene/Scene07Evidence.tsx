"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import ScientificMetricsPanel from "./ScientificMetricsPanel";
import type { OzoneState } from "./TimelineGlobe";

gsap.registerPlugin(ScrollTrigger);

const TimelineGlobe = dynamic(() => import("./TimelineGlobe"), { ssr: false });

/* ─── Timeline Data ────────────────────────────────────────── */

interface GlobeEntry { state: OzoneState; label: string; caption: string; }

const GLOBES: GlobeEntry[] = [
  { state: "damage",   label: "1980", caption: "The Hole Begins" },
  { state: "worst",    label: "2000", caption: "At Its Worst" },
  { state: "recovery", label: "2040 (Forecast)", caption: "On The Path To Recovery" },
];

/* ─── SVG Connector ────────────────────────────────────────── */

function TimelineConnector({ index }: { index: number }) {
  var pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    var el = pathRef.current;
    if (!el) return;
    var length = el.getTotalLength();
    el.style.strokeDasharray = length.toString();
    el.style.strokeDashoffset = length.toString();
    gsap.to(el, {
      strokeDashoffset: 0, duration: 1.0, ease: "none",
      scrollTrigger: { trigger: "#future", start: "top 55%", end: "top 25%", scrub: 1.2 },
    });
  }, []);

  return (
    <div style={{ width: 40, height: 60, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
        <path ref={pathRef} d="M2 30 L38 30" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M34 26 L38 30 L34 34" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

/* ─── Timeline Section ─────────────────────────────────────── */

function TimelineSection() {
  var labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    var labels = labelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (labels.length) {
      gsap.fromTo(labels, { opacity: 0, y: 15, filter: "blur(4px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: "#future", start: "top 60%", end: "top 20%", scrub: 1.2 },
      });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/25 mb-3">
        Scientific Time Comparison
      </p>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 0 }}>
        {GLOBES.map(function (g, i) {
          return (
            <div key={g.state} style={{ flex: 1, display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ flex: 1, minHeight: 200 }}>
                <TimelineGlobe state={g.state} />
              </div>
              {i < GLOBES.length - 1 && <TimelineConnector index={i} />}
            </div>
          );
        })}
      </div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {GLOBES.map(function (g, i) {
          return (
            <div key={g.label} ref={(el) => { labelRefs.current[i] = el; }} style={{ textAlign: "center", opacity: 0 }}>
              <p className="font-mono text-[clamp(11px,1.1vw,13px)] tracking-[0.12em] text-white/80 mb-1">{g.label}</p>
              <p className="font-mono text-[clamp(9px,0.9vw,11px)] tracking-[0.06em] text-white/40">{g.caption}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section Title ────────────────────────────────────────── */

function SectionTitle() {
  var ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    var el = ref.current; if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20, filter: "blur(6px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: "#future", start: "top 75%", end: "top 45%", scrub: 1.2 },
    });
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: "clamp(16px,2.5vh,32px)" }}>
      <p className="font-mono text-[clamp(10px,1vw,12px)] tracking-[0.16em] uppercase text-[var(--scientific-accent)] mb-2">06 / Possible Future</p>
      <h2 className="font-sans text-[clamp(26px,3.2vw,48px)] font-[100] leading-[1.05] tracking-[-0.02em] text-white max-w-[560px]">
        Scientific Evidence<br />
        <span className="text-white/40 text-[clamp(14px,1.4vw,20px)] font-[200]">Ozone Layer Recovery</span>
      </h2>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */

export default function Scene07Evidence() {
  return (
    <section
      id="future"
      className="scene-section scene-section--evidence"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "12vh clamp(20px,4vw,56px)",
        background: "var(--bg-deep)",
        position: "relative",
      }}
    >
      <SectionTitle />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "clamp(24px,3vw,48px)",
          flex: 1,
          minHeight: 0,
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div style={{ width: "100%" }}>
          <TimelineSection />
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <ScientificMetricsPanel sectionId="future" />
        </div>
      </div>
    </section>
  );
}


