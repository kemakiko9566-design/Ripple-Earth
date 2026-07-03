"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SceneEarthReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#duck-spill", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
  }, []);
  return (
    <section id="descent" className="scene-section flex items-center">
      <div ref={ref} className="relative z-10 px-[clamp(20px,4vw,56px)] max-w-[540px]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">01 / The Spill</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">1992. Twenty-eight thousand rubber ducks fall into the Pacific.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65]">The planet grows beneath us. Light bends through haze, then clears as the surface reveals itself — traced the ocean currents for fifteen years.</p>
      </div>
    </section>
  );
}
