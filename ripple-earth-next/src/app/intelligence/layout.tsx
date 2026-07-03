import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earth Intelligence",
  description:
    "Key environmental indicators tracked by leading research organizations. CO2 concentration, temperature anomaly, sea ice extent, sea level rise, and ocean pH.",
  openGraph: {
    title: "Earth Intelligence | Ripple Earth",
    description:
      "Key environmental indicators tracked by leading research organizations. CO2 concentration, temperature anomaly, sea ice extent, sea level rise, and ocean pH.",
    url: "/intelligence",
  },
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
