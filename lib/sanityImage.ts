/** Sanity CDN URL에 리사이즈 파라미터를 붙인다. 로컬 경로는 그대로 둔다. */
export function sanityImageSrc(
  url: string | undefined,
  width: number,
): string | undefined {
  if (!url) {
    return undefined;
  }

  if (!url.startsWith("https://cdn.sanity.io/")) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&auto=format`;
}
