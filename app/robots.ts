import type { MetadataRoute } from "next";
import { unlistedPlatforms } from "@/data/mockData";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: unlistedPlatforms.map((platform) => `/${platform.slug}`),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
