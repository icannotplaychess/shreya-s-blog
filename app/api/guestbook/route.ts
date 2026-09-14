import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { guestbookSchema } from "@/lib/validations";

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = guestbookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entry = await prisma.guestbookEntry.create({
    data: { ...parsed.data, approved: true },
  });

  return NextResponse.json(entry, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.guestbookEntry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
