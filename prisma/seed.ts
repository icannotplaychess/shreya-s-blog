import { PrismaClient, ContentType, PostStatus } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@shankies.local";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: "Shankie" },
  });

  const categories = [
    { name: "Life", slug: "life" },
    { name: "Girlhood", slug: "girlhood" },
    { name: "Music", slug: "music" },
    { name: "Style", slug: "style" },
    { name: "School Life", slug: "school-life" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const tags = ["summer", "friends", "bollywood", "nostalgia", "diary"];
  for (const name of tags) {
    await prisma.tag.upsert({
      where: { slug: name },
      update: {},
      create: { name, slug: name },
    });
  }

  const lifeCat = await prisma.category.findUnique({ where: { slug: "life" } });
  const girlhoodCat = await prisma.category.findUnique({ where: { slug: "girlhood" } });
  const summerTag = await prisma.tag.findUnique({ where: { slug: "summer" } });

  const sampleContent = JSON.stringify({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "today was one of those perfect after-school days where everything felt like a movie montage. meenu and i shared a mango bite from the same packet (controversial? maybe. worth it? absolutely).",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "we sat on the school steps and made a list of all the SRK songs we need to download next time we go to raju uncle's cyber café. homework can wait. girlhood cannot.",
          },
        ],
      },
    ],
  });

  await prisma.post.upsert({
    where: { slug: "things-i-did-this-summer" },
    update: {},
    create: {
      title: "Things I Did This Summer",
      slug: "things-i-did-this-summer",
      excerpt: "mango bites, cyber café downloads, and the kind of afternoons you want to bottle forever",
      content: sampleContent,
      type: ContentType.BLOG,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      categories: lifeCat ? { connect: [{ id: lifeCat.id }] } : undefined,
      tags: summerTag ? { connect: [{ id: summerTag.id }] } : undefined,
      metadata: JSON.stringify({ mood: "nostalgic ☀️" }),
    },
  });

  await prisma.post.upsert({
    where: { slug: "dear-diary-august" },
    update: {},
    create: {
      title: "dear diary... august happened",
      slug: "dear-diary-august",
      excerpt: "locked. (ok not really. read at your own risk.)",
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "dear diary, today doordarshan played shaktimaan reruns and honestly? cinema. also i think i am in love with my geometry box. the camlin one. it has compartments.",
              },
            ],
          },
        ],
      }),
      type: ContentType.DIARY,
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      categories: girlhoodCat ? { connect: [{ id: girlhoodCat.id }] } : undefined,
      metadata: JSON.stringify({ mood: "dramatic 💅", handwriting: true }),
    },
  });

  await prisma.siteSetting.upsert({
    where: { key: "homepage" },
    update: {},
    create: {
      key: "homepage",
      value: JSON.stringify({
        tagline: "your favourite corner of the internet ★",
        subtitle: "a little scrapbook of girlhood ~ est. 2007",
        currentObsession: "hum tum soundtrack on repeat",
        songOfTheWeek: { title: "Tujhe Yaad Na Meri Aayi", artist: "Kumar Sanu & Alka Yagnik", note: "bollywood summer anthem" },
        mood: "dreamy ✨",
        quote: "life is not a problem to be solved, it is a mystery to be lived",
        welcomeMessage:
          "heyyy u found my website!! i like SRK movies, gel pens, radio mirchi & collecting tazos from lays packets.",
      }),
    },
  });

  console.log(`✓ Seeded admin user: ${email}`);
  console.log("✓ Seeded sample content and site settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
