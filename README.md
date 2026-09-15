# SHANKIE'S ★

> your favourite corner of the internet ~ a digital scrapbook of girlhood

A personal digital magazine, blog, scrapbook, diary and archive — built like a teenage girl's handmade website from 2007, with a real CMS underneath.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — Y2K palette, layered scrapbook backgrounds
- **Framer Motion** — wiggles, pops, twinkles
- **Prisma** + **SQLite / Turso** — content storage
- **JWT auth** — protected admin area
- **Vercel Blob** — media uploads in production
- **TipTap** — rich text editor for the admin

## Run locally

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed    # optional demo content + admin user
npm run dev        # http://localhost:3000
```

Default admin login (after seed): `admin@shankies.local` / `changeme`

## Deploy on Vercel

Login works with env vars alone, but **posts and media uploads need persistent storage** on Vercel. Set up Turso + Vercel Blob once:

### 1. Create a Turso database (stores posts)

1. Sign up at [turso.tech](https://turso.tech) (free tier is fine)
2. Create a database named `shankies`
3. Open the database → **Connect** → copy:
   - `DATABASE_URL` (must start with `libsql://` — not `https://`)
   - `DATABASE_AUTH_TOKEN`

### 2. Create Vercel Blob storage (stores uploaded images)

1. In Vercel → your project → **Storage** → **Create Database** → **Blob**
2. Connect it to your project — Vercel adds `BLOB_READ_WRITE_TOKEN` automatically

### 3. Add environment variables

In Vercel → Project → **Settings** → **Environment Variables**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | your Turso `libsql://...` URL |
| `DATABASE_AUTH_TOKEN` | your Turso auth token |
| `BLOB_READ_WRITE_TOKEN` | added automatically when Blob is connected |
| `AUTH_SECRET` | any long random secret |
| `NEXTAUTH_URL` | your site URL, e.g. `https://shreya-s-blog-dnw7.vercel.app` |
| `ADMIN_EMAIL` | your admin login email |
| `ADMIN_PASSWORD` | your admin login password |

### 4. Deploy

Redeploy with **build cache cleared** (Deployments → ⋯ → Redeploy → uncheck “Use existing Build Cache”).

### 5. Verify

1. Open `/api/health` — `ok` should be `true`, `databaseMode` should be `turso`, `storageMode` should be `vercel-blob`
2. Sign in at `/admin`
3. Upload media and publish a post

> **Why?** Vercel serverless functions cannot share a local SQLite file or write to `public/uploads/`. Turso and Blob give the CMS real persistent storage.

## Public site

| Route | Section |
| --- | --- |
| `/` | Dynamic homepage — latest posts, diary, photo dump, widgets |
| `/blog` | Blog posts & essays |
| `/diary` | Personal journal entries |
| `/photo-dump` | Scrapbook photo galleries |
| `/playlists` | MySpace-style music sections |
| `/quizzes` | Magazine-style quizzes |
| `/style` | Moodboards & fashion |
| `/girlhood` | Life lately, bucket lists |
| `/collections` | Curated collections |
| `/guestbook` | Visitor guestbook |
| `/about` | About me |

## Admin (`/admin`)

- Dashboard, posts, drafts, media library, categories, tags, site settings
- Create/edit/publish all content types without touching source code

## Docs

- `ADMIN` — CMS & admin requirements
- `BLOGREQUIREMENTS` — design & feature specifications
- `docs/references/` — visual reference images (source of truth for aesthetics)
