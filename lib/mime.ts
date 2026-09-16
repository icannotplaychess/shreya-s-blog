import path from "path";

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp3": "audio/mpeg",
  ".mpeg": "audio/mpeg",
  ".mp4": "video/mp4",
  ".m4a": "audio/mp4",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".aac": "audio/aac",
  ".webm": "audio/webm",
  ".pdf": "application/pdf",
};

export function resolveMimeType(filename: string, reported?: string | null): string {
  const trimmed = reported?.trim();
  if (trimmed && trimmed !== "application/octet-stream") return trimmed;
  const ext = path.extname(filename).toLowerCase();
  return EXT_TO_MIME[ext] ?? trimmed ?? "application/octet-stream";
}

export function isAllowedUploadMime(mime: string): boolean {
  return (
    mime.startsWith("image/") ||
    mime.startsWith("video/") ||
    mime.startsWith("audio/") ||
    mime === "application/pdf"
  );
}
