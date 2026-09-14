/**
 * Creates or updates the admin user using raw SQLite (no tsx/Prisma client needed on Vercel).
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import Database from "better-sqlite3";
import { randomBytes } from "crypto";
import path from "path";

const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.warn("⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin user creation");
  process.exit(0);
}

const dbUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
const resolvedPath = path.resolve(process.cwd(), dbPath);

let db;
try {
  db = new Database(resolvedPath);
} catch (error) {
  console.warn("⚠ Could not open database — skipping admin user creation");
  console.warn(error instanceof Error ? error.message : error);
  process.exit(0);
}

const userTable = db
  .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'User'")
  .get();

if (!userTable) {
  console.warn("⚠ User table not found — skipping admin user creation");
  db.close();
  process.exit(0);
}

const passwordHash = await bcrypt.hash(password, 12);
const now = new Date().toISOString();

const existing = db.prepare("SELECT id FROM User WHERE email = ?").get(email);

if (existing) {
  db.prepare("UPDATE User SET passwordHash = ?, updatedAt = ? WHERE email = ?").run(
    passwordHash,
    now,
    email
  );
} else {
  const id = randomBytes(12).toString("hex");
  db.prepare(
    "INSERT INTO User (id, email, passwordHash, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, email, passwordHash, "Shankie", now, now);
}

db.close();
console.log(`✓ Admin user ready: ${email}`);
