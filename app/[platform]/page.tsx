import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/pages/SitePage";
import { getPlatformBySlug, platforms } from "@/data/mockData";
import { getOfferTypeBySlug, offerTypeHubs } from "@/data/offerTypes";
import { offerTypeMetadata, platformMetadata } from "@/lib/seo";

interface PlatformRouteProps {
  params: {
    platform: string;
  };
}

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    ...offerTypeHubs.map((hub) => ({ platform: hub.slug })),
    ...platforms.map((platform) => ({ platform: platform.slug })),
  ];
}

export const dynamicParams = false;

export function generateMetadata({ params }: PlatformRouteProps): Metadata {
  const offerHub = getOfferTypeBySlug(params.platform);

  if (offerHub) {
    return offerTypeMetadata(offerHub);
  }

  const platform = getPlatformBySlug(params.platform);

  if (!platform) {
    return {};
  }

  return platformMetadata(platform);
}

export default function PlatformPage({ params }: PlatformRouteProps) {
  const offerHub = getOfferTypeBySlug(params.platform);

  if (offerHub) {
    return <SitePage offerHubSlug={offerHub.slug} />;
  }

  const platform = getPlatformBySlug(params.platform);

  if (!platform) {
    notFound();
  }

  return <SitePage platformSlug={platform.slug} />;
}
