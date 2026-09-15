import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
    "@libsql/client",
    "@prisma/adapter-libsql",
  ],
  outputFileTracingIncludes: {
    "/api/**/*": ["./prisma/migrations/**/*.sql"],
    "/**": ["./prisma/migrations/**/*.sql"],
  },
};

export default nextConfig;
