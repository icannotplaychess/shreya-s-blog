import { get } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  const blobUrl: string = rawUrl;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.redirect(blobUrl);
  }
  const blobToken: string = token;

  async function streamBlob(access: "private" | "public") {
    const result = await get(blobUrl, { access, token: blobToken });
    if (!result) return null;
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

    return NextResponse.redirect(blobUrl);
  } catch (error) {
    console.error("Blob serve error:", error);
    return NextResponse.redirect(blobUrl);
  }
}
