import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "codeyssey",
  title: "코드세이아",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous,
      {
        id: "coupon-by-period",
        title: "할인코드",
        schemaType: "coupon",
        parameters: [
          { name: "year", type: "number" },
          { name: "month", type: "number" },
        ],
        value: ({ year, month }: { year: number; month: number }) => ({
          year,
          month,
        }),
      },
      {
        id: "platform-listed",
        title: "플랫폼 (노출)",
        schemaType: "platform",
        value: {
          listed: true,
        },
      },
      {
        id: "platform-unlisted",
        title: "플랫폼 (비노출)",
        schemaType: "platform",
        value: {
          listed: false,
        },
      },
    ],
  },
});
