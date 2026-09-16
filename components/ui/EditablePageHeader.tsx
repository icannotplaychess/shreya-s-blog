"use client";

import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { PageHeader } from "./PageHeader";
import type { PagesContent } from "@/lib/site-content";

type PageKey = keyof Omit<PagesContent, "playlistsStickyNote">;

export function EditablePageHeader({ page }: { page: PageKey }) {
  const { pages } = useSiteContent();
  const config = pages[page];
  return <PageHeader title={config.title} subtitle={config.subtitle} stickers={config.stickers} />;
}
