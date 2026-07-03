"use client";
import { useState, useEffect, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return progress;
}
