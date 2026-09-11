import type { MetadataRoute } from "next";
import { getListedOfferMenus, getListedPlatforms } from "@/lib/content/catalog";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [listedPlatforms, listedOfferMenus] = await Promise.all([
    getListedPlatforms(),
    getListedOfferMenus(),
  ]);

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
    ...listedPlatforms.map((platform) => ({
      url: `${siteUrl}/${platform.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...listedOfferMenus.map((hub) => ({
      url: `${siteUrl}/${hub.slug}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
