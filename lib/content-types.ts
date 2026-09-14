export const CONTENT_TYPES = [
  "BLOG",
  "DIARY",
  "PHOTO_DUMP",
  "PLAYLIST",
  "LIST",
  "QUIZ",
  "MOODBOARD",
  "COLLECTION",
] as const;

export type ContentTypeValue = (typeof CONTENT_TYPES)[number];

export const POST_STATUSES = ["DRAFT", "PUBLISHED"] as const;
export type PostStatusValue = (typeof POST_STATUSES)[number];
