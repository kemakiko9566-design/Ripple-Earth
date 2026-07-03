"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useSceneEntry(id: string, options?: {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${id}`,
        start: options?.start || "top 80%",
        end: options?.end || "top 40%",
        scrub: options?.scrub ?? 1.2,
      },
    });

    tl.from(el, options?.from || { opacity: 0, y: 40 })
      .to(el, options?.to || {}, 0);

    tlRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getById(id)?.kill();
    };
  }, [id]);

  return ref;
}

export function useTextReveal(ref: React.RefObject<HTMLElement | null>, options?: {
  from?: gsap.TweenVars;
  start?: string;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const anim = gsap.fromTo(el,
      options?.from || { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
      {
        opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: options?.start || "top 85%",
          end: "top 45%",
          scrub: 1.0,
        },
      }
    );

    return () => { anim.kill(); };
  }, [ref]);
}
