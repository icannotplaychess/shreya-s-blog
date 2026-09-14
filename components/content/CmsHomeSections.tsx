"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PostWithRelations } from "@/lib/post-types";
import { PostCard } from "@/components/content/PostRenderer";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Sticker } from "@/components/ui/Sticker";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

interface HomepageSettings {
  tagline?: string;
  subtitle?: string;
  currentObsession?: string;
  songOfTheWeek?: { title: string; artist: string; note: string };
  mood?: string;
  quote?: string;
  welcomeMessage?: string;
}

export function CmsHomeSections() {
  const [latestPosts, setLatestPosts] = useState<PostWithRelations[]>([]);
  const [latestDiary, setLatestDiary] = useState<PostWithRelations | null>(null);
  const [latestPhotoDump, setLatestPhotoDump] = useState<PostWithRelations | null>(null);
  const [settings, setSettings] = useState<HomepageSettings>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/public/posts?limit=4").then((r) => r.json()),
      fetch("/api/public/posts?type=DIARY&limit=1").then((r) => r.json()),
      fetch("/api/public/posts?type=PHOTO_DUMP&limit=1").then((r) => r.json()),
      fetch("/api/public/settings").then((r) => r.json()).catch(() => ({})),
    ])
      .then(([posts, diary, dumps, siteSettings]) => {
        setLatestPosts(Array.isArray(posts) ? posts : []);
        setLatestDiary(Array.isArray(diary) && diary[0] ? diary[0] : null);
        setLatestPhotoDump(Array.isArray(dumps) && dumps[0] ? dumps[0] : null);
        setSettings(siteSettings?.homepage ?? siteSettings ?? {});
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
      <section>
        <div className="flex items-center gap-3 mb-4">
          <CutoutHeading text="latest from shankie's" className="text-3xl sm:text-4xl text-grape" />
          <Sticker size="text-3xl" className="anim-bounce-tiny" rotate={8}>★</Sticker>
        </div>
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {latestPosts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <SpeechBubble color="#ffd1ec">
            <p className="font-comic text-sm">no posts yet... coming soon!!</p>
          </SpeechBubble>
        )}
        <Link href="/blog" className="inline-block mt-4 font-lucky text-sm text-hotpink hover:underline">
          see all posts →
        </Link>
      </section>

      {(latestDiary || latestPhotoDump) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {latestDiary && (
            <div>
              <h3 className="font-bangers text-2xl text-hotpink outline-text mb-3">dear diary...</h3>
              <PostCard post={latestDiary} />
            </div>
          )}
          {latestPhotoDump && (
            <div>
              <h3 className="font-bangers text-2xl text-cyanpop outline-text mb-3">photo dump</h3>
              <PostCard post={latestPhotoDump} />
            </div>
          )}
        </section>
      )}

      {settings.currentObsession && (
        <section className="paper-card p-4 -rotate-1">
          <h3 className="font-bangers text-xl text-magenta mb-2">currently obsessed with</h3>
          <p className="font-chewy text-lg text-inkberry">{settings.currentObsession}</p>
        </section>
      )}
    </>
  );
}
