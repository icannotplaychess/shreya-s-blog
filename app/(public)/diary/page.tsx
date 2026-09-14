export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connection } from "next/server";
import type { Metadata } from "next";
import { ContentType } from "@/generated/prisma/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { StickyNote } from "@/components/ui/SpeechBubble";
import { getPublishedPosts } from "@/lib/posts";
import { PostCard } from "@/components/content/PostRenderer";

export const metadata: Metadata = {
  title: "Diary ~ Shankie's",
  description: "scanned pages from shankie's top-secret notebook. do not read (please read).",
};

export default async function DiaryPage() {
  await connection();
  const entries = await getPublishedPosts({ type: ContentType.DIARY });

  return (
    <div>
      <PageHeader
        title="MY DIARY"
        subtitle="scanned pages from my top-secret notebook. if u are priya: STOP READING. if u are anyone else: enjoy."
        stickers={[
          { text: "TOP SECRET!!", palette: 1, rotate: -6 },
          { text: "juicy", palette: 0, rotate: 5 },
          { text: "do not tell amma", palette: 2, rotate: -3 },
        ]}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {entries.length > 0 ? (
          entries.map((entry) => <PostCard key={entry.id} post={entry} />)
        ) : (
          <StickyNote color="#ffd1ec" rotate={-2} className="max-w-sm mx-auto">
            <p className="font-indie text-sm text-inkberry text-center">
              no diary entries yet... check back soon!! ★
            </p>
          </StickyNote>
        )}
      </div>
    </div>
  );
}
