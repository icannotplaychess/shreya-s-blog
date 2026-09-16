/** Turn stored media URLs into browser-safe URLs (private Blob needs a proxy). */
export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";

  if (url.startsWith("/api/media/serve")) return url;
  if (url.startsWith("/uploads/")) return url;

  if (url.includes("blob.vercel-storage.com") || url.startsWith("https://")) {
    return `/api/media/serve?url=${encodeURIComponent(url)}`;
  }

  return url;
}
