import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-09" });

interface CouponRow {
  _id: string;
  platformId?: string;
}

async function restore() {
  const coupons = await client.fetch<CouponRow[]>(
    `*[_type == "coupon"]{
      _id,
      "platformId": coalesce(platform._ref, travel->platform._ref)
    }`,
  );
  const travels = await client.fetch<{ _id: string }[]>(
    `*[_type == "travel"]{_id}`,
  );

  const transaction = client.transaction();
  let linked = 0;

  for (const coupon of coupons) {
    if (!coupon.platformId) {
      continue;
    }

    transaction.patch(coupon._id, (patch) =>
      patch
        .set({
          platform: {
            _type: "reference",
            _ref: coupon.platformId,
          },
        })
        .unset(["travel"]),
    );
    linked += 1;
  }

  for (const travel of travels) {
    transaction.delete(travel._id);
  }

  await transaction.commit();
  console.log(
    `할인코드 ${linked}개에 플랫폼을 다시 넣고, 여행 문서 ${travels.length}개를 지웠습니다.`,
  );
}

restore().catch((error) => {
  console.error(error);
  process.exit(1);
});
