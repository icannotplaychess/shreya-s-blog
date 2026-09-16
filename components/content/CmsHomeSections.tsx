"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostWithRelations } from "@/lib/post-types";
import { PostCard } from "@/components/content/PostRenderer";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Sticker } from "@/components/ui/Sticker";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function CmsHomeSections() {
  const { homepage } = useSiteContent();
  const [latestPosts, setLatestPosts] = useState<PostWithRelations[]>([]);
  const [latestDiary, setLatestDiary] = useState<PostWithRelations | null>(null);
  const [latestPhotoDump, setLatestPhotoDump] = useState<PostWithRelations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/public/posts?limit=4").then((r) => r.json()),
      fetch("/api/public/posts?type=DIARY&limit=1").then((r) => r.json()),
      fetch("/api/public/posts?type=PHOTO_DUMP&limit=1").then((r) => r.json()),
    ])
      .then(([posts, diary, dumps]) => {
        setLatestPosts(Array.isArray(posts) ? posts : []);
        setLatestDiary(Array.isArray(diary) && diary[0] ? diary[0] : null);
        setLatestPhotoDump(Array.isArray(dumps) && dumps[0] ? dumps[0] : null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SpeechBubble color="#ffd1ec">
        <p className="font-comic text-sm">loading latest posts...</p>
      </SpeechBubble>
    );
  }

  return (
    <>
      {homepage.currentObsession && (
        <section className="paper-card p-4 sm:p-6 rotate-[0.3deg]">
          <CutoutHeading text="CURRENTLY OBSESSED WITH" size="text-xl sm:text-2xl" />
          <p className="font-marker text-lg text-hotpink mt-2">{homepage.currentObsession}</p>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CutoutHeading text="latest from shankie's" size="text-2xl sm:text-3xl" />
            <Sticker size="text-2xl" className="anim-wiggle" rotate={6}>✨</Sticker>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Link href="/blog" className="inline-block mt-4 font-lucky text-sm text-magenta hover:underline">
            see all posts →
          </Link>
        </section>
      )}

      {(latestDiary || latestPhotoDump) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestDiary && (
            <section>
              <CutoutHeading text="dear diary..." size="text-xl sm:text-2xl" className="mb-3" />
              <PostCard post={latestDiary} />
            </section>
          )}
          {latestPhotoDump && (
            <section>
              <CutoutHeading text="photo dump" size="text-xl sm:text-2xl" className="mb-3" />
              <PostCard post={latestPhotoDump} />
            </section>
          )}
        </div>
      )}
    </>
  );
}
