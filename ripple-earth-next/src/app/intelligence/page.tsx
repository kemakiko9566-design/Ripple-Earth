"use client";
import Link from "next/link";

const METRICS = [
  { name: "CO2 Concentration", value: "427.4", unit: "ppm", source: "NOAA GML • Mauna Loa", year: 2026, trend: "↑" },
  { name: "Temperature Anomaly", value: "+1.25", unit: "°C", source: "NASA GISS", year: 2026, trend: "↑" },
  { name: "Sea Ice Extent", value: "4.23", unit: "million km²", source: "NSIDC", year: 2026, trend: "↓" },
  { name: "Sea Level Rise", value: "3.4", unit: "mm/yr", source: "NASA AVISO", year: 2026, trend: "↑" },
  { name: "Ocean pH", value: "8.07", unit: "pH", source: "NOAA PMEL", year: 2026, trend: "↓" },
  { name: "Active Research", value: "8", unit: "ongoing studies", source: "Ripple Earth Archive", year: 2026, trend: "→" },
];

export default function IntelligencePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px var(--space-10) 80px" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "var(--text-body-small)", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textDecoration: "none", marginBottom: "var(--space-10)", display: "block" }}>
          {"<-"} Back to Earth
        </Link>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, margin: "0 0 var(--space-2)" }}>Earth Intelligence</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "var(--space-12)", lineHeight: 1.6 }}>
          Key environmental indicators tracked by leading research organizations. Data updated annually from open scientific sources.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "var(--space-5)" }}>
          {METRICS.map(function (m) {
            var trendColor = m.trend === "↑" ? "var(--signal-orange)" : m.trend === "↓" ? "var(--accent-cyan)" : "var(--text-muted)";
            return (
          <div key={m.name} className="card card--data">
                <div style={{ padding: "var(--space-6)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-4)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-data-small)", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{m.name.toUpperCase()}</span>
                    <span style={{ color: trendColor, fontSize: "18px" }}>{m.trend}</span>
                  </div>
                  <div style={{ marginBottom: "var(--space-2)" }}>
                    <span style={{ fontSize: "clamp(36px,4vw,48px)", fontWeight: 200, letterSpacing: "-0.02em" }}>{m.value}</span>
                    <span style={{ fontSize: "var(--text-body-small)", color: "var(--text-secondary)", marginLeft: "var(--space-2)" }}>{m.unit}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{m.source}</span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{m.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "var(--space-12)", padding: "var(--space-6)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>
          <h2 style={{ fontSize: "var(--text-heading2)", fontWeight: 300, margin: "0 0 var(--space-4)" }}>Data Sources</h2>
          <p style={{ fontSize: "var(--text-body-small)", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            All data sourced from open environmental monitoring programs: NASA Earth Observatory, NOAA Global Monitoring Laboratory, NSIDC, and UN Environment Programme. For complete methodology and data access, visit the respective organization websites.
          </p>
        </div>
      </div>
    </main>
  );
}
