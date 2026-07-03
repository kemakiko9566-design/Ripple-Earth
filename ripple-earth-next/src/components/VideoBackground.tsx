"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground({ progress }: { progress: number }) {
  var videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  var v = Math.max(0, Math.min(1, (progress - 0) / 0.15));
  var f = Math.max(0, Math.min(1, (progress - 0.6) / 0.25));
  var videoOpacity = Math.max(0, Math.min(1, v - f));

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: videoOpacity }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", filter: "contrast(1.05) saturate(1.05)" }}
      >
        <source src="/videos/earth-closeup.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(2,5,10,0.06)] via-[rgba(2,5,10,0.01)] to-[rgba(2,5,10,0.10)]" />
    </div>
  );
}
