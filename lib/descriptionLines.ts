export function descriptionLines(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  const byNewline = trimmed
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-•·]\s*/, "").trim())
    .filter(Boolean);

  if (byNewline.length > 1) {
    return byNewline;
  }

  return trimmed
    .split(/(?<=다\.|음\.|요\.)\s+|(?<=\.)\s+(?=[가-힣0-9])/)
    .flatMap((part) => part.split(/,\s+(?=[가-힣0-9])/))
    .map((line) => line.replace(/\.$/, "").trim())
    .filter(Boolean);
}
