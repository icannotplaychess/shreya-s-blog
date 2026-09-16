import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
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
      <EditablePageHeader page="girlhood" />
      <div className="space-y-10">
        <BucketList />
        <SmileNotes />
        <LifeLately />
      </div>
    </div>
  );
}
