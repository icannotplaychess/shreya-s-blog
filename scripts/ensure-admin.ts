import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("⚠ ADMIN_EMAIL or ADMIN_PASSWORD not set — skipping admin user creation");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: {
      email,
      passwordHash,
      name: "Shankie",
    },
    update: {
      passwordHash,
    },
  });

  console.log(`✓ Admin user ready: ${email}`);
}

main()
  .catch((error) => {
    console.error("Failed to ensure admin user:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
