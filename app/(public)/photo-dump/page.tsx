import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CmsPostFeed } from "@/components/content/CmsPostFeed";

export const metadata: Metadata = {
  title: "Photo Dump ~ Shankie's",
  description: "polaroids, film strips & the messy collage wall.",
};

export default function PhotoDumpPage() {
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
      <CmsPostFeed type="PHOTO_DUMP" title="" layout="grid" />
    </div>
  );
}
