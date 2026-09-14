"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostWithRelations } from "@/lib/post-types";
import { PostSpread } from "@/components/content/PostRenderer";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

export function CmsPostView({ slug }: { slug: string }) {
  const [post, setPost] = useState<PostWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/public/posts/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data) => setPost(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <SpeechBubble color="#ffd1ec" className="max-w-md mx-auto text-center">
        <p className="font-comic text-sm">loading...</p>
      </SpeechBubble>
    );
  }

  if (notFound || !post) {
    return (
      <div className="text-center py-12">
        <p className="font-bangers text-2xl text-hotpink mb-4">post not found!!</p>
        <Link href="/" className="font-lucky text-grape hover:text-hotpink">← back home</Link>
      </div>
    );
  }

  return <PostSpread post={post} />;
}
