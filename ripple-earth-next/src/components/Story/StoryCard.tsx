"use client";
import Link from "next/link";

interface Props { id: string; title: string; subtitle: string; body?: string; systems: string[]; year: number; gradient: string; }

export default function StoryCard({ id, title, subtitle, systems, year, gradient }: Props) {
  var symbol = "\u00b7";
  if (systems.includes("ocean")) symbol = "~";
  else if (systems.includes("climate")) symbol = "\u25b3";
  
  return (
    <Link href={"/stories/" + id}
      style={{ textDecoration: "none", color: "inherit", breakInside: "avoid", display: "block", marginBottom: "var(--space-5)" }}
      data-cursor-interactive>
      <div className="card">
        <div style={{ height: id.charCodeAt(0) % 2 === 0 ? "180px" : "260px", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "rgba(255,255,255,0.15)" }}>
          {symbol}
        </div>
        <div style={{ padding: "var(--space-5)" }}>
          <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
            {systems.map(function (s) {
              return <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-data-small)", letterSpacing: "0.08em", color: "var(--accent-cyan)", border: "1px solid rgba(0,229,255,0.15)", padding: "2px 8px", borderRadius: "var(--radius-sm)" }}>
                {s}
              </span>;
            })}
          </div>
          <h3 style={{ fontSize: "var(--text-heading3)", fontWeight: "var(--weight-medium)", margin: 0, lineHeight: 1.3, color: "var(--text-primary)" }}>{title}</h3>
          <p style={{ fontSize: "var(--text-body-small)", color: "var(--text-secondary)", margin: "var(--space-2) 0 0", lineHeight: 1.5 }}>{subtitle}</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-data-small)", color: "var(--text-muted)", marginTop: "var(--space-3)" }}>{year}</p>
        </div>
      </div>
    </Link>
  );
}
