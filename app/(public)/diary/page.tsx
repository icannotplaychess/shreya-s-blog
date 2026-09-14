import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";

export const metadata: Metadata = {
  title: "Diary ~ Shankie's",
  description: "scanned pages from shankie's top-secret notebook. do not read (please read).",
};

export default function DiaryPage() {
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
      <div className="max-w-3xl mx-auto">
        <CmsPostFeed type="DIARY" title="" layout="grid" />
      </div>
    </div>
  );
}
