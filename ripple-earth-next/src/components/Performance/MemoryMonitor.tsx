"use client";
import { useEffect, useState } from "react";

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

/**
 * MemoryMonitor – displays JS heap memory usage.
 * Only works in Chromium browsers with --enable-precise-memory-info.
 */
export default function MemoryMonitor() {
  const [mem, setMem] = useState<MemoryInfo | null>(null);

  useEffect(() => {
    var interval = setInterval(function () {
      var perf = (performance as any);
      if (perf.memory) {
        setMem({
          usedJSHeapSize: perf.memory.usedJSHeapSize,
          totalJSHeapSize: perf.memory.totalJSHeapSize,
          jsHeapSizeLimit: perf.memory.jsHeapSizeLimit,
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mem) return null;

  var usedMB = (mem.usedJSHeapSize / (1024 * 1024)).toFixed(1);
  var totalMB = (mem.totalJSHeapSize / (1024 * 1024)).toFixed(1);
  var limitMB = (mem.jsHeapSizeLimit / (1024 * 1024)).toFixed(0);

  var ratio = mem.totalJSHeapSize > 0
    ? (mem.usedJSHeapSize / mem.totalJSHeapSize * 100).toFixed(0)
    : "0";

  return (
    <div
      style={{
        position: "fixed", bottom: 12, left: 96, zIndex: 9999,
        fontFamily: "JetBrains Mono, monospace", fontSize: 11,
        color: "#94a3b8", background: "rgba(0,0,0,0.65)",
        padding: "4px 8px", borderRadius: 4,
        pointerEvents: "none", userSelect: "none",
      }}
    >
      {usedMB}MB / {totalMB}MB ({ratio}% of {limitMB}MB)
    </div>
  );
}
