import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/pages/SitePage";
import { getOfferTypeBySlug, offerTypeHubs } from "@/data/offerTypes";
import { getPlatformBySlug, getSanityPlatforms } from "@/lib/content/catalog";
import { offerTypeMetadata, platformMetadata } from "@/lib/seo";

interface PlatformRouteProps {
  params: {
    platform: string;
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const platforms = await getSanityPlatforms();

  return [
    ...offerTypeHubs.map((hub) => ({ platform: hub.slug })),
    ...platforms.map((platform) => ({ platform: platform.slug })),
  ];
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PlatformRouteProps): Promise<Metadata> {
  const offerHub = getOfferTypeBySlug(params.platform);

  if (offerHub) {
    return offerTypeMetadata(offerHub);
  }

  const platform = await getPlatformBySlug(params.platform);

  if (!platform) {
    return {};
  }

  return platformMetadata(platform);
}

export default async function PlatformPage({ params }: PlatformRouteProps) {
  const offerHub = getOfferTypeBySlug(params.platform);

  if (offerHub) {
    return <SitePage offerHubSlug={offerHub.slug} />;
  }

  const platform = await getPlatformBySlug(params.platform);

  if (!platform) {
    notFound();
  }

  return <SitePage platformSlug={platform.slug} />;
}
