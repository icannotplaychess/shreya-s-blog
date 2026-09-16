import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";

export const metadata: Metadata = {
  title: "Photo Dump ~ Shankie's",
  description: "polaroids, film strips & shankie's messy collage wall.",
};

export default function PhotoDumpPage() {
  return (
    <div>
      <EditablePageHeader page="photoDump" />
      <CmsPostFeed type="PHOTO_DUMP" title="" layout="grid" />
    </div>
  );
}
