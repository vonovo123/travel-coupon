import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SANITY_CACHE_TAG } from "@/lib/content/sanityCache";

export const dynamic = "force-dynamic";

function readSecret(request: NextRequest) {
  const fromQuery = request.nextUrl.searchParams.get("secret");
  const authorization = request.headers.get("authorization");
  const fromHeader = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : null;

  return fromQuery || fromHeader;
}

function revalidateSanityPages() {
  revalidateTag(SANITY_CACHE_TAG);
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
}

export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  if (readSecret(request) !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateSanityPages();

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function GET(request: NextRequest) {
  return POST(request);
}
