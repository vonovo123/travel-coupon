import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "codeyssey",
  title: "코드세이아",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id("content")
          .title("콘텐츠")
          .items([
            S.documentTypeListItem("platform").id("platform").title("플랫폼"),
            S.documentTypeListItem("coupon").id("coupon").title("할인코드"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
