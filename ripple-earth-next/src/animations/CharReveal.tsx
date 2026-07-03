"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Character-level text reveal as a free SplitText alternative.
 * Wraps each character in a <span> and animates with GSAP stagger.
 */
export function CharReveal({
  text,
  className,
  as = "span",
  stagger = 0.04,
  duration = 0.6,
  from = { opacity: 0, y: 25 },
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p" | "div";
  stagger?: number;
  duration?: number;
  from?: gsap.TweenVars;
}) {
  var ref = useRef<HTMLElement>(null);
  var Tag = as;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    var el = ref.current;
    if (!el || !el.parentElement) return;
    gsap.fromTo(
      el.children,
      from,
      {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top 80%",
          end: "top 40%",
          scrub: 1.5,
        },
      }
    );
  }, []);

  var chars = text.split("").map(function (c, i) {
    return (
      <span key={i} style={{ display: "inline-block" }}>
        {c === " " ? "\u00A0" : c}
      </span>
    );
  });

  return (
    <Tag ref={ref as any} className={className}>
      {chars}
    </Tag>
  );
}
