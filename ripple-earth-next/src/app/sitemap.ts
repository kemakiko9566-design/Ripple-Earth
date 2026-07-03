import { MetadataRoute } from "next";

const BASE_URL = "https://rippleearth.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: BASE_URL + "/stories",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/intelligence",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const storyRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL + "/stories/" + "whale_pump",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "concrete_paradox",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "plastic_sky",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "ozone_divide",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "zombie_fire",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "dark_fleet",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "sleeping_giant",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: BASE_URL + "/stories/" + "invisible_orchestra",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...storyRoutes];
}