const DEFAULT_SQLITE_URL = "file:./prisma/dev.db";
const VERCEL_SQLITE_URL = "file:/tmp/shankies.db";

function isVercelRuntime(): boolean {
  return (
    process.env.VERCEL === "1" &&
    process.env.NEXT_PHASE !== "phase-production-build"
  );
}

export function resolveDatabaseUrl(): string {
  const configured = process.env.DATABASE_URL ?? DEFAULT_SQLITE_URL;

  if (isVercelRuntime() && configured.startsWith("file:")) {
    return VERCEL_SQLITE_URL;
  }

  return configured;
}

export function databasePathFromUrl(url: string): string {
  const raw = url.startsWith("file:") ? url.slice(5) : url;
  return raw;
}
