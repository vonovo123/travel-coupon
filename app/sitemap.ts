import type { MetadataRoute } from "next";
import { offerTypeHubs } from "@/data/offerTypes";
import { getListedPlatforms } from "@/lib/content/catalog";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const listedPlatforms = await getListedPlatforms();

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
