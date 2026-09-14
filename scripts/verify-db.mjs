/**
 * Confirms Prisma migrations created the expected tables before `next build`.
 */
import "dotenv/config";
import Database from "better-sqlite3";
import path from "path";

const dbUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const resolvedPath = path.resolve(process.cwd(), dbPath);

const requiredTables = ["User", "Post", "Media", "SiteSetting"];

let db;
try {
  db = new Database(resolvedPath, { readonly: true });
} catch (error) {
  console.error(`✗ Database file not found at ${resolvedPath}`);
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const rows = db
  .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")
  .all();
const existing = new Set(rows.map((row) => row.name));
db.close();

const missing = requiredTables.filter((table) => !existing.has(table));
if (missing.length > 0) {
  console.error(`✗ Missing database tables after migrate deploy: ${missing.join(", ")}`);
  console.error(`  Database path: ${resolvedPath}`);
  console.error(`  Found tables: ${[...existing].sort().join(", ") || "(none)"}`);
  process.exit(1);
}

console.log(`✓ Database ready (${resolvedPath})`);
