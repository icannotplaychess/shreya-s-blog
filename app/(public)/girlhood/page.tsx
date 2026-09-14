import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { BucketList } from "@/components/girlhood/BucketList";
import { SmileNotes } from "@/components/girlhood/SmileNotes";
import { LifeLately } from "@/components/girlhood/LifeLately";

export const metadata: Metadata = {
  title: "Girlhood ~ Shankie's",
  description: "summer bucket list, things that made me smile & life lately. the soft stuff.",
};

export default function GirlhoodPage() {
  return (
    <div>
      <PageHeader
        title="GIRLHOOD"
        subtitle="the soft archive: bucket lists, tiny joys & everything in between. handle with care (and glitter)."
        stickers={[
          { text: "dreaming...", palette: 5, rotate: -4 },
          { text: "soft launch", palette: 3, rotate: 5 },
        ]}
      />
      <div className="space-y-10">
        <BucketList />
        <SmileNotes />
        <LifeLately />
      </div>
    </div>
  );
}
