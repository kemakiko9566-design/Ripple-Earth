"use client";

export default function ImpactNode({
  title,
  subtitle,
  body,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  body: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "relative min-h-[170px] rounded-[10px] p-[24px] text-left cursor-pointer transition-all duration-400 group overflow-hidden " +
        (active
          ? "border border-[rgba(109,231,255,0.5)] bg-[rgba(13,34,50,0.7)] -translate-y-[2px]"
          : "border border-[rgba(163,232,255,0.12)] bg-[rgba(7,17,28,0.4)] hover:-translate-y-[3px] hover:border-[rgba(109,231,255,0.35)] hover:bg-[rgba(13,34,50,0.55)]")
      }
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Border glow on hover */}
      <div
        className={"absolute inset-0 rounded-[10px] transition-opacity duration-500 " + (active ? "opacity-100" : "opacity-0 group-hover:opacity-100")}
        style={{
          boxShadow: "inset 0 0 30px rgba(109,231,255,0.08), 0 0 40px rgba(109,231,255,0.06)",
        }}
      />
      <span className="relative z-[1] block mb-[10px] text-[22px] font-[680] tracking-[-0.02em] text-[var(--ink)]">{title}</span>
      <small className="relative z-[1] block text-[var(--muted)] text-[13px] leading-[1.6] mb-[8px]">{subtitle}</small>
      <p
        className={"relative z-[1] text-[var(--muted)] text-[13px] leading-[1.6] transition-all duration-400 overflow-hidden " + (active ? "max-h-[60px] opacity-100" : "max-h-0 opacity-0")}
      >
        {body}
      </p>
    </button>
  );
}
