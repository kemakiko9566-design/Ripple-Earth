"use client";
import { useEffect, useState, useRef } from "react";

interface PanelProps {
  visible: boolean;
  onComplete?: () => void;
}

const DATA_LINES = [
  { label: "ANOMALY", value: "001" },
  { label: "YEAR", value: "1992" },
  { label: "LOCATION", value: "NORTH PACIFIC OCEAN" },
  { label: "SOURCE", value: "CONTAINER SPILL" },
  { label: "OBJECTS", value: "28,800 RUBBER DUCKS" },
];

export default function AnomalyPanel({ visible, onComplete }: PanelProps) {
  const [revealed, setRevealed] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [typing, setTyping] = useState("");
  const [showButton, setShowButton] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) {
      setRevealed(false);
      setCurrentLine(-1);
      setTyping("");
      setShowButton(false);
      return;
    }
    setRevealed(true);
  }, [visible]);

  useEffect(() => {
    if (!revealed) return;
    var i = 0;
    var int = setInterval(function () {
      i++;
      setCurrentLine(i - 1);
      if (i >= DATA_LINES.length) {
        clearInterval(int);
        setTimeout(function () { setShowButton(true); if (onComplete) onComplete(); }, 600);
      }
    }, 500);
    return function () { clearInterval(int); };
  }, [revealed, onComplete]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      pointerEvents: showButton ? "auto" : "none", zIndex: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "rgba(0,0,0,0.75)", border: "1px solid rgba(0,229,255,0.2)",
        borderRadius: "4px", padding: "32px 40px", maxWidth: "480px",
        backdropFilter: "blur(8px)",
        opacity: revealed ? 1 : 0, transition: "opacity 0.5s ease",
      }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#00e5ff", boxShadow: "0 0 8px rgba(0,229,255,0.6)",
          }} />
          <span style={{ color: "#00e5ff", fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.12em" }}>
            SYSTEM DETECTION // EARTH INTELLIGENCE
          </span>
        </div>

        {/* data lines */}
        {DATA_LINES.map(function (d, idx) {
          var isActive = idx === currentLine;
          var isDone = idx < currentLine;
          return (
            <div key={idx} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
              opacity: isDone ? 1 : isActive ? 1 : 0.12,
              transition: "opacity 0.3s",
            }}>
              <span style={{
                color: "rgba(255,255,255,0.4)", fontFamily: "monospace", fontSize: "11px",
                letterSpacing: "0.08em", width: "90px", flexShrink: 0,
              }}>
                {d.label}
              </span>
              <span style={{
                color: isActive ? "#00e5ff" : "rgba(255,255,255,0.8)",
                fontFamily: "monospace", fontSize: "13px",
                textAlign: "right",
              }}>
                {isActive ? d.value : isDone ? d.value : "—"}
              </span>
            </div>
          );
        })}

        {/* pulse dot for active detection */}
        {currentLine < DATA_LINES.length && currentLine >= 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "20px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#00e5ff", animation: "pulse 1s infinite",
            }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontSize: "10px" }}>
              DETECTING...
            </span>
          </div>
        )}

        {/* complete button */}
        {showButton && (
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button data-cursor-interactive style={{
              background: "transparent", border: "1px solid #00e5ff", color: "#00e5ff",
              padding: "10px 28px", fontFamily: "monospace", fontSize: "11px",
              letterSpacing: "0.12em", cursor: "pointer", borderRadius: "2px",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
              onMouseEnter={function (e) { const t=e.currentTarget; t.style.background = "rgba(0,229,255,0.12)"; t.style.boxShadow = "0 0 20px rgba(0,229,255,0.15)"; }}
              onMouseLeave={function (e) { const t=e.currentTarget; t.style.background = "transparent"; t.style.boxShadow = "none"; }}
              onClick={function () { /* scroll to next scene */ }}>
              TRACE RIPPLE →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
