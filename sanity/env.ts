function assertValue<T>(
  value: T | undefined,
  errorMessage: string,
): T {
  if (value === undefined || value === "") {
    throw new Error(errorMessage);
  }

  return value;
}

/** Studio(Vite)는 SANITY_STUDIO_만 주입하고, Next는 NEXT_PUBLIC_를 씀. */
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  "2026-09-09";

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    "production",
  "Missing environment variable: SANITY_STUDIO_DATASET",
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID",
);
