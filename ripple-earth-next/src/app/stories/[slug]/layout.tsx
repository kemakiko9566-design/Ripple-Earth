import type { Metadata } from "next";

const stories: Record<string, { title: string; subtitle: string; body: string; year: number }> = {
  "whale_pump": {
    title: "The Whale Pump",
    subtitle: "����� �� Animals as Ocean Engineers",
    body: "Whales fertilize phytoplankton on a planetary scale. Before whaling, this pump sustained Southern Ocean productivity. We killed 90% of the whales. The pump almost stopped. Now it is slowly restarting.",
    year: 1950,
  },
  "concrete_paradox": {
    title: "The Concrete Paradox",
    subtitle: "��������� �� The CO2 Absorber You Walk On",
    body: "Concrete accounts for 8% of global CO2 emissions. But over its lifetime, it re-absorbs ~30% through carbonation. Every sidewalk is pulling carbon from the air.",
    year: 2023,
  },
  "plastic_sky": {
    title: "The Plastic Sky",
    subtitle: "������� �� A Cycle That Did Not Exist 50 Years Ago",
    body: "Microplastics are falling from the sky. They have been found in Arctic snow, human blood, and rain across every continent. A new planetary cycle.",
    year: 2019,
  },
  "ozone_divide": {
    title: "The Ozone Divide",
    subtitle: "�����ֽ� �� The Treaty Nobody Celebrates",
    body: "The Montreal Protocol is the most successful environmental treaty. It shifted Southern Hemisphere weather patterns. And its phase-out of CFCs delayed global warming by a decade.",
    year: 1987,
  },
  "zombie_fire": {
    title: "The Zombie Fire",
    subtitle: "��ʬ���� �� The Fire That Survives Winter",
    body: "In the Arctic, fires smolder underground through winter and re-emerge in spring. These zombie fires release ancient carbon from peat frozen for thousands of years.",
    year: 2021,
  },
  "dark_fleet": {
    title: "The Dark Fleet",
    subtitle: "�ڰ����� �� Ships That Hide in Plain Sight",
    body: "Hundreds of ships turn off their tracking systems to hide. Satellite radar reveals up to 1 in 5 fishing vessels operates in the dark.",
    year: 2020,
  },
  "sleeping_giant": {
    title: "The Sleeping Giant",
    subtitle: "��˯�ľ��� �� Thawing Permafrost",
    body: "Permafrost holds twice as much carbon as the atmosphere. As it thaws, it releases CO2, methane �� and ancient pathogens. A self-reinforcing feedback loop.",
    year: 2016,
  },
  "invisible_orchestra": {
    title: "The Invisible Orchestra",
    subtitle: "���ι����ֶ� �� Ocean Noise Pollution",
    body: "Shipping noise has raised the ocean sound level by 15-20 dB. Blue whales have changed their call frequency to be heard. Invisible pollution across entire ocean basins.",
    year: 2025,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories[slug];

  if (!story) {
    return { title: "Story Not Found" };
  }

  return {
    title: story.title,
    description: story.body,
    openGraph: {
      title: story.title + " | Ripple Archive",
      description: story.body,
      url: "/stories/" + slug,
      type: "article",
      publishedTime: new Date(String(story.year)).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: story.title + " | Ripple Archive",
      description: story.body,
    },
  };
}

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}