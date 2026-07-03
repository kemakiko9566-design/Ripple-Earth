"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SceneSpill() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#light", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
  }, []);
  return (
    <section id="spill" className="scene-section flex items-center justify-end">
      <div ref={ref} className="relative z-10 px-[clamp(20px,4vw,56px)] max-w-[540px] md:mr-[clamp(118px,13vw,188px)]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">03 / The Unseen Clock</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">In twenty-five years, artificial night light has increased by fifty percent.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65]">It confuses migrating birds and changes when trees bloom, a container breaks loose. 28,000 rubber ducks spill into the open ocean — beginning a 15-year journey across the world.</p>
      </div>
    </section>
  );
}
