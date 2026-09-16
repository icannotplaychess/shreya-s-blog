import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function getStorageMode(): "vercel-blob" | "local-files" {
  return process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-files";
}

function blobAccess(): "public" | "private" {
  const configured = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (configured === "public" || configured === "private") return configured;
  return "private";
}

export async function saveUploadedFile(
  file: File,
  filename: string,
  contentType?: string
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const access = blobAccess();
    try {
      const blob = await put(`uploads/${filename}`, file, {
        access,
        token,
        contentType: contentType || file.type || undefined,
        addRandomSuffix: false,
      });
      return blob.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (access === "private" && message.includes("private")) {
        throw new Error(`Blob upload failed: ${message}. Your store is private — do not set BLOB_ACCESS=public.`);
      }
      if (access === "public" && message.includes("private store")) {
        const blob = await put(`uploads/${filename}`, file, {
          access: "private",
          token,
          contentType: contentType || file.type || undefined,
          addRandomSuffix: false,
        });
        return blob.url;
      }
      throw error;
    }
  }

  if (process.env.VERCEL === "1") {
    throw new Error(
      "File uploads require Vercel Blob. Link a Blob store in Vercel → Storage → Connect to Project, then redeploy."
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
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      await del(url, { token });
    }
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
