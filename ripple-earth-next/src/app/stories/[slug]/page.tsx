"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import data from "@/data/stories.json";

const GRADIENTS: Record<string, string> = {
  whale_pump: "linear-gradient(135deg, #0B2D4E, #1A6B8A)",
  concrete_paradox: "linear-gradient(135deg, #1a1a2e, #2d2d44)",
  plastic_sky: "linear-gradient(135deg, #2A1A00, #5A4A00)",
  ozone_divide: "linear-gradient(135deg, #002A3A, #005A6A)",
  zombie_fire: "linear-gradient(135deg, #3A1A00, #6A3A00)",
  dark_fleet: "linear-gradient(135deg, #1A0000, #3A1010)",
  sleeping_giant: "linear-gradient(135deg, #001A1A, #003A2A)",
  invisible_orchestra: "linear-gradient(135deg, #1A002A, #3A005A)",
};

export default function StoryDetailPage() {
  var params = useParams();
  var slug = params.slug as string;
  var stories = data as any[];
  var story = stories.find(function (s: any) { return s.id === slug; });

  if (!story) {
    return (
      <main style={{ minHeight: "100vh", background: "#0A0E1A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <h1>Story not found</h1>
        <Link href="/stories" style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: "12px" }}>{"<"} Back to Archive</Link>
      </main>
    );
  }

  var grad = GRADIENTS[slug] || "linear-gradient(135deg,#1a1a2e,#2d2d44)";

  return (
    <main style={{ minHeight: "100vh", background: "#0A0E1A", color: "#fff" }}>
      <div style={{ height: "50vh", background: grad, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "32px", left: "32px", zIndex: 2 }}>
          <Link href="/stories" style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "monospace", letterSpacing: "0.12em", textDecoration: "none" }}>
            {"<"} Archive
          </Link>
        </div>
        <div style={{ textAlign: "center", maxWidth: "600px", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontFamily: "monospace", letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            ANOMALY // {story.year}
          </p>
          <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 300, margin: "0 0 12px", lineHeight: 1.1 }}>{story.title}</h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", margin: 0 }}>{story.subtitle}</p>
        </div>
      </div>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "60px 24px 120px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "40px", flexWrap: "wrap" }}>
          {(story.systems as string[]).map(function (sys: string) {
            return <span key={sys} style={{
              fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.08em",
              color: "#00e5ff", border: "1px solid rgba(0,229,255,0.2)",
              padding: "4px 12px", borderRadius: "2px",
            }}>{sys}</span>;
          })}
        </div>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)", marginBottom: "40px" }} />
        <p style={{ fontSize: "clamp(16px,2vw,21px)", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>
          {story.body}
        </p>
        <div style={{ marginTop: "60px", display: "flex", gap: "20px" }}>
          <Link href="/stories" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.08em", textDecoration: "none", padding: "8px 0" }}>
            {"<"} Back to Archive
          </Link>
          <span style={{ color: "rgba(255,255,255,0.08)", fontSize: "24px" }}>|</span>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.08em", textDecoration: "none", padding: "8px 0" }}>
            Explore Earth {"->"}
          </Link>
        </div>
      </div>
    </main>
  );
}
