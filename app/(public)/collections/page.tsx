import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { CandyShelf } from "@/components/collections/CandyShelf";
import { TreasureBox } from "@/components/collections/TreasureBox";

export const metadata: Metadata = {
  title: "Collections ~ Shankie's",
  description: "the candy museum, sticker hoard & treasure box. a certified 2000s indian childhood archive.",
};

export default function CollectionsPage() {
  return (
    <div>
      <EditablePageHeader page="collections" />
      <div className="space-y-10">
        <CandyShelf />
        <TreasureBox />
      </div>
    </div>
  );
}
