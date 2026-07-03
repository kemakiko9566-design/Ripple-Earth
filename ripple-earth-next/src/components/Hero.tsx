"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/UI/button";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Eyebrow label fades in first
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6 }
    );

    // Title characters stagger in with blur + y offset
    var chars = titleRef.current?.querySelectorAll(".hero-char");
    if (chars && chars.length > 0) {
      tl.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -15, filter: "blur(6px)" },
        { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.035 },
        "-=0.3"
      );
    }

    // Subtitle slides up
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    );

    // CTA buttons stagger in
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
        "-=0.3"
      );
    }

    // Scroll cue fades in last
    tl.fromTo(scrollCueRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.15"
    );
  }, []);

  var title = "Ripple Earth";
  var subtitle = "Every impact begins with something small.";

  return (
    <section
      id="hero"
      className="scene-section"
      style={{
        minHeight: "100vh",
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          paddingLeft: "clamp(20px, 4vw, 56px)",
          paddingRight: "clamp(20px, 4vw, 56px)",
          paddingTop: "30vh",
          maxWidth: "600px",
          pointerEvents: "auto",
        }}
      >
        {/* Eyebrow label */}
        <p
          ref={labelRef}
          style={{
            color: "var(--cyan, #00E5FF)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "18px",
            opacity: 0,
            fontFamily: "'SF Mono', 'JetBrains Mono', monospace",
          }}
        >
          Digital Earth Storytelling Experience
        </p>

        {/* Title with character-level animation */}
        <h1
          ref={titleRef}
          style={{
            fontSize: "clamp(48px, 10vw, 120px)",
            fontWeight: 680,
            lineHeight: 0.88,
            color: "var(--ink, #eff8ff)",
            margin: 0,
            whiteSpace: "nowrap",
            letterSpacing: "-0.03em",
          }}
        >
          {title.split("").map(function (char, i) {
            return (
              <span
                key={i}
                className="hero-char"
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            color: "rgba(255, 255, 255, 0.40)",
            fontSize: "clamp(16px, 2vw, 21px)",
            lineHeight: 1.65,
            marginTop: "26px",
            maxWidth: "480px",
            opacity: 0,
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
            flexWrap: "wrap",
            opacity: 0,
          }}
        >
          <Button variant="default" size="lg">
            Explore the Impact
          </Button>
          <Button variant="outline" size="lg">
            Discover Stories
          </Button>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        style={{
          position: "absolute",
          left: "clamp(20px, 4vw, 56px)",
          bottom: "42px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "rgba(238, 249, 255, 0.58)",
          fontSize: "12px",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            width: "1px",
            height: "52px",
            background: "linear-gradient(to bottom, transparent, var(--cyan, #00E5FF))",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <p style={{ margin: 0 }}>Scroll to disturb the surface</p>
      </div>
    </section>
  );
}
