import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { databasePathFromUrl, resolveDatabaseUrl } from "./database-url";

const globalForBootstrap = globalThis as { shankiesDbBootstrapped?: boolean };

function migrationSqlPath(): string {
  const candidates = [
    path.join(process.cwd(), "prisma/migrations/20260914085158_init/migration.sql"),
    path.join(process.cwd(), ".next/server/prisma/migrations/20260914085158_init/migration.sql"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error("Could not find Prisma migration SQL for runtime database bootstrap.");
}

function ensureAdminUser(db: Database.Database) {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const passwordHash = bcrypt.hashSync(password, 12);
  const now = new Date().toISOString();
  const existing = db.prepare("SELECT id FROM User WHERE email = ?").get(email) as { id: string } | undefined;

  if (existing) {
    db.prepare("UPDATE User SET passwordHash = ?, updatedAt = ? WHERE email = ?").run(passwordHash, now, email);
    return;
  }

  const id = randomBytes(12).toString("hex");
  db.prepare(
    "INSERT INTO User (id, email, passwordHash, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, email, passwordHash, "Shankie", now, now);
}

export function ensureRuntimeDatabase(): string {
  const url = resolveDatabaseUrl();
  if (!url.startsWith("file:")) return url;
  if (globalForBootstrap.shankiesDbBootstrapped) return url;

  const dbPath = databasePathFromUrl(url);
  const resolvedPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);

  const db = new Database(resolvedPath);
  const userTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'User'")
    .get();

  if (!userTable) {
    const sql = fs.readFileSync(migrationSqlPath(), "utf8");
    db.exec(sql);
  }

  ensureAdminUser(db);
  db.close();

  globalForBootstrap.shankiesDbBootstrapped = true;
  return url;
}
