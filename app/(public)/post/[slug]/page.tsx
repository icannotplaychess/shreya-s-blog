import Link from "next/link";
import { notFound } from "next/navigation";
import { PostSpread } from "@/components/content/PostRenderer";
import { getPostBySlug } from "@/lib/posts";
import { serializePost } from "@/lib/serialize-post";

type Params = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative py-4">
      <Link
        href="/"
        className="inline-block mb-6 font-lucky text-sm text-grape hover:text-hotpink glossy px-4 py-1.5 bg-white/80"
      >
        ← back home
      </Link>
      <PostSpread post={serializePost(post)} />
    </div>
  );
}
