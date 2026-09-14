import { ContentType, PostStatus, Prisma } from "@/generated/prisma/client";
import { prisma } from "./prisma";

/** Skip all DB reads during `next build` — Vercel may still prerender CMS routes. */
function shouldSkipDb(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function isMissingTableError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const e = error as { code?: string; message?: string };
  if (e.code === "P2021") return true;
  if (e.message?.includes("TableDoesNotExist")) return true;
  if (e.message?.includes("does not exist")) return true;
  return false;
}

export type { PostWithRelations } from "./post-types";
import type { PostWithRelations } from "./post-types";

const postInclude = {
  coverImage: true,
  categories: true,
  tags: true,
  mediaItems: { include: { media: true }, orderBy: { sortOrder: "asc" as const } },
};

export async function getPublishedPosts(options?: {
  type?: ContentType;
  limit?: number;
  categorySlug?: string;
}) {
  if (shouldSkipDb()) return [];
  const { type, limit, categorySlug } = options ?? {};
  try {
  return await prisma.post.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      ...(type ? { type } : {}),
      ...(categorySlug
        ? { categories: { some: { slug: categorySlug } } }
        : {}),
    },
    include: postInclude,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    ...(limit ? { take: limit } : {}),
  });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string, publishedOnly = true) {
  if (shouldSkipDb()) return null;
  try {
  return await prisma.post.findFirst({
    where: {
      slug,
      ...(publishedOnly ? { status: PostStatus.PUBLISHED } : {}),
    },
    include: postInclude,
  });
  } catch {
    return null;
  }
}

export async function getLatestByType(type: ContentType) {
  if (shouldSkipDb()) return null;
  try {
  return await prisma.post.findFirst({
    where: { type, status: PostStatus.PUBLISHED },
    include: postInclude,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
  } catch {
    return null;
  }
}

export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  if (shouldSkipDb()) return fallback;
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key } });
    if (!row) return fallback;
    try {
      return JSON.parse(row.value) as T;
    } catch {
      return fallback;
    }
  } catch {
    return fallback;
  }
}

export async function setSiteSetting(key: string, value: unknown) {
  return prisma.siteSetting.upsert({
    where: { key },
    create: { key, value: JSON.stringify(value) },
    update: { value: JSON.stringify(value) },
  });
}

export { parsePostMetadata, parsePostContent } from "./post-utils";
