import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const result: Record<string, unknown> = {};
  for (const s of settings) {
    try {
      result[s.key] = JSON.parse(s.value);
    } catch {
      result[s.key] = s.value;
    }
  }
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const body = await req.json();
  const { key, value } = body as { key: string; value: unknown };
  if (!key) return NextResponse.json({ error: "Key required" }, { status: 400 });

  const setting = await prisma.siteSetting.upsert({
    where: { key },
    create: { key, value: JSON.stringify(value) },
    update: { value: JSON.stringify(value) },
  });

  return NextResponse.json(setting);
}
