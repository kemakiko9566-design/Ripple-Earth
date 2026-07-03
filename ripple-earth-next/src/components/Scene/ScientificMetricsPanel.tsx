"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Metric Data ──────────────────────────────────────────── */

interface Metric {
  icon: string;  // SVG path
  value: string;
  numeric: number;
  suffix: string;
  description: string;
}

const METRICS: Metric[] = [
  {
    icon: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",  // circle / shield
    value: "280 Million+",
    numeric: 280,
    suffix: "Million+",
    description: "Skin Cancer Cases Prevented",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", // clock
    value: "1.5 Million+",
    numeric: 1.5,
    suffix: "Million+",
    description: "Deaths Prevented",
  },
  {
    icon: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z", // eye
    value: "45 Million+",
    numeric: 45,
    suffix: "Million+",
    description: "Cataracts Prevented",
  },
  {
    icon: "M4 7V4h16v3M4 7l8 5 8-5M4 7v6h16V7M4 17h16M4 21h16", // document / progress
    value: "98%",
    numeric: 98,
    suffix: "%",
    description: "ODS Eliminated",
  },
  {
    icon: "M3.75 3.75v16.5h16.5M3.75 3.75l5.25 7.5 4.5-3 6 7.5", // bar chart trend
    value: "198",
    numeric: 198,
    suffix: "",
    description: "Countries Participating",
  },
];

/* ─── Metric Row ───────────────────────────────────────────── */

function MetricRow({ metric, index, parentId }: { metric: Metric; index: number; parentId: string }) {
  var containerRef = useRef<HTMLDivElement>(null);
  var valueRef = useRef<HTMLSpanElement>(null);
  var svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    var el = containerRef.current;
    if (!el) return;
    var valueEl = valueRef.current;
    var iconEl = svgRef.current;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#" + parentId,
        start: "top 40%",
        end: "top 10%",
        scrub: 1.2,
      },
    });

    tl.fromTo(el, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.1");

    if (valueEl) {
      var target = metric.numeric;
      tl.fromTo(valueEl, { textContent: 0 }, {
        textContent: target,
        duration: 1.2,
        ease: "power1.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          var val = parseFloat(valueEl!.textContent || "0");
          if (metric.suffix) {
            valueEl!.textContent = Math.round(val).toString();
          } else {
            valueEl!.textContent = Math.round(val).toString();
          }
        },
      }, "-=0.3");
    }

    if (iconEl) {
      tl.fromTo(iconEl, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.6");
    }

  }, []);

  return (
    <div ref={containerRef} className="metric-row" style={{ opacity: 0, display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Icon */}
      <div style={{ width: 28, height: 28, flexShrink: 0, marginTop: 2 }}>
        <svg ref={svgRef} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0 }}>
          <path d={metric.icon} />
        </svg>
      </div>
      {/* Content */}
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(22px,2.4vw,32px)", fontWeight: 100, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
          <span ref={valueRef} data-target={metric.numeric}>0</span>
          <span>{metric.suffix && metric.suffix !== "%" ? "" : metric.suffix}</span>
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1vw,13px)", letterSpacing: "0.04em", color: "var(--text-secondary)", margin: "4px 0 0 0", fontWeight: 400 }}>
          {metric.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Footer Sources ───────────────────────────────────────── */

function SourcesFooter() {
  return (
    <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", opacity: 0 }} className="sources-footer">
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/30 mb-3">Scientific Sources</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        {["UNEP", "NASA", "WMO", "Montreal Protocol"].map(function (s) {
          return <span key={s} className="font-mono text-[11px] tracking-[0.06em] text-white/50">{s}</span>;
        })}
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 11 }}>
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/25">Confidence</span>
          <p className="font-mono text-[13px] tracking-[0.04em] text-white/70 mt-1">HIGH</p>
        </div>
        <div>
          <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-white/25">Last Updated</span>
          <p className="font-mono text-[13px] tracking-[0.04em] text-white/70 mt-1">2026</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Panel ───────────────────────────────────────────── */

export default function ScientificMetricsPanel({ sectionId }: { sectionId: string }) {
  var panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    var el = panelRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, x: 30 }, {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: "#" + sectionId, start: "top 65%", end: "top 25%", scrub: 1.5 },
    });
  }, []);

  return (
    <div ref={panelRef} style={{ opacity: 0 }}>
      {/* Section Label */}
      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--scientific-accent)] mb-6">
        BENEFITS TO DATE
      </p>

      {/* Metric Rows */}
      <div>
        {METRICS.map(function (m, i) {
          return <MetricRow key={m.description} metric={m} index={i} parentId={sectionId} />;
        })}
      </div>

      {/* Sources Footer */}
      <SourcesFooter />
    </div>
  );
}
