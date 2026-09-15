import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { deleteStoredFile } from "@/lib/storage";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const inUse = await prisma.post.count({
    where: { OR: [{ coverImageId: id }, { mediaItems: { some: { mediaId: id } } }] },
  });
  if (inUse > 0) {
    return NextResponse.json({ error: "Media is in use by posts" }, { status: 400 });
  }

  try {
    await deleteStoredFile(media.url);
  } catch {
    // file may already be gone
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
