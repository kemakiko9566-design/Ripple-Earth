"use client";

export default function ScientificOverlay({ progress }: { progress: number }) {
  var fade = Math.min(1, Math.max(0, (progress - 0.18) / 0.08));
  if (fade <= 0) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      pointerEvents: "none", zIndex: 4,
      fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#6B7280",
      opacity: fade,
    }}>
      {/* top-left: coordinates */}
      <div style={{ position: "absolute", top: 100, left: 24 }}>
        <div style={{ color: "#E8E8E8", fontSize: 9, letterSpacing: "0.12em", marginBottom: 8 }}>WGS84</div>
        <div>LAT 31.2304</div>
        <div>LON 121.4737</div>
      </div>

      {/* top-right: data stream */}
      <div style={{ position: "absolute", top: 100, right: 24, textAlign: "right" }}>
        <div style={{ color: "#4CC9F0", fontSize: 9, letterSpacing: "0.1em" }}>DATA STREAM</div>
        <div style={{ color: "#4CC9F0", fontSize: 9, marginTop: 4 }}>● ONLINE</div>
      </div>

      {/* bottom-right: scan indicator */}
      <div style={{ position: "absolute", bottom: 48, right: 24, textAlign: "right" }}>
        <div style={{ color: "#6B7280", fontSize: 8, letterSpacing: "0.1em" }}>SCANNING</div>
        <div style={{ fontSize: 8, marginTop: 2 }}>{">"} EARTH SYSTEM</div>
        <div style={{ fontSize: 8 }}>{">"} TRACKING ANOMALY</div>
      </div>
    </div>
  );
}
