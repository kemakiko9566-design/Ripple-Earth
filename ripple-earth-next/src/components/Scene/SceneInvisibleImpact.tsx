"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SceneInvisibleImpact() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#ballast", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
  }, []);
  return (
    <section id="impact" className="scene-section flex items-center">
      <div ref={ref} className="relative z-10 px-[clamp(20px,4vw,56px)] max-w-[540px]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">04 / The Hidden Voyage</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">Every ship carries ballast water. Thousands of tons from one ocean, released in another.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65]">Thousands of species cross the world inside ship hulls every day Alaska to Australia, revealing the invisible paths of our oceans — and how a single event can ripple across the entire planet.</p>
      </div>
    </section>
  );
}
