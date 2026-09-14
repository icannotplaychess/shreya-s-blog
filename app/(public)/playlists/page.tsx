import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { MusicPlayer } from "@/components/widgets/MusicPlayer";
import { CdCaseGrid } from "@/components/music/CdCaseGrid";
import { SongOfTheWeek } from "@/components/music/SongOfTheWeek";
import { StickyNote } from "@/components/ui/SpeechBubble";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";

export const metadata: Metadata = {
  title: "Playlists ~ Shankie's",
  description: "burned CDs, cassette rips & the sacred profile song.",
};

export default function PlaylistsPage() {
  return (
    <div>
      <PageHeader
        title="PLAYLISTS"
        subtitle="my entire music empire: burned CDs, surviving cassettes & a profile song i change every full moon."
        stickers={[
          { text: "vol. up!!", palette: 3, rotate: -4 },
          { text: "no skips", palette: 1, rotate: 5 },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        <div className="space-y-5">
          <MusicPlayer />
          <SongOfTheWeek />
          <StickyNote color="#c9f4ff" rotate={-2}>
            <p className="font-indie text-sm text-inkberry">
              track order is a SCIENCE: opener must slap, track 3 is for crying, last track must be
              &ldquo;it&apos;s my life&rdquo; or the CD is legally invalid.
            </p>
          </StickyNote>
        </div>
        <div className="space-y-6">
          <CmsPostFeed type="PLAYLIST" title="" layout="grid" />
          <CdCaseGrid />
        </div>
      </div>
    </div>
  );
}
