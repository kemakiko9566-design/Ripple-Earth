"use client";
import { useState, useEffect, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

import { Header, SceneIndex, ScrollProgress } from "@/components/UI";
import Hero from "@/components/Hero";
import { RipplePath, ScientificOverlay, AnomalyNode } from "@/components/visual";
import { ScrollReveal } from '@/components/Effects';
import EarthCanvas from "@/components/Earth/EarthCanvas";
import { useSceneTimeline } from '@/animations';
import { FPSCounter, MemoryMonitor } from '@/components/Performance';

// Lazy-loaded heavy components (Three.js / RAF canvas / video)
const Earth = dynamic(() => import('@/three/Earth').then(m => m.default), { ssr: false });
const VideoBackground = dynamic(() => import('@/components/VideoBackground').then(m => m.default), { ssr: false });
const RippleEffect = dynamic(() => import('@/components/Ripple/RippleEffect').then(m => m.default), { ssr: false });
const DuckTrail = dynamic(() => import('@/components/visual/DuckTrail').then(m => m.default), { ssr: false });
const SandData = dynamic(() => import('@/components/visual/SandData').then(m => m.default), { ssr: false });
const LightData = dynamic(() => import('@/components/visual/LightData').then(m => m.default), { ssr: false });
const OceanPump = dynamic(() => import("@/components/visual/OceanPump").then(m => m.default), { ssr: false });
const BallastData = dynamic(() => import('@/components/visual/BallastData').then(m => m.default), { ssr: false });

// Scene components (lightweight GSAP DOM) stay eager
import { SceneOrigin, Scene02, SceneEarthReveal, SceneOceanEcho, SceneSpill, SceneInvisibleImpact, SceneGlobalEcho, Scene07Evidence } from "@/components/Scene";


export default function Home() {
  const [progress, setProgress] = useState(0);
  const [rippleProgress, setRippleProgress] = useState(0);
  const { sceneProgress, textProgress } = useSceneTimeline(progress);

  // Lenis smooth scroll + GSAP
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 3)), smoothWheel: true });
    lenis.on('scroll', (e) => {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      setProgress(p);
      setRippleProgress(Math.max(0, Math.min(1, (p - 0) / 0.12)));
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // GSAP ScrollTrigger master timeline
    ScrollTrigger.getAll().forEach(function (st) { st.kill(); });
    var earthEl = document.getElementById("earth-container");
    var wireframeEl = document.getElementById("wireframe-container");
    if (earthEl && wireframeEl) {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        onUpdate: function (self) {
          var p = self.progress;
          earthEl!.style.opacity = "" + Math.max(0, Math.min(1, 1 - p / 0.25));
          wireframeEl!.style.opacity = "" + Math.max(0, Math.min(1, (p - 0.15) / 0.15));
        },
      });
    }
    ["origin", "systems", "descent", "surface", "spill", "impact", "legacy", "future"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: "#" + id,
        start: "top 80%",
        end: "top 35%",
        scrub: 1.2,
        onUpdate: function (self) {
          var p = self.progress;
          el!.style.opacity = "" + Math.min(1, p * 1.4);
          el!.style.transform = "translateY(" + (20 - p * 20) + "px)";
        },
      });
    });

    return function () {
      gsap.ticker.remove(function (time) { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach(function (el) { obs.observe(el); });
    return function () { obs.disconnect(); };
  }, []);


  return (
    <main>
      <ScrollProgress />
      <Suspense fallback={null}>
        <Earth progress={sceneProgress} visible={true} />
      </Suspense>

      <EarthCanvas progress={sceneProgress} visible={true} />


      <RipplePath progress={progress} />
      <ScientificOverlay progress={progress} />
      <AnomalyNode progress={progress} visible={progress > 0.35 && progress < 0.60} />

      <Suspense fallback={null}>
        <DuckTrail progress={progress} visible={progress > 0.30 && progress < 0.65} />
      </Suspense>
      <Suspense fallback={null}>
        <SandData progress={progress} visible={progress > 0.35 && progress < 0.52} />
      </Suspense>
      <Suspense fallback={null}>
        <LightData progress={progress} visible={progress > 0.48 && progress < 0.68} />
      </Suspense>
      <Suspense fallback={null}>
        <BallastData progress={progress} visible={progress > 0.62 && progress < 0.82} />
      </Suspense>
      <Suspense fallback={null}>
        <OceanPump progress={progress} visible={progress > 0.38 && progress < 0.58} />
      </Suspense>

      <Suspense fallback={null}>
        <VideoBackground progress={progress} />
      </Suspense>
      <Suspense fallback={null}>
        <RippleEffect progress={rippleProgress} />
      </Suspense>

      <Header />
      <SceneIndex />
      <Hero />
      <ScrollReveal>
        <SceneOrigin progress={rippleProgress} />
      </ScrollReveal>
      <Scene02 />
      <SceneEarthReveal />
      <SceneOceanEcho />
      <SceneSpill />
      <SceneInvisibleImpact />
      <SceneGlobalEcho />
      <Scene07Evidence />

      <FPSCounter />
      <MemoryMonitor />
    </main>
  );
}






