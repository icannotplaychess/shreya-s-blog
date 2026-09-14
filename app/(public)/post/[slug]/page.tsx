import Link from "next/link";
import { CmsPostView } from "@/components/content/CmsPostView";

type Params = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Params) {
  const { slug } = await params;

  return (
    <div className="relative py-4">
      <Link
        href="/"
        className="inline-block mb-6 font-lucky text-sm text-grape hover:text-hotpink glossy px-4 py-1.5 bg-white/80"
      >
        ← back home
      </Link>
      <CmsPostView slug={slug} />
    </div>
  );
}
