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
