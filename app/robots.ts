import type { MetadataRoute } from "next";
import { getUnlistedPlatforms } from "@/lib/content/catalog";
import { siteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const unlistedPlatforms = await getUnlistedPlatforms();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: unlistedPlatforms.map((platform) => `/${platform.slug}`),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
