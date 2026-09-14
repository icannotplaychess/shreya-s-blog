import { ContentType } from "@/generated/prisma/client";
import { getPublishedPosts } from "@/lib/posts";
import { PostList } from "@/components/content/PostRenderer";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function BlogPage() {
  const posts = await getPublishedPosts({ type: ContentType.BLOG });

  return (
    <div className="py-4">
      <PageHeader title="Blog" subtitle="essays, stories & random thoughts ~" />
      <PostList posts={posts} title="LATEST FROM SHANKIE'S" />
    </div>
  );
}
