import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-09" });

async function backfill() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const coupons = await client.fetch<{ _id: string }[]>(
    `*[_type == "coupon" && (!defined(year) || !defined(month))]{_id}`,
  );

  if (coupons.length === 0) {
    console.log("연도/월이 비어 있는 할인코드가 없습니다.");
    return;
  }

  const transaction = client.transaction();

  for (const coupon of coupons) {
    transaction.patch(coupon._id, (patch) => patch.set({ year, month }));
  }

  await transaction.commit();
  console.log(
    `할인코드 ${coupons.length}개에 ${year}년 ${month}월을 넣었습니다.`,
  );
}

backfill().catch((error) => {
  console.error(error);
  process.exit(1);
});
