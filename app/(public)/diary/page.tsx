import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";

export const metadata: Metadata = {
  title: "Diary ~ Shankie's",
  description: "scanned pages from shankie's top-secret notebook. do not read (please read).",
};

export default function DiaryPage() {
  return (
    <div>
      <EditablePageHeader page="diary" />
      <div className="max-w-3xl mx-auto">
        <CmsPostFeed type="DIARY" title="" layout="grid" />
      </div>
    </div>
  );
}
