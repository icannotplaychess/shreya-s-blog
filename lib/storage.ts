import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function getStorageMode(): "vercel-blob" | "local-files" {
  return process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID
    ? "vercel-blob"
    : "local-files";
}

export async function saveUploadedFile(
  file: File,
  filename: string,
  contentType?: string
): Promise<string> {
  const onVercel = process.env.VERCEL === "1";
  const hasBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

  if (hasBlob) {
    const body = Buffer.from(await file.arrayBuffer());
    const blob = await put(`uploads/${filename}`, body, {
      access: "private",
      contentType: contentType || file.type || undefined,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  if (onVercel) {
    throw new Error(
      "File uploads require Vercel Blob. In Vercel → Storage, connect a Blob store to this project, then redeploy."
    );
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

export async function deleteStoredFile(url: string) {
  if (url.includes("blob.vercel-storage.com")) {
    await del(url);
    return;
  }

  if (url.startsWith("/uploads/")) {
    const filepath = path.join(process.cwd(), "public", url);
    try {
      await unlink(filepath);
    } catch {
      // file may already be gone
    }
  }
}
