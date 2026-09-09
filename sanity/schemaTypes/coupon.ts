import { defineField, defineType } from "sanity";

export const couponType = defineType({
  name: "coupon",
  title: "할인코드",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "제목",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "platform",
      title: "플랫폼",
      type: "reference",
      to: [{ type: "platform" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "offerType",
      title: "상품 유형",
      type: "string",
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
          { title: "공통", value: "공통" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "할인코드",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "적용 조건",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "validUntil",
      title: "유효 기간",
      type: "date",
      description: "이 날짜까지 사용. 비우면 기간 미정으로 둡니다.",
    }),
    defineField({
      name: "affiliateLink",
      title: "쿠폰 전용 제휴 링크",
      type: "url",
      description: "비우면 플랫폼 제휴 링크를 씁니다.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      code: "code",
      platform: "platform.name",
    },
    prepare({ title, code, platform }) {
      return {
        title,
        subtitle: [platform, code].filter(Boolean).join(" · "),
      };
    },
  },
});
