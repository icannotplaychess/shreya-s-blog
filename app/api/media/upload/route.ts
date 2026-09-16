import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth-session";
import { isAllowedUploadMime, resolveMimeType } from "@/lib/mime";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/aac",
  "audio/webm",
  "application/pdf",
];

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  if (body.type === "blob.generate-client-token") {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let originalName = "";
        if (clientPayload) {
          try {
            const parsed = JSON.parse(clientPayload) as { originalName?: string };
            originalName = parsed.originalName || "";
          } catch {
            // ignore malformed payload
          }
        }

        const mimeType = originalName ? resolveMimeType(originalName) : undefined;
        if (mimeType && !isAllowedUploadMime(mimeType)) {
          throw new Error(`File type not allowed (${mimeType})`);
        }

        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 25 * 1024 * 1024,
          addRandomSuffix: false,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Blob client upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 }
    );
  }
}
