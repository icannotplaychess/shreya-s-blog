import { NextResponse } from "next/server";

export async function GET() {
  const checks = {
    authSecret: Boolean(process.env.AUTH_SECRET?.trim()),
    adminEmail: Boolean(process.env.ADMIN_EMAIL?.trim()),
    adminPassword: Boolean(process.env.ADMIN_PASSWORD),
    databaseUrl: Boolean(process.env.DATABASE_URL?.trim()),
    nextAuthUrl: Boolean(process.env.NEXTAUTH_URL?.trim() || process.env.AUTH_URL?.trim()),
  };

  const ok = checks.authSecret && checks.adminEmail && checks.adminPassword && checks.databaseUrl;

  return NextResponse.json({
    ok,
    checks,
    message: ok
      ? "Required environment variables are present."
      : "Missing required environment variables. Set them in Vercel, then redeploy.",
  });
}
