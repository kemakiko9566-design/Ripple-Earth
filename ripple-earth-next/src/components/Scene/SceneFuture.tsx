"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SceneFuture() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#future", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
  }, []);
  return (
    <section id="future" className="scene-section flex items-center justify-center min-h-[112vh] px-[20px] pt-[16vh] pb-[16vh]">
      <div ref={ref} className="relative z-10 text-center max-w-[600px]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">06 / Future</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">The future is shaped by every choice.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65] mb-[34px]">Ripple Earth helps organizations turn environmental impact into stories people can feel, understand, and act on.</p>
        <div className="flex justify-center gap-[12px] flex-col sm:flex-row">
          <a href="#legacy" data-cursor-interactive className="glass-panel inline-flex items-center justify-center min-h-[46px] px-[22px] rounded-full text-[14px] font-bold text-[#021018] border-[rgba(109,231,255,0.72)] bg-gradient-to-r from-[#e7fbff] via-[#6de7ff] to-[#20d8a3] no-underline transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(109,231,255,0.25)] active:scale-[0.97]">
            Explore Earth
          </a>
          <a href="#future" data-cursor-interactive className="glass-panel inline-flex items-center justify-center min-h-[46px] px-[22px] rounded-full text-[14px] font-bold text-[rgba(239,248,255,0.82)] no-underline transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:scale-[1.02] hover:border-[rgba(255,255,255,0.2)] active:scale-[0.97]">
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}
