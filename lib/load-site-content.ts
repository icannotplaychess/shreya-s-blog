import { getSiteSetting } from "./posts";
import { DEFAULT_SITE_CONTENT, mergeSiteContent, type SiteContent } from "./site-content";

const CONTENT_KEYS = [
  "homepage",
  "sidebar",
  "chrome",
  "bag",
  "teasers",
  "pages",
  "musicPlayer",
  "cdMixes",
  "about",
  "girlhood",
  "collections",
  "quizzes",
  "style",
  "guestbook",
  "songOfTheWeek",
] as const;

export async function loadSiteContent(): Promise<SiteContent> {
  const entries = await Promise.all(
    CONTENT_KEYS.map(async (key) => {
      const fallback = DEFAULT_SITE_CONTENT[key as keyof SiteContent];
      const value = await getSiteSetting(key, fallback);
      return [key, value] as const;
    })
  );

  const saved: Partial<SiteContent> = {};
  for (const [key, value] of entries) {
    (saved as Record<string, unknown>)[key] = value;
  }

  return mergeSiteContent(saved);
}
