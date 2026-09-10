import { cache } from "react";
import { getFreshness } from "@/lib/seo";
import { sanityClient } from "@/sanity/lib/client";
import {
  couponsQuery,
  offerMenusQuery,
  platformsQuery,
} from "@/sanity/lib/queries";
import type {
  Category,
  Coupon,
  HubRegion,
  OfferType,
  OfferTypeInfo,
  PlatformInfo,
} from "@/types/coupon";

const reservedPageSlugs = new Set(["privacy"]);

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

interface SanityOfferMenu {
  name?: string;
  slug?: string;
  offerType?: string;
  category?: string;
  shortDescription?: string;
  searchKeyword?: string;
  listed?: boolean;
}

interface SanityCoupon {
  _id: string;
  title?: string;
  year?: number;
  month?: number;
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

function isHubRegion(value: string): value is HubRegion {
  return value === "국내" || value === "해외";
}

function periodKey(year: number, month: number) {
  return year * 12 + month;
}

/** 이번 달 코드를 쓰고, 없으면 가장 최근 연/월 묶음을 쓴다. */
function pickPeriodCoupons(coupons: Coupon[]): Coupon[] {
  const { year, month } = getFreshness();
  const dated = coupons.filter(
    (coupon) =>
      Number.isInteger(coupon.year) && Number.isInteger(coupon.month),
  );

  if (dated.length === 0) {
    return coupons;
  }

  const current = dated.filter(
    (coupon) => coupon.year === year && coupon.month === month,
  );

  if (current.length > 0) {
    return current;
  }

  const latestKey = dated.reduce(
    (max, coupon) => Math.max(max, periodKey(coupon.year!, coupon.month!)),
    0,
  );

  return dated.filter(
    (coupon) => periodKey(coupon.year!, coupon.month!) === latestKey,
  );
}

function mapPlatform(
  doc: SanityPlatform,
  reservedSlugs: Set<string> = reservedPageSlugs,
): PlatformInfo | null {
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

function mapOfferMenu(doc: SanityOfferMenu): OfferTypeInfo | null {
  if (
    !doc.name ||
    !doc.slug ||
    !doc.offerType ||
    !doc.category ||
    !doc.shortDescription ||
    !isOfferType(doc.offerType) ||
    !isHubRegion(doc.category) ||
    reservedPageSlugs.has(doc.slug)
  ) {
    return null;
  }

  return {
    type: doc.offerType,
    category: doc.category,
    slug: doc.slug,
    name: doc.name,
    label: `${doc.name} 할인코드`,
    searchKeyword: doc.searchKeyword || `${doc.name.replace(/\s+/g, "")} 할인코드`,
    shortDescription: doc.shortDescription,
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
    year: doc.year,
    month: doc.month,
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

export const getSanityOfferMenus = cache(async (): Promise<OfferTypeInfo[]> => {
  const rawMenus = await sanityClient.fetch<SanityOfferMenu[]>(
    offerMenusQuery,
    {},
    fetchOptions,
  );

  return rawMenus
    .map(mapOfferMenu)
    .filter((item): item is OfferTypeInfo => item !== null);
});

export const getSanityPlatforms = cache(async (): Promise<PlatformInfo[]> => {
  const [rawPlatforms, menus] = await Promise.all([
    sanityClient.fetch<SanityPlatform[]>(platformsQuery, {}, fetchOptions),
    getSanityOfferMenus(),
  ]);
  const reservedSlugs = new Set(reservedPageSlugs);
  for (const menu of menus) {
    reservedSlugs.add(menu.slug);
  }

  return rawPlatforms
    .map((doc) => mapPlatform(doc, reservedSlugs))
    .filter((item): item is PlatformInfo => item !== null);
});

export async function getListedOfferMenus(): Promise<OfferTypeInfo[]> {
  const menus = await getSanityOfferMenus();
  return menus.filter((menu) => menu.listed);
}

export async function getUnlistedOfferMenus(): Promise<OfferTypeInfo[]> {
  const menus = await getSanityOfferMenus();
  return menus.filter((menu) => !menu.listed);
}

export async function getOfferMenuBySlug(
  slug: string,
): Promise<OfferTypeInfo | undefined> {
  const menus = await getSanityOfferMenus();
  return menus.find((menu) => menu.slug === slug);
}

export const getSanityCoupons = cache(async (): Promise<Coupon[]> => {
  const rawCoupons = await sanityClient.fetch<SanityCoupon[]>(
    couponsQuery,
    {},
    fetchOptions,
  );

  const coupons = rawCoupons
    .map(mapCoupon)
    .filter((item): item is Coupon => item !== null);

  return pickPeriodCoupons(coupons);
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
