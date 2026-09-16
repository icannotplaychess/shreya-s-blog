import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { Guestbook } from "@/components/guestbook/Guestbook";

export const metadata: Metadata = {
  title: "Guestbook ~ Shankie's",
  description: "leave a scrap in shankie's guestbook before u leave!",
};

export default function GuestbookPage() {
  return (
    <div>
      <EditablePageHeader page="guestbook" />
      <Guestbook />
    </div>
  );
}
