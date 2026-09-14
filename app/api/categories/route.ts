import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-auth";
import { categorySchema } from "@/lib/validations";
import { slugify } from "@/lib/slug";

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;

  const body = await req.json();
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const slug = parsed.data.slug || slugify(parsed.data.name);
  const category = await prisma.category.create({
    data: { ...parsed.data, slug },
  });

  return NextResponse.json(category, { status: 201 });
}
