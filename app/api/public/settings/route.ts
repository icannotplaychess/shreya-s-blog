import { NextResponse } from "next/server";
import { getSiteSetting } from "@/lib/posts";

export async function GET() {
  const homepage = await getSiteSetting("homepage", {});
  return NextResponse.json({ homepage });
}
