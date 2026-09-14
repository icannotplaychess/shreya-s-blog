export type ContentTypeValue =
  | "BLOG"
  | "DIARY"
  | "PHOTO_DUMP"
  | "PLAYLIST"
  | "LIST"
  | "QUIZ"
  | "MOODBOARD"
  | "COLLECTION";

export interface MediaItem {
  id: string;
  url: string;
  alt: string | null;
  mimeType: string;
  originalName: string;
}

export interface PostWithRelations {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  type: ContentTypeValue;
  status: string;
  metadata: string;
  publishedAt: string | null;
  coverImage: MediaItem | null;
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  mediaItems: { media: MediaItem; caption: string | null }[];
}
