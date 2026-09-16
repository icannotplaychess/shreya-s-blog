"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_SITE_CONTENT, mergeSiteContent, type SiteContent } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent>(DEFAULT_SITE_CONTENT);

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent?: SiteContent;
}) {
  const [content, setContent] = useState<SiteContent>(
    initialContent ? mergeSiteContent(initialContent) : DEFAULT_SITE_CONTENT
  );

  useEffect(() => {
    fetch("/api/public/settings", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load settings");
        return r.json();
      })
      .then((data) => setContent(mergeSiteContent(data)))
      .catch(() => {});
  }, []);

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}
