import { WidgetWindow } from "@/components/widgets/SidebarWidgets";

/** Song-of-the-week card with hand-copied lyrics. */
export function SongOfTheWeek({
  title,
  artist,
  note,
}: {
  title?: string;
  artist?: string;
  note?: string;
}) {
  const displayTitle = title || "Kabhi Kabhi Aditi";
  const displayArtist = artist || "Rashid Ali — Jaane Tu... Ya Jaane Na (2008)";
  const displayNote = note || "kabhi kabhi aditi zindagi mein yun hi koi apna lagta hai... ♪";

  return (
    <WidgetWindow title="🏆 song of the week" rotate={1}>
      <div className="rhinestone-border rounded-xl bg-gradient-to-br from-babypink to-lilac/60 p-3">
        <p className="font-chewy text-lg text-magenta">&ldquo;{displayTitle}&rdquo;</p>
        <p className="font-comic text-xs text-inkberry mb-2">{displayArtist}</p>
        <div className="lined-paper rounded p-2 pl-5">
          <p className="font-indie text-[13px] text-[#3a3050] leading-relaxed">{displayNote}</p>
          <p className="font-indie text-[10px] text-magenta mt-1">
            (lyrics copied from the TV scroll, may contain errors, do not sue)
          </p>
        </div>
      </div>
    </WidgetWindow>
  );
}
