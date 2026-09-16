#!/usr/bin/env bash
set -euo pipefail

LOCAL_DB_URL="file:./prisma/dev.db"

# Keep Turso credentials available for remote migration/admin scripts.
if [[ -n "${DATABASE_URL:-}" ]] && [[ "${DATABASE_URL}" != file:* ]]; then
  export TURSO_DATABASE_URL="${TURSO_DATABASE_URL:-$DATABASE_URL}"
fi
if [[ -n "${DATABASE_AUTH_TOKEN:-}" ]]; then
  export TURSO_AUTH_TOKEN="${TURSO_AUTH_TOKEN:-$DATABASE_AUTH_TOKEN}"
fi

# Prisma CLI only supports file: URLs. Never pass libsql/https URLs to it.
export DATABASE_URL="$LOCAL_DB_URL"
export LOCAL_DATABASE_URL="$LOCAL_DB_URL"

npx prisma generate
node scripts/migrate-remote.mjs
npx prisma migrate deploy
node scripts/verify-db.mjs
npx tsx scripts/ensure-admin.ts
npx next build
