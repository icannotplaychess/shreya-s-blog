import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "@/components/admin/PostEditor";

type Params = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Params) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: true,
      tags: true,
      mediaItems: { include: { media: true } },
      coverImage: true,
    },
  });

  if (!post) notFound();

  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit: {post.title}</h1>
        {post.status === "PUBLISHED" && (
          <a
            href={`/post/${post.slug}`}
            target="_blank"
            className="text-sm text-pink-600 hover:underline"
          >
            View on site ↗
          </a>
        )}
      </div>
      <PostEditor
        categories={categories}
        tags={tags}
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          type: post.type,
          status: post.status,
          coverImageId: post.coverImageId,
          coverImageUrl: post.coverImage?.url ?? null,
          metadata: post.metadata,
          categoryIds: post.categories.map((c) => c.id),
          tagIds: post.tags.map((t) => t.id),
          mediaIds: post.mediaItems.map((m) => m.mediaId),
          initialMedia: post.mediaItems.map((m) => m.media),
        }}
      />
    </div>
  );
}
