import { upload } from "@vercel/blob/client";
import { resolveMimeType } from "@/lib/mime";

export interface UploadedMedia {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  filename: string;
}

/** Upload a file from the browser directly to Vercel Blob, then register it in the CMS. */
export async function uploadMediaFromBrowser(file: File): Promise<UploadedMedia> {
  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const pathname = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const mimeType = resolveMimeType(file.name, file.type);

  const blob = await upload(pathname, file, {
    access: "private",
    handleUploadUrl: "/api/media/upload",
    contentType: mimeType,
    clientPayload: JSON.stringify({ originalName: file.name, size: file.size }),
  });

  const res = await fetch("/api/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: blob.url,
      originalName: file.name,
      mimeType: blob.contentType || mimeType,
      size: file.size,
      filename: blob.pathname,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || "Could not save media to database");
  }

  return data as UploadedMedia;
}
