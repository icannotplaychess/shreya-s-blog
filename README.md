# SHANKIE'S ★

> your favourite corner of the internet ~ a digital scrapbook of girlhood

A personal digital magazine, blog, scrapbook, diary and archive — built like a teenage girl's handmade website from 2007, with a real CMS underneath.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — Y2K palette, layered scrapbook backgrounds
- **Framer Motion** — wiggles, pops, twinkles
- **Prisma** + **SQLite** — persistent content storage
- **NextAuth.js** — protected admin area
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

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Set **Production branch** to `main`
3. Add these **Environment Variables** in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `file:./prisma/dev.db` |
| `AUTH_SECRET` | output of `openssl rand -base64 32` |
| `NEXTAUTH_URL` | your Vercel URL, e.g. `https://shreya-s-blog-dnw7.vercel.app` |
| `ADMIN_EMAIL` | your admin login email |
| `ADMIN_PASSWORD` | your admin login password |

4. **Redeploy with build cache cleared** (Vercel → Deployments → ⋯ → Redeploy → uncheck “Use existing Build Cache”).
5. Sign in at `/admin` using the exact `ADMIN_EMAIL` and `ADMIN_PASSWORD` values from step 3.
6. If login still fails, open `/api/health` on your site — it will show which env vars are missing.

> **Note:** On Vercel, SQLite runs from `/tmp` at runtime so login and the CMS can work without an external database. Content may still reset across cold starts or redeploys. For a permanent production site, switch to Postgres (Neon/Supabase) later.

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
