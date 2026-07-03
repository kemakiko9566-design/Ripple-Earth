"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollState {
  progress: number;
  velocity: number;
  direction: number;
}

export function useLenisScroll(options?: {
  duration?: number;
  onProgress?: (p: number) => void;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<(() => void) | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    velocity: 0,
    direction: 0,
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: options?.duration ?? 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 3)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e: any) => {
      var p = Math.max(0, Math.min(1, e.progress));
      setScrollState({
        progress: p,
        velocity: e.velocity,
        direction: e.direction,
      });
      options?.onProgress?.(p);
    });

    lenis.on("scroll", ScrollTrigger.update);

    var tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    tickerRef.current = () => gsap.ticker.remove(tick);

    return () => {
      tickerRef.current?.();
      lenis.destroy();
    };
  }, [options?.duration]);

  const scrollTo = useCallback((target: string | number, opts?: any) => {
    lenisRef.current?.scrollTo(target, opts);
  }, []);

  return { ...scrollState, scrollTo, lenisRef };
}
