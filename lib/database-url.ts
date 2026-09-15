const DEFAULT_SQLITE_URL = "file:./prisma/dev.db";
const VERCEL_SQLITE_URL = "file:/tmp/shankies.db";

function isVercelRuntime(): boolean {
  return (
    process.env.VERCEL === "1" &&
    process.env.NEXT_PHASE !== "phase-production-build"
  );
}

export function getConfiguredDatabaseUrl(): string {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.TURSO_DATABASE_URL?.trim() ||
    DEFAULT_SQLITE_URL
  );
}

export function isLibsqlDatabase(url: string): boolean {
  return url.startsWith("libsql:") || url.startsWith("https://") || url.startsWith("http://");
}

export function isFileDatabase(url: string): boolean {
  return url.startsWith("file:");
}

export function resolveDatabaseUrl(): string {
  const configured = getConfiguredDatabaseUrl();

  if (isLibsqlDatabase(configured)) {
    return configured;
  }

  if (isVercelRuntime() && isFileDatabase(configured)) {
    return VERCEL_SQLITE_URL;
  }

  return configured;
}

export function databasePathFromUrl(url: string): string {
  const raw = url.startsWith("file:") ? url.slice(5) : url;
  return raw;
}

export function getDatabaseMode(): "turso" | "local-sqlite" | "ephemeral-sqlite" {
  const configured = getConfiguredDatabaseUrl();
  if (isLibsqlDatabase(configured)) return "turso";
  if (isVercelRuntime() && isFileDatabase(configured)) return "ephemeral-sqlite";
  return "local-sqlite";
}
