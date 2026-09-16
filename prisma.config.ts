import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma CLI commands only support local SQLite URLs.
// Turso migrations run separately via scripts/migrate-remote.mjs.
const CLI_DATABASE_URL = process.env.LOCAL_DATABASE_URL?.trim() || "file:./prisma/dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: CLI_DATABASE_URL,
  },
});
