import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
import { PostStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { postSchema } from "@/lib/validations";
import { uniqueSlug } from "@/lib/slug";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      coverImage: true,
      categories: true,
      tags: true,
      mediaItems: { include: { media: true }, orderBy: { sortOrder: "asc" } },
    },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = postSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  let slug = data.slug ?? existing.slug;
  if (data.title && !data.slug) {
    slug = await uniqueSlug(
      data.title,
      async (s) => !!(await prisma.post.findFirst({ where: { slug: s, NOT: { id } } }))
    );
  }

  const status = data.status ?? existing.status;
  let publishedAt = existing.publishedAt;
  if (status === PostStatus.PUBLISHED && !existing.publishedAt) {
    publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();
  } else if (status === PostStatus.DRAFT) {
    publishedAt = null;
  } else if (data.publishedAt) {
    publishedAt = new Date(data.publishedAt);
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      slug,
      ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.type !== undefined ? { type: data.type } : {}),
      status,
      publishedAt,
      ...(data.coverImageId !== undefined ? { coverImageId: data.coverImageId } : {}),
      ...(data.metadata !== undefined ? { metadata: data.metadata } : {}),
      ...(data.categoryIds !== undefined
        ? { categories: { set: data.categoryIds.map((cid) => ({ id: cid })) } }
        : {}),
      ...(data.tagIds !== undefined
        ? { tags: { set: data.tagIds.map((tid) => ({ id: tid })) } }
        : {}),
    },
    include: { coverImage: true, categories: true, tags: true },
  });

  if (data.mediaIds !== undefined) {
    await prisma.postMedia.deleteMany({ where: { postId: id } });
    if (data.mediaIds.length) {
      await prisma.postMedia.createMany({
        data: data.mediaIds.map((mediaId, i) => ({
          postId: id,
          mediaId,
          sortOrder: i,
        })),
      });
    }
  }

  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const { id } = await params;
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
