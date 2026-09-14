import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { tagSchema } from "@/lib/validations";
import { slugify } from "@/lib/slug";

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const body = await req.json();
  const parsed = tagSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = parsed.data.slug || slugify(parsed.data.name);
  const tag = await prisma.tag.create({
    data: { ...parsed.data, slug },
  });

  return NextResponse.json(tag, { status: 201 });
}
