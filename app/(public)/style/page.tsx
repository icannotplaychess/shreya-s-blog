import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Moodboard } from "@/components/style/Moodboard";
import { StyleClippings } from "@/components/style/StyleClippings";

export const metadata: Metadata = {
  title: "Style Files ~ Shankie's",
  description: "moodboards, magazine clippings & fashion notes. kareena-core studies.",
};

export default function StylePage() {
  return (
    <div>
      <PageHeader
        title="STYLE FILES"
        subtitle="research conducted via filmfare, stardust & staring at seniors. all clippings glued with fevicol & devotion."
        stickers={[
          { text: "sooo fetch", palette: 0, rotate: -4 },
          { text: "kareena-core", palette: 5, rotate: 5 },
        ]}
      />
      <div className="space-y-10">
        <Moodboard />
        <StyleClippings />
      </div>
    </div>
  );
}
