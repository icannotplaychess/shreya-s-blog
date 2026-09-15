import { del, put } from "@vercel/blob";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export function getStorageMode(): "vercel-blob" | "local-files" {
  return process.env.BLOB_READ_WRITE_TOKEN ? "vercel-blob" : "local-files";
}

export async function saveUploadedFile(file: File, filename: string): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    const blob = await put(`uploads/${filename}`, file, {
      access: "public",
      token,
    });
    return blob.url;
  }

  if (process.env.VERCEL === "1") {
    throw new Error(
      "File uploads require Vercel Blob. Create a Blob store in Vercel → Storage and redeploy."
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
