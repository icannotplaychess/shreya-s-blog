export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connection } from "next/server";
import type { Metadata } from "next";
import { ContentType } from "@/generated/prisma/client";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublishedPosts } from "@/lib/posts";
import { PostCard } from "@/components/content/PostRenderer";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

export const metadata: Metadata = {
  title: "Photo Dump ~ Shankie's",
  description: "polaroids, film strips & the messy collage wall.",
};

export default async function PhotoDumpPage() {
  await connection();
  const dumps = await getPublishedPosts({ type: ContentType.PHOTO_DUMP });

  return (
    <div>
      <PageHeader
        title="PHOTO DUMP"
        subtitle="developed at the studio near the bus stand (double copies, obviously). click any dump for the full collage!"
        stickers={[
          { text: "say cheeeese", palette: 2, rotate: -5 },
          { text: "kodak moment", palette: 4, rotate: 4 },
        ]}
      />
      {dumps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {dumps.map((dump) => <PostCard key={dump.id} post={dump} />)}
        </div>
      ) : (
        <SpeechBubble color="#ffd1ec" className="max-w-md mx-auto text-center">
          <p className="font-comic text-sm">no photo dumps yet... coming soon!!</p>
        </SpeechBubble>
      )}
    </div>
  );
}
