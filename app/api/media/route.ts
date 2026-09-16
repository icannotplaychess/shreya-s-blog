import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { isAllowedUploadMime, resolveMimeType } from "@/lib/mime";
import { saveUploadedFile } from "@/lib/storage";

export const runtime = "nodejs";

const MAX_SIZE = 25 * 1024 * 1024;

export async function GET(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const q = req.nextUrl.searchParams.get("q");
  const type = req.nextUrl.searchParams.get("type");

  const media = await prisma.media.findMany({
    where: {
      ...(q ? { originalName: { contains: q } } : {}),
      ...(type === "image" ? { mimeType: { startsWith: "image/" } } : {}),
      ...(type === "video" ? { mimeType: { startsWith: "video/" } } : {}),
      ...(type === "audio" ? { mimeType: { startsWith: "audio/" } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(media);
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string) || undefined;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mimeType = resolveMimeType(file.name, file.type);
    if (!isAllowedUploadMime(mimeType)) {
      return NextResponse.json(
        { error: `File type not allowed (${mimeType || "unknown"}). Use images, audio, video, or PDF.` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 25MB)" }, { status: 400 });
    }

    const ext = path.extname(file.name) || "";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const url = await saveUploadedFile(file, filename, mimeType);

    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType,
        size: file.size,
        url,
        alt,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
