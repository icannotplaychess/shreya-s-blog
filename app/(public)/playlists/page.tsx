"use client";

import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { MusicPlayer } from "@/components/widgets/MusicPlayer";
import { CdCaseGrid } from "@/components/music/CdCaseGrid";
import { SongOfTheWeek } from "@/components/music/SongOfTheWeek";
import { StickyNote } from "@/components/ui/SpeechBubble";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export default function PlaylistsPage() {
  const { homepage, pages } = useSiteContent();
  const song = homepage.songOfTheWeek;

  return (
    <div>
      <EditablePageHeader page="playlists" />
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        <div className="space-y-5">
          <MusicPlayer />
          <SongOfTheWeek title={song.title} artist={song.artist} note={song.note} />
          <StickyNote color="#c9f4ff" rotate={-2}>
            <p className="font-indie text-sm text-inkberry">{pages.playlistsStickyNote}</p>
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
