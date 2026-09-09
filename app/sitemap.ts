import type { MetadataRoute } from "next";
import { platforms } from "@/data/mockData";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...platforms.map((platform) => ({
      url: `${siteUrl}/${platform.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
