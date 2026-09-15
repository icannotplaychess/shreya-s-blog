import "dotenv/config";
import { defineConfig } from "prisma/config";

function cliDatabaseUrl(): string {
  const configured = process.env.DATABASE_URL?.trim() || process.env.TURSO_DATABASE_URL?.trim();

  if (configured?.startsWith("file:")) {
    return configured;
  }

  // Prisma CLI commands (generate, migrate) need a local SQLite URL.
  // Remote Turso migrations are handled by scripts/migrate-remote.mjs.
  return process.env.LOCAL_DATABASE_URL?.trim() || "file:./prisma/dev.db";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: cliDatabaseUrl(),
  },
});
