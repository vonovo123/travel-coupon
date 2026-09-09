import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/** 공개된 플랫폼·쿠폰 읽기용. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
