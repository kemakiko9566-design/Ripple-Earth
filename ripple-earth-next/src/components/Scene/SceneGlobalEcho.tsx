"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stories from "@/data/stories.json";
import { ImpactNode } from "@/components/Effects";
gsap.registerPlugin(ScrollTrigger);

export default function SceneGlobalEcho() {
  const [active, setActive] = useState("ocean");
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#look-again", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: "#look-again", start: "top 50%", end: "top 20%", scrub: 1.5 },
      });
    }
  }, []);

  return (
    <section id="legacy" className="scene-section flex flex-col justify-center min-h-[118vh] gap-[48px] px-[clamp(20px,4vw,56px)] pt-[18vh] pb-[18vh]">
      <div ref={ref} className="relative z-10 text-center max-w-[700px] mx-auto">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">05 / Look Again</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">You saw what you did not see before.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65]">Each node opens a story of water, climate, ocean, and human choice.</p>
      </div>
      <div ref={gridRef} className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-[14px] max-w-[900px] mx-auto w-full">
        {stories.map((s) => (
          <ImpactNode
            key={s.id}
            title={s.title}
            subtitle={s.subtitle}
            body={s.body}
            active={active === s.id}
            onClick={() => setActive(s.id)}
          />
        ))}
      </div>
    </section>
  );
}
