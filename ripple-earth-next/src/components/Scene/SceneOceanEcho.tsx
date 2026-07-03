"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SceneOceanEcho() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2,
      scrollTrigger: { trigger: "#ocean-pump", start: "top 70%", end: "top 30%", scrub: 1.5 },
    });
  }, []);
  return (
    <section id="ocean-pump" className="scene-section flex items-center justify-end">
      <div ref={ref} className="relative z-10 px-[clamp(20px,4vw,56px)] max-w-[540px] md:mr-[clamp(60px,6vw,100px)]">
        <p className="text-[var(--cyan)] text-[12px] font-bold tracking-[0.14em] uppercase mb-[18px]">03 / The Hidden Pump</p>
        <h2 className="text-[clamp(30px,4vw,58px)] font-[680] leading-[1] mb-4">Before whaling, the ocean had a biological pump you never knew about.</h2>
        <p className="text-[var(--muted)] text-[clamp(16px,2vw,21px)] leading-[1.65]">Whales feed in the deep and release nutrient-rich plumes at the surface — fertilizing phytoplankton on a planetary scale. We killed 90% of the whales. The pump almost stopped. It is slowly restarting.</p>
      </div>
    </section>
  );
}
