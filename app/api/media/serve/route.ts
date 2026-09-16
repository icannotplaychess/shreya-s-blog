import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  const blobUrl: string = rawUrl;

  async function streamBlob(access: "private" | "public") {
    const result = await get(blobUrl, { access });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const headers = new Headers();
    headers.set("Content-Type", result.blob.contentType || "application/octet-stream");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new NextResponse(result.stream, { headers });
  }

  try {
    const privateResponse = await streamBlob("private");
    if (privateResponse) return privateResponse;

    const publicResponse = await streamBlob("public");
    if (publicResponse) return publicResponse;

    return NextResponse.json({ error: "File not found" }, { status: 404 });
  } catch (error) {
    console.error("Blob serve error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
