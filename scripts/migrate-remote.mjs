/**
 * Applies Prisma SQL migrations to Turso/libSQL during Vercel builds.
 * Prisma CLI cannot run `migrate deploy` against libsql:// URLs directly.
 */
import "dotenv/config";
import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const url = process.env.TURSO_DATABASE_URL?.trim() || process.env.DATABASE_URL?.trim();
const authToken = process.env.TURSO_AUTH_TOKEN?.trim() || process.env.DATABASE_AUTH_TOKEN?.trim();

function isRemoteDatabase(value) {
  return Boolean(value && (value.startsWith("libsql:") || value.startsWith("https://") || value.startsWith("http://")));
}

if (!isRemoteDatabase(url)) {
  console.log("✓ No remote database configured — skipping Turso migrations");
  process.exit(0);
}

if (!authToken) {
  console.error("✗ DATABASE_AUTH_TOKEN (or TURSO_AUTH_TOKEN) is required for Turso migrations");
  process.exit(1);
}

const client = createClient({ url, authToken });

await client.execute(`
  CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "checksum" TEXT NOT NULL,
    "finished_at" DATETIME,
    "migration_name" TEXT NOT NULL,
    "logs" TEXT,
    "rolled_back_at" DATETIME,
    "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
  )
`);

const migrationsDir = path.join(process.cwd(), "prisma/migrations");
const migrationFolders = fs
  .readdirSync(migrationsDir)
  .filter((entry) => fs.statSync(path.join(migrationsDir, entry)).isDirectory())
  .sort();

for (const folder of migrationFolders) {
  const sqlPath = path.join(migrationsDir, folder, "migration.sql");
  if (!fs.existsSync(sqlPath)) continue;

  const existing = await client.execute({
    sql: 'SELECT "id" FROM "_prisma_migrations" WHERE "migration_name" = ? LIMIT 1',
    args: [folder],
  });

  if (existing.rows.length > 0) {
    console.log(`✓ Migration already applied: ${folder}`);
    continue;
  }

  const sql = fs.readFileSync(sqlPath, "utf8");
  await client.executeMultiple(sql);

  await client.execute({
    sql: `
      INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name", "started_at", "applied_steps_count")
      VALUES (?, ?, ?, datetime('now'), 1)
    `,
    args: [randomUUID(), folder, folder],
  });

  console.log(`✓ Applied migration to Turso: ${folder}`);
}

console.log("✓ Turso migrations complete");
