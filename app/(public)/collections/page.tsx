import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CandyShelf } from "@/components/collections/CandyShelf";
import { TreasureBox } from "@/components/collections/TreasureBox";

export const metadata: Metadata = {
  title: "Collections ~ Shankie's",
  description: "the candy museum, sticker hoard & treasure box. a certified 2000s indian childhood archive.",
};

export default function CollectionsPage() {
  return (
    <div>
      <PageHeader
        title="COLLECTIONS"
        subtitle="my museum of extremely important artifacts. entry fee: one poppins (orange, non-negotiable)."
        stickers={[
          { text: "do not touch!!", palette: 1, rotate: -5 },
          { text: "ok u can touch", palette: 2, rotate: 4 },
        ]}
      />
      <div className="space-y-10">
        <CandyShelf />
        <TreasureBox />
      </div>
    </div>
  );
}
