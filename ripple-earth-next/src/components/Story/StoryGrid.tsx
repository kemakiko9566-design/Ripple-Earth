"use client";
import StoryCard from "./StoryCard";

const GRADIENTS: Record<string, string> = {
  whale_pump: "linear-gradient(135deg, #0B2D4E, #1A6B8A)",
  concrete_paradox: "linear-gradient(135deg, #1a1a2e, #2d2d44)",
  plastic_sky: "linear-gradient(135deg, #2A1A00, #5A4A00)",
  ozone_divide: "linear-gradient(135deg, #002A3A, #005A6A)",
  zombie_fire: "linear-gradient(135deg, #3A1A00, #6A3A00)",
  dark_fleet: "linear-gradient(135deg, #1A0000, #3A1010)",
  sleeping_giant: "linear-gradient(135deg, #001A1A, #003A2A)",
  invisible_orchestra: "linear-gradient(135deg, #1A002A, #3A005A)",
};

interface StoryData { id: string; title: string; subtitle: string; body?: string; systems: string[]; year: number; }

interface Props { stories: StoryData[]; }

export default function StoryGrid({ stories }: Props) {
  return (
    <div style={{ columns: "3 300px", columnGap: "var(--space-5)" }}>
      {stories.map(function (s: StoryData) {
        var g = GRADIENTS[s.id] || "linear-gradient(135deg, #1a1a2e, #2d2d44)";
        return <StoryCard key={s.id} id={s.id} title={s.title} subtitle={s.subtitle} systems={s.systems} year={s.year} gradient={g} />;
      })}
    </div>
  );
}
