import { ContentType, PostStatus, Prisma } from "@/generated/prisma/client";
import { prisma } from "./prisma";

export type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    coverImage: true;
    categories: true;
    tags: true;
    mediaItems: { include: { media: true }; orderBy: { sortOrder: "asc" } };
  };
}>;

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
  const { type, limit, categorySlug } = options ?? {};
  return prisma.post.findMany({
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
}

export async function getPostBySlug(slug: string, publishedOnly = true) {
  return prisma.post.findFirst({
    where: {
      slug,
      ...(publishedOnly ? { status: PostStatus.PUBLISHED } : {}),
    },
    include: postInclude,
  });
}

export async function getLatestByType(type: ContentType) {
  return prisma.post.findFirst({
    where: { type, status: PostStatus.PUBLISHED },
    include: postInclude,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });
}

export async function getSiteSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  if (!row) return fallback;
  try {
    return JSON.parse(row.value) as T;
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

export function parsePostMetadata<T>(metadata: string, fallback: T): T {
  try {
    return JSON.parse(metadata) as T;
  } catch {
    return fallback;
  }
}

export function parsePostContent(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    return { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: content }] }] };
  }
}
