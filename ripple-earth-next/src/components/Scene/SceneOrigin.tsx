"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharReveal } from "@/animations";
gsap.registerPlugin(ScrollTrigger);

export default function SceneOrigin({ progress }: { progress: number }) {
  var headingRef = useRef<HTMLHeadingElement>(null);
  var textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: { trigger: "#origin", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
    tl.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
  }, []);

  return (
    <section id="origin" className="scene-section scene-section--hero flex items-center">
      <div className="relative z-10 px-[clamp(20px,4vw,56px)] pt-[34vh] max-w-[600px]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">Digital Earth Storytelling Experience</p>
        <CharReveal as="h1" text="Ripple Earth" className="text-[clamp(56px,10vw,140px)] font-[680] leading-[0.88] mb-0" />
        <p ref={textRef} className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65] mt-[26px] max-w-[520px]">
          From afar, Earth is a small blue marble, slowly turning in the dark.
        </p>
      </div>
      <div className="absolute left-[clamp(20px,4vw,56px)] bottom-[42px] z-10 flex items-center gap-[14px] text-[rgba(238,249,255,0.58)] text-[12px] animate-pulse" aria-hidden="true">
        <span className="w-[1px] h-[52px] bg-gradient-to-b from-transparent to-[var(--cyan)]" />
        <p>Scroll to disturb the surface</p>
      </div>
    </section>
  );
}
