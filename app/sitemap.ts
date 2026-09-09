import type { MetadataRoute } from "next";
import { listedPlatforms } from "@/data/mockData";
import { offerTypeHubs } from "@/data/offerTypes";
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
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...offerTypeHubs.map((hub) => ({
      url: `${siteUrl}/${hub.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...listedPlatforms.map((platform) => ({
      url: `${siteUrl}/${platform.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
