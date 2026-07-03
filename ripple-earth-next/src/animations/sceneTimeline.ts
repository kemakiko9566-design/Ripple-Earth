"use client";
import { useRef, useEffect, useCallback } from "react";

/**
 * GSAP-powered timeline that maps scroll progress (0-1)
 * through cinematic easing curves for scene transitions.
 *
 * Eased progress values:
 * - sceneProgress: master progress with ease-out (for Earth fade, wireframe reveal)
 * - textProgress: delayed ease-out (for text entries, labels)
 */
export function useSceneTimeline(rawProgress: number) {
  var easedRef = useRef(0);

  // Cinematic ease-out: slow at first, faster toward end (cubic)
  var sceneProgress = 1 - Math.pow(1 - rawProgress, 1.8);

  // Text ease: delayed start, then gentle
  var textProgress = Math.max(0, Math.min(1, (rawProgress - 0.05) / 0.7));
  textProgress = 1 - Math.pow(1 - textProgress, 1.5);

  return { sceneProgress, textProgress, raw: rawProgress };
}

/**
 * GSAP ScrollTrigger Timeline for Scene 01 → 02 transition.
 * Controls visual layers (Earth, Wireframe, labels) via coordinated timeline.
 */
export function useGSAPSceneTimeline(
  earthRef: React.RefObject<HTMLDivElement>,
  wireframeRef: React.RefObject<HTMLDivElement>,
  overlayRef: React.RefObject<HTMLDivElement>
) {
  var tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
      },
    });

    // Scene 01: Earth visible, slow rotation (0 to 20% of scroll)
    // Scene 01→02: Earth fades, Wireframe appears (20% to 35%)
    // Scene 02: Wireframe earth with labels (35%+)

    if (earthRef.current) {
      tl.to(earthRef.current, { opacity: 0, scale: 1.15, duration: 0.25, ease: "power2.inOut" }, 0.15);
    }
    if (wireframeRef.current) {
      tl.fromTo(wireframeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.2);
    }
    if (overlayRef.current) {
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0.25);
    }

    tlRef.current = tl;
    return () => { tl.kill(); };
  }, []);

  return tlRef;
}
