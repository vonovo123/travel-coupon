import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CouponPage } from "@/components/CouponPage";
import { getPlatformBySlug, platforms } from "@/data/mockData";
import { platformMetadata } from "@/lib/seo";

interface PlatformRouteProps {
  params: {
    platform: string;
  };
}

export const revalidate = 86400;

export function generateStaticParams() {
  return platforms.map((platform) => ({ platform: platform.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PlatformRouteProps): Metadata {
  const platform = getPlatformBySlug(params.platform);

  if (!platform) {
    return {};
  }

  return platformMetadata(platform);
}

export default function PlatformPage({ params }: PlatformRouteProps) {
  const platform = getPlatformBySlug(params.platform);

  if (!platform) {
    notFound();
  }

  return <CouponPage platformSlug={platform.slug} />;
}
