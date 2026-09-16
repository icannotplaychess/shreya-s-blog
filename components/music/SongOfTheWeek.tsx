"use client";

import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { WidgetWindow } from "@/components/widgets/SidebarWidgets";

export function SongOfTheWeek({
  title,
  artist,
  note,
}: {
  title?: string;
  artist?: string;
  note?: string;
}) {
  const { homepage, songOfTheWeek } = useSiteContent();
  const displayTitle = title || homepage.songOfTheWeek.title || songOfTheWeek.title;
  const displayArtist = artist || homepage.songOfTheWeek.artist || songOfTheWeek.artist;
  const displayNote = note || homepage.songOfTheWeek.note || songOfTheWeek.note;

  return (
    <WidgetWindow title={songOfTheWeek.widgetTitle} rotate={1}>
      <div className="rhinestone-border rounded-xl bg-gradient-to-br from-babypink to-lilac/60 p-3">
        <p className="font-chewy text-lg text-magenta">&ldquo;{displayTitle}&rdquo;</p>
        <p className="font-comic text-xs text-inkberry mb-2">{displayArtist}</p>
        <div className="lined-paper rounded p-2 pl-5">
          <p className="font-indie text-[13px] text-[#3a3050] leading-relaxed">{displayNote}</p>
          <p className="font-indie text-[10px] text-magenta mt-1">{songOfTheWeek.disclaimer}</p>
        </div>
      </div>
    </WidgetWindow>
  );
}
