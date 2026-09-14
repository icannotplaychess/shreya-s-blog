"use client";

import { useEffect, useState } from "react";
import type { PostWithRelations } from "@/lib/post-types";
import { PostCard, PostList } from "@/components/content/PostRenderer";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

export function CmsPostFeed({
  type,
  title,
  limit,
  layout = "list",
}: {
  type?: string;
  title: string;
  limit?: number;
  layout?: "list" | "grid";
}) {
  const [posts, setPosts] = useState<PostWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (limit) params.set("limit", String(limit));

    fetch(`/api/public/posts?${params}`)
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [type, limit]);

  if (loading) {
    return (
      <SpeechBubble color="#ffd1ec" className="max-w-md mx-auto text-center">
        <p className="font-comic text-sm">loading...</p>
      </SpeechBubble>
    );
  }

  if (layout === "grid") {
    return (
      <div>
        {title ? (
          <h2 className="font-bangers outline-text text-3xl sm:text-4xl text-grape mb-4">{title}</h2>
        ) : null}
        {posts.length === 0 ? (
          <SpeechBubble color="#ffd1ec">
            <p className="font-comic text-sm">nothing here yet... check back soon!! ★</p>
          </SpeechBubble>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    );
  }

  return <PostList posts={posts} title={title} />;
}
