import { NextResponse } from "next/server";
import { getDatabaseMode } from "@/lib/database-url";
import { getStorageMode } from "@/lib/storage";

export async function GET() {
  const databaseMode = getDatabaseMode();
  const storageMode = getStorageMode();

  const checks = {
    authSecret: Boolean(process.env.AUTH_SECRET?.trim()),
    adminEmail: Boolean(process.env.ADMIN_EMAIL?.trim()),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD),
    databaseUrl: Boolean(process.env.DATABASE_URL?.trim() || process.env.TURSO_DATABASE_URL?.trim()),
    databaseAuthToken: Boolean(process.env.DATABASE_AUTH_TOKEN?.trim() || process.env.TURSO_AUTH_TOKEN?.trim()),
    blobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()),
    nextAuthUrl: Boolean(process.env.NEXTAUTH_URL?.trim() || process.env.AUTH_URL?.trim()),
  };

  const onVercel = process.env.VERCEL === "1";
  const hasPersistentDatabase = databaseMode === "turso";
  const hasPersistentStorage = storageMode === "vercel-blob";
  const authReady = checks.authSecret && checks.adminEmail && checks.adminPassword;

  const ok = authReady && (!onVercel || (hasPersistentDatabase && hasPersistentStorage));

  return NextResponse.json({
    ok,
    checks,
    databaseMode,
    storageMode,
    message: ok
      ? "Production CMS storage is configured."
      : onVercel
        ? "On Vercel you need Turso for posts and Vercel Blob for media uploads. See README."
        : "Missing required environment variables. Set them in Vercel, then redeploy.",
  });
}
