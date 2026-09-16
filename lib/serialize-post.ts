import type { PostWithRelations, ContentTypeValue } from "./post-types";
import type { getPostBySlug } from "./posts";

type DbPost = NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>;

/** Serialize a Prisma post for client components (dates → ISO strings). */
export function serializePost(post: DbPost): PostWithRelations {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    type: post.type as ContentTypeValue,
    status: post.status,
    metadata: post.metadata,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
    coverImage: post.coverImage
      ? {
          id: post.coverImage.id,
          url: post.coverImage.url,
          alt: post.coverImage.alt,
          mimeType: post.coverImage.mimeType,
          originalName: post.coverImage.originalName,
        }
      : null,
    categories: post.categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
    tags: post.tags.map((t) => ({ id: t.id, name: t.name, slug: t.slug })),
    mediaItems: post.mediaItems.map((item) => ({
      caption: item.caption,
      media: {
        id: item.media.id,
        url: item.media.url,
        alt: item.media.alt,
        mimeType: item.media.mimeType,
        originalName: item.media.originalName,
      },
    })),
  };
}
