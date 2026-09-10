import { defineField, defineType } from "sanity";

const reservedSlugs = new Set(["privacy"]);

export const offerMenuType = defineType({
  name: "offerMenu",
  title: "메뉴",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "이름",
      type: "string",
      description: "예: 해외 숙소. 사이드바에는 뒤에 「할인코드」가 붙습니다.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL 슬러그",
      type: "slug",
      description: "/overseas-stay 처럼 주소에 쓰입니다. 플랫폼 주소와 겹치면 안 됩니다.",
      options: {
        source: "name",
        maxLength: 64,
      },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = value?.current?.trim();
          if (!slug) {
            return "슬러그를 입력하세요.";
          }
          if (reservedSlugs.has(slug)) {
            return `"${slug}"는 고정 페이지 주소와 겹칩니다.`;
          }

          const client = context.getClient({ apiVersion: "2026-09-09" });
          const taken = await client.fetch<number>(
            `count(*[_type == "platform" && slug.current == $slug])`,
            { slug },
          );

          if (taken > 0) {
            return `"${slug}"는 이미 플랫폼 주소로 쓰입니다.`;
          }

          return true;
        }),
    }),
    defineField({
      name: "offerType",
      title: "상품 유형",
      type: "string",
      description: "이 메뉴에 모을 할인코드 종류",
      options: {
        list: [
          { title: "숙소", value: "stay" },
          { title: "투어", value: "tour" },
          { title: "항공", value: "flight" },
          { title: "패키지", value: "package" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "국내/해외",
      type: "string",
      options: {
        list: [
          { title: "국내", value: "국내" },
          { title: "해외", value: "해외" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "페이지 설명",
      type: "text",
      rows: 3,
      description: "허브 페이지와 검색 결과에 쓰는 한두 문장",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "searchKeyword",
      title: "검색 키워드",
      type: "string",
      description: "비우면 「이름 + 할인코드」로 채웁니다. 예: 해외숙소 할인코드",
    }),
    defineField({
      name: "sortOrder",
      title: "메뉴 순서",
      type: "number",
      description: "작은 숫자가 위에 옵니다.",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "listed",
      title: "노출",
      type: "boolean",
      description:
        "끄면 메뉴·사이트맵에서 숨깁니다. 켜 있어도 사이트가 보여주는 달에 할인코드가 없으면 자동으로 숨깁니다.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "메뉴 순서",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      offerType: "offerType",
    },
    prepare({ title, category, offerType }) {
      return {
        title,
        subtitle: [category, offerType].filter(Boolean).join(" · "),
      };
    },
  },
});
