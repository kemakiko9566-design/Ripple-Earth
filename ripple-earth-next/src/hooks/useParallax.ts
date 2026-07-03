"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useParallax(
  speed: number = 0.5,
  options?: {
    triggerId?: string;
    start?: string;
    end?: string;
    direction?: "y" | "x" | "scale";
  }
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    var dir = options?.direction ?? "y";
    var st = ScrollTrigger.create({
      trigger: options?.triggerId ? ("#" + options.triggerId) : el,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      onUpdate: function (self) {
        var p = self.progress;
        if (dir === "y") {
          var off = -(1 - speed) * 200 * p;
          el.style.transform = "translateY(" + off + "px)";
        } else if (dir === "x") {
          var offX = -(1 - speed) * 150 * p;
          el.style.transform = "translateX(" + offX + "px)";
        } else if (dir === "scale") {
          var s = 1 + (1 - speed) * 0.3 * p;
          el.style.transform = "scale(" + s + ")";
        }
      },
    });
    return function () { st.kill(); };
  }, [speed, options?.triggerId, options?.direction]);
  return ref;
}