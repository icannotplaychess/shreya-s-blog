import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Guestbook } from "@/components/guestbook/Guestbook";

export const metadata: Metadata = {
  title: "Guestbook ~ Shankie's",
  description: "sign the guestbook!! it's the law of the old internet.",
};

export default function GuestbookPage() {
  return (
    <div>
      <PageHeader
        title="GUESTBOOK"
        subtitle="the sacred tradition. leave a scrap like it's orkut. be nice or i'll tell ur mom."
        stickers={[
          { text: "sign it!!", palette: 1, rotate: -5 },
          { text: "b nice pls", palette: 3, rotate: 4 },
        ]}
      />
      <Guestbook />
    </div>
  );
}
