import type { StructureResolver } from "sanity/structure";

interface CouponPeriod {
  year: number;
  month: number;
}

function uniquePeriods(rows: CouponPeriod[]): CouponPeriod[] {
  const seen = new Set<string>();
  const periods: CouponPeriod[] = [];

  for (const row of rows) {
    if (!Number.isInteger(row.year) || !Number.isInteger(row.month)) {
      continue;
    }

    const key = `${row.year}-${row.month}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    periods.push({ year: row.year, month: row.month });
  }

  return periods.sort((left, right) =>
    left.year === right.year ? right.month - left.month : right.year - left.year,
  );
}

function periodLabel(year: number, month: number) {
  return `${year % 100}년 ${month}월`;
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .id("content")
    .title("콘텐츠")
    .items([
      S.listItem()
        .id("travel-root")
        .title("여행")
        .child(
          S.list()
            .id("travel-desk")
            .title("여행")
            .items([
              S.documentTypeListItem("platform")
                .id("travel-platforms")
                .title("플랫폼"),
              S.documentTypeListItem("offerMenu")
                .id("travel-menus")
                .title("메뉴"),
              S.listItem()
                .id("travel-codes")
                .title("코드")
                .child(async () => {
                  const client = context.getClient({
                    apiVersion: "2026-09-09",
                  });
                  const rows = await client.fetch<CouponPeriod[]>(
                    `*[_type == "coupon" && defined(year) && defined(month)]{year, month} | order(year desc, month desc)`,
                  );
                  const periods = uniquePeriods(rows ?? []);

                  return S.list()
                    .id("travel-code-periods")
                    .title("코드")
                    .items(
                      periods.map((period) =>
                        S.listItem()
                          .id(`travel-month-${period.year}-${period.month}`)
                          .title(periodLabel(period.year, period.month))
                          .child(
                            S.documentTypeList("coupon")
                              .id(
                                `travel-coupons-${period.year}-${period.month}`,
                              )
                              .title(periodLabel(period.year, period.month))
                              .filter(
                                `_type == "coupon" && year == $year && month == $month`,
                              )
                              .params({
                                year: period.year,
                                month: period.month,
                              })
                              .initialValueTemplates([
                                S.initialValueTemplateItem(
                                  "coupon-by-period",
                                  {
                                    year: period.year,
                                    month: period.month,
                                  },
                                ),
                              ]),
                          ),
                      ),
                    );
                }),
            ]),
        ),
    ]);
