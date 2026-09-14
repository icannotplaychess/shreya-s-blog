/**
 * Creates or updates the admin user from env vars.
 * Runs during Vercel build so production has someone to sign in with.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.warn("⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin user creation");
  process.exit(0);
}

const adminEmail = email;
const adminPassword = password;

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash, name: "Shankie" },
  });
  console.log(`✓ Admin user ready: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
