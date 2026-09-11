import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/** 공개된 플랫폼·쿠폰 읽기용. Next ISR이 캐시하므로 Sanity CDN은 쓰지 않습니다. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
