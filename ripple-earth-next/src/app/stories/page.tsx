"use client";
import Link from "next/link";
import data from "@/data/stories.json";
import { StoryGrid } from "@/components/Story";

export default function StoriesPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)", color: "var(--text-primary)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px var(--space-10) 80px" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", fontSize: "var(--text-body-small)", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", textDecoration: "none", marginBottom: "var(--space-10)", display: "block" }}>
          {"<-"} Back to Earth
        </Link>
        <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, margin: "0 0 var(--space-2)" }}>Ripple Archive</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "60px" }}>
          Hidden connections. Overlooked phenomena. Stories that change how you see the planet.
        </p>
        <StoryGrid stories={data as any[]} />
      </div>
    </main>
  );
}
