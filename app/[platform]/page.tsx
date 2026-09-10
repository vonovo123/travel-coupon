import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/pages/SitePage";
import {
  getCouponsByOfferHub,
  getCouponsByPlatformSlug,
  getListedOfferMenus,
  getListedPlatforms,
  getOfferMenuBySlug,
  getPlatformBySlug,
  getSanityOfferMenus,
  getSanityPlatforms,
} from "@/lib/content/catalog";
import {
  discountPageDescription,
  hubPageDescription,
  hubPageTitle,
  platformPageTitle,
} from "@/lib/discountPageCopy";
import { offerTypeMetadata, platformMetadata } from "@/lib/seo";

interface PlatformRouteProps {
  params: {
    platform: string;
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const [menus, platforms] = await Promise.all([
    getSanityOfferMenus(),
    getSanityPlatforms(),
  ]);

  return [
    ...menus.map((hub) => ({ platform: hub.slug })),
    ...platforms.map((platform) => ({ platform: platform.slug })),
  ];
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PlatformRouteProps): Promise<Metadata> {
  const offerHub = await getOfferMenuBySlug(params.platform);

  if (offerHub) {
    const [listedMenus, coupons] = await Promise.all([
      getListedOfferMenus(),
      getCouponsByOfferHub(offerHub),
    ]);
    const visible = listedMenus.some((menu) => menu.slug === offerHub.slug);
    return offerTypeMetadata(
      { ...offerHub, listed: visible },
      {
        title: hubPageTitle(offerHub.label),
        description: hubPageDescription(
          offerHub.label,
          offerHub.shortDescription,
          coupons,
        ),
      },
    );
  }

  const platform = await getPlatformBySlug(params.platform);

  if (!platform) {
    return {};
  }

  const [listedPlatforms, coupons] = await Promise.all([
    getListedPlatforms(),
    getCouponsByPlatformSlug(platform.slug),
  ]);
  const visible = listedPlatforms.some((item) => item.slug === platform.slug);
  return platformMetadata(
    { ...platform, listed: visible },
    {
      title: platformPageTitle(platform.name, coupons),
      description: discountPageDescription(
        platform.name,
        coupons,
        `코드세이아에서 확인하고 ${platform.name}에서 적용하세요.`,
      ),
    },
  );
}

export default async function PlatformPage({ params }: PlatformRouteProps) {
  const offerHub = await getOfferMenuBySlug(params.platform);

  if (offerHub) {
    return <SitePage offerHubSlug={offerHub.slug} />;
  }

  const platform = await getPlatformBySlug(params.platform);

  if (!platform) {
    notFound();
  }

  return <SitePage platformSlug={platform.slug} />;
}
