import type { MetadataRoute } from "next";
import { getUnlistedOfferMenus, getUnlistedPlatforms } from "@/lib/content/catalog";
import { siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const [unlistedPlatforms, unlistedMenus] = await Promise.all([
    getUnlistedPlatforms(),
    getUnlistedOfferMenus(),
  ]);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        ...unlistedMenus.map((menu) => `/${menu.slug}`),
        ...unlistedPlatforms.map((platform) => `/${platform.slug}`),
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
