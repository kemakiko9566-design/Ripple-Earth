"use client";

export default function AtmosphereGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {/* Main aurora glow behind Earth */}
      <div
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(109,231,255,0.35) 0%, rgba(32,216,163,0.15) 30%, transparent 70%)",
          filter: "blur(60px)",
          animation: "auroraDrift 12s ease-in-out infinite alternate",
        }}
      />
      {/* Secondary glow layer */}
      <div
        className="absolute top-[-10%] left-1/3 w-[80vw] h-[50vh] rounded-full opacity-15"
        style={{
          background: "radial-gradient(ellipse at center, rgba(52,152,219,0.3) 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: "auroraDrift 15s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-[-15%] left-0 w-full h-[40vh] rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(109,231,255,0.2) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />
    </div>
  );
}
