export default function ScrollCue() {
  return (
    <div className="absolute left-[clamp(20px,4vw,56px)] bottom-[42px] z-10 flex items-center gap-[14px] text-[rgba(238,249,255,0.58)] text-[12px] animate-[fade-in-up_1s_ease-out_0.5s_both]" aria-hidden="true" data-cursor-interactive>
      <span className="w-[1px] h-[52px] bg-gradient-to-b from-transparent to-[var(--cyan)] animate-[glow-pulse_2s_ease-in-out_infinite]" />
      <p className="tracking-[0.08em] uppercase">Scroll to disturb the surface</p>
    </div>
  );
}
