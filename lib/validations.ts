import { ContentType, PostStatus } from "@/generated/prisma/client";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  type: z.nativeEnum(ContentType),
  status: z.nativeEnum(PostStatus).optional(),
  coverImageId: z.string().nullable().optional(),
  metadata: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
  mediaIds: z.array(z.string()).optional(),
  mediaItems: z
    .array(
      z.object({
        mediaId: z.string(),
        caption: z.string().optional(),
      })
    )
    .optional(),
  publishedAt: z.string().nullable().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
});

export const tagSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
});

export const guestbookSchema = z.object({
  name: z.string().min(1).max(80),
  message: z.string().min(1).max(1000),
});
