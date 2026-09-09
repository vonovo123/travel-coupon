import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/** 공개 문서 읽기용. 아직 페이지 getter에는 연결하지 않음. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
