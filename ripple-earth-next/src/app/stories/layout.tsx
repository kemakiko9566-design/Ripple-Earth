import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ripple Archive",
  description:
    "Hidden connections. Overlooked phenomena. Stories that change how you see the planet.",
  openGraph: {
    title: "Ripple Archive | Ripple Earth",
    description:
      "Hidden connections. Overlooked phenomena. Stories that change how you see the planet.",
    url: "/stories",
  },
};

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
