import { NextRequest, NextResponse } from "next/server";
import { ContentType } from "@/generated/prisma/client";
import { getPublishedPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get("type") as ContentType | null;
  const limit = searchParams.get("limit");

  const posts = await getPublishedPosts({
    type: type || undefined,
    limit: limit ? Number(limit) : undefined,
  });

  return NextResponse.json(posts);
}
