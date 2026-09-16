import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
import { ContentType, PostStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { postSchema } from "@/lib/validations";
import { uniqueSlug } from "@/lib/slug";
import { syncPostMedia } from "@/lib/sync-post-media";

export async function GET(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") as PostStatus | null;
  const type = searchParams.get("type") as ContentType | null;
  const q = searchParams.get("q");

  const posts = await prisma.post.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { excerpt: { contains: q } },
            ],
          }
        : {}),
    },
    include: {
      coverImage: true,
      categories: true,
      tags: true,
    },
    orderBy: [{ updatedAt: "desc" }],
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const slug = data.slug
    ? data.slug
    : await uniqueSlug(data.title, async (s) => !!(await prisma.post.findUnique({ where: { slug: s } })));

  const status = data.status ?? PostStatus.DRAFT;
  const publishedAt =
    status === PostStatus.PUBLISHED
      ? data.publishedAt ? new Date(data.publishedAt) : new Date()
      : null;

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content ?? "{}",
      type: data.type,
      status,
      coverImageId: data.coverImageId ?? null,
      metadata: data.metadata ?? "{}",
      publishedAt,
      categories: data.categoryIds?.length
        ? { connect: data.categoryIds.map((id) => ({ id })) }
        : undefined,
      tags: data.tagIds?.length ? { connect: data.tagIds.map((id) => ({ id })) } : undefined,
    },
    include: { coverImage: true, categories: true, tags: true },
  });

  if (data.mediaItems?.length) {
    await syncPostMedia(post.id, data.mediaItems);
  } else if (data.mediaIds?.length) {
    await syncPostMedia(
      post.id,
      data.mediaIds.map((mediaId) => ({ mediaId }))
    );
  }

  return NextResponse.json(post, { status: 201 });
}
