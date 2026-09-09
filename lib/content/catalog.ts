import { cache } from "react";
import { offerTypeHubs } from "@/data/offerTypes";
import { sanityClient } from "@/sanity/lib/client";
import { couponsQuery, platformsQuery } from "@/sanity/lib/queries";
import type {
  Category,
  Coupon,
  OfferType,
  OfferTypeInfo,
  PlatformInfo,
} from "@/types/coupon";

const reservedSlugs = new Set([
  "privacy",
  ...offerTypeHubs.map((hub) => hub.slug),
]);

const offerTypes: OfferType[] = ["stay", "tour", "flight", "package"];
const categories: Category[] = ["국내", "해외", "공통"];

interface SanityPlatform {
  name?: string;
  slug?: string;
  affiliateLink?: string;
  initial?: string;
  color?: string;
  listed?: boolean;
}

interface SanityCoupon {
  _id: string;
  title?: string;
  code?: string;
  description?: string;
  offerType?: string;
  category?: string;
  validUntil?: string;
  affiliateLink?: string;
  platform?: SanityPlatform | null;
}

function formatValidUntil(value?: string): string {
  if (!value) {
    return "기간 확인";
  }

  const matched = value.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (matched) {
    return `${matched[1]}.${matched[2]}.${matched[3]}까지`;
  }

  return value;
}

function isOfferType(value: string): value is OfferType {
  return offerTypes.includes(value as OfferType);
}

function isCategory(value: string): value is Category {
  return categories.includes(value as Category);
}

function mapPlatform(doc: SanityPlatform): PlatformInfo | null {
  if (!doc.name || !doc.slug || !doc.affiliateLink) {
    return null;
  }

  if (reservedSlugs.has(doc.slug)) {
    return null;
  }

  return {
    name: doc.name,
    slug: doc.slug,
    color: doc.color || "#0B132B",
    textClass: "",
    affiliateLink: doc.affiliateLink,
    initial: doc.initial || doc.name.slice(0, 1),
    listed: doc.listed !== false,
  };
}

function mapCoupon(doc: SanityCoupon): Coupon | null {
  const platform = doc.platform ? mapPlatform(doc.platform) : null;
  if (
    !platform ||
    !doc.title ||
    !doc.code ||
    !doc.description ||
    !doc.offerType ||
    !doc.category ||
    !isOfferType(doc.offerType) ||
    !isCategory(doc.category)
  ) {
    return null;
  }

  return {
    id: doc._id,
    platform: platform.name,
    initial: platform.initial,
    logoUrl: platform.color,
    offerType: doc.offerType,
    category: doc.category,
    title: doc.title,
    description: doc.description,
    code: doc.code,
    affiliateLink: doc.affiliateLink || platform.affiliateLink,
    validUntil: formatValidUntil(doc.validUntil),
  };
}

const fetchOptions = {
  next: {
    revalidate: process.env.NODE_ENV === "development" ? 0 : 3600,
  },
};

export const getSanityPlatforms = cache(async (): Promise<PlatformInfo[]> => {
  const rawPlatforms = await sanityClient.fetch<SanityPlatform[]>(
    platformsQuery,
    {},
    fetchOptions,
  );

  return rawPlatforms
    .map(mapPlatform)
    .filter((item): item is PlatformInfo => item !== null);
});

export const getSanityCoupons = cache(async (): Promise<Coupon[]> => {
  const rawCoupons = await sanityClient.fetch<SanityCoupon[]>(
    couponsQuery,
    {},
    fetchOptions,
  );

  return rawCoupons
    .map(mapCoupon)
    .filter((item): item is Coupon => item !== null);
});

export async function getListedPlatforms(): Promise<PlatformInfo[]> {
  const platforms = await getSanityPlatforms();
  return platforms.filter((platform) => platform.listed);
}

export async function getUnlistedPlatforms(): Promise<PlatformInfo[]> {
  const platforms = await getSanityPlatforms();
  return platforms.filter((platform) => !platform.listed);
}

export async function getPlatformBySlug(
  slug: string,
): Promise<PlatformInfo | undefined> {
  const platforms = await getSanityPlatforms();
  return platforms.find((platform) => platform.slug === slug);
}

export async function getCouponsByPlatformSlug(slug?: string): Promise<Coupon[]> {
  if (!slug) {
    return getSanityCoupons();
  }

  const [platform, coupons] = await Promise.all([
    getPlatformBySlug(slug),
    getSanityCoupons(),
  ]);

  if (!platform) {
    return [];
  }

  return coupons.filter((coupon) => coupon.platform === platform.name);
}

export async function getCouponsByOfferHub(
  hub: OfferTypeInfo,
): Promise<Coupon[]> {
  const coupons = await getSanityCoupons();

  return coupons.filter(
    (coupon) =>
      coupon.offerType === hub.type &&
      (coupon.category === hub.category || coupon.category === "공통"),
  );
}
