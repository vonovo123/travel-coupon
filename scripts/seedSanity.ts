import { getCliClient } from "sanity/cli";
import { coupons, platforms } from "../data/mockData";

const client = getCliClient({ apiVersion: "2026-09-09" });

function platformDocumentId(slug: string) {
  return `platform-${slug}`;
}

function toIsoDate(value: string): string | undefined {
  const matched = value.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/);

  if (!matched) {
    return undefined;
  }

  const [, year, month, day] = matched;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

async function seed() {
  const transaction = client.transaction();

  for (const platform of platforms) {
    transaction.createOrReplace({
      _id: platformDocumentId(platform.slug),
      _type: "platform",
      name: platform.name,
      slug: { _type: "slug", current: platform.slug },
      affiliateLink: platform.affiliateLink,
      initial: platform.initial,
      color: platform.color,
      listed: platform.listed,
    });
  }

  for (const coupon of coupons) {
    const platform = platforms.find((item) => item.name === coupon.platform);

    if (!platform) {
      throw new Error(`Unknown platform: ${coupon.platform}`);
    }

    const validUntil = toIsoDate(coupon.validUntil);
    const now = new Date();

    transaction.createOrReplace({
      _id: `coupon-${coupon.id}`,
      _type: "coupon",
      title: coupon.title,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      platform: {
        _type: "reference",
        _ref: platformDocumentId(platform.slug),
      },
      offerType: coupon.offerType,
      category: coupon.category,
      code: coupon.code,
      description: coupon.description,
      validUntil,
    });
  }

  await transaction.commit();
  console.log(
    `Sanity에 플랫폼 ${platforms.length}개, 할인코드 ${coupons.length}개를 넣었습니다. 코드 값은 Studio에서 바꾸면 됩니다.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
