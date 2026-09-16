import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { Moodboard } from "@/components/style/Moodboard";
import { StyleClippings } from "@/components/style/StyleClippings";

export const metadata: Metadata = {
  title: "Style Files ~ Shankie's",
  description: "moodboards, magazine clippings & kareena-core fashion notes.",
};

export default function StylePage() {
  return (
    <div>
      <EditablePageHeader page="style" />
      <div className="space-y-10">
        <Moodboard />
        <StyleClippings />
      </div>
    </div>
  );
}
