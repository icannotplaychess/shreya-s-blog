import { NextResponse } from "next/server";
import { loadSiteContent } from "@/lib/load-site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await loadSiteContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
