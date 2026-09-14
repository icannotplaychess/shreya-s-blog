import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "application/pdf",
];

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

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const alt = (formData.get("alt") as string) || undefined;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 25MB)" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const ext = path.extname(file.name) || "";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  const media = await prisma.media.create({
    data: {
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      url: `/uploads/${filename}`,
      alt,
    },
  });

  return NextResponse.json(media, { status: 201 });
}
