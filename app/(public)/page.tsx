export const dynamic = "force-dynamic";

import Link from "next/link";
import { ContentType } from "@/generated/prisma/client";
import { getPublishedPosts, getLatestByType, getSiteSetting } from "@/lib/posts";
import { Hero } from "@/components/home/Hero";
import { WhatsInMyBag } from "@/components/home/WhatsInMyBag";
import { SectionTeasers } from "@/components/home/SectionTeasers";
import { MusicPlayer } from "@/components/widgets/MusicPlayer";
import {
  DigitalClock,
  VisitorCounter,
  StatusMood,
  QuoteOfTheDay,
  PixelPet,
  WeatherWidget,
  CalendarWidget,
  BlinkieWall,
  BestFriends,
  ObsessionWishlist,
} from "@/components/widgets/SidebarWidgets";
import { SpeechBubble, StickyNote } from "@/components/ui/SpeechBubble";
import { Sticker, WordSticker } from "@/components/ui/Sticker";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto } from "@/components/ui/DoodlePhoto";
import { PostCard } from "@/components/content/PostRenderer";
import { CutoutHeading } from "@/components/ui/CutoutHeading";

interface HomepageSettings {
  tagline?: string;
  subtitle?: string;
  currentObsession?: string;
  songOfTheWeek?: { title: string; artist: string; note: string };
  mood?: string;
  quote?: string;
  welcomeMessage?: string;
}

export default async function Home() {
  const [latestPosts, latestDiary, latestPhotoDump, settings] = await Promise.all([
    getPublishedPosts({ limit: 4 }),
    getLatestByType(ContentType.DIARY),
    getLatestByType(ContentType.PHOTO_DUMP),
    getSiteSetting<HomepageSettings>("homepage", {}),
  ]);

  const welcome =
    settings.welcomeMessage ||
    "heyyy u found my website!! i like SRK movies, gel pens, radio mirchi & collecting tazos from lays packets.";

  return (
    <div className="relative">
      <Hero tagline={settings.tagline} subtitle={settings.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-4">
        <div className="space-y-8 min-w-0">
          <section className="paper-card relative p-4 sm:p-6 -rotate-[0.4deg]">
            <span aria-hidden className="washi -top-4 right-12 rotate-[6deg]" />
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1 min-w-0">
                <SpeechBubble color="#fff9ae" rotate={-1} className="mb-5">
                  <p className="font-chewy text-lg sm:text-xl text-inkberry">
                    heyyy u found my website!! <span className="anim-blink text-hotpink">♥</span>
                  </p>
                  <p className="font-comic text-sm text-inkberry/90 mt-1">{welcome}</p>
                </SpeechBubble>
                <div className="flex flex-wrap gap-2 items-center">
                  <Link
                    href="/guestbook"
                    className="glossy inline-block px-5 py-2 font-lucky text-sm text-white bg-gradient-to-b from-hotpink to-magenta"
                  >
                    ✍️ sign my guestbook!!
                  </Link>
                  <Link
                    href="/about"
                    className="glossy inline-block px-5 py-2 font-lucky text-sm text-inkberry bg-gradient-to-b from-lemon to-tangerine"
                  >
                    💖 about me
                  </Link>
                  <WordSticker text="cute!!" palette={5} rotate={-8} />
                </div>
              </div>
              <div className="mx-auto md:mx-0 shrink-0 flex flex-col gap-3">
                <Polaroid
                  photo={<DoodlePhoto kind="butterfly" />}
                  caption="me (artist's impression)"
                  rotate={4}
                  className="w-40"
                />
                <Sticker className="self-end anim-wiggle" size="text-3xl" rotate={-10}>🧿</Sticker>
              </div>
            </div>
          </section>

          {/* LATEST FROM SHANKIE'S — dynamic */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CutoutHeading text="latest from shankie's" className="text-3xl sm:text-4xl text-grape" />
              <Sticker size="text-3xl" className="anim-bounce-tiny" rotate={8}>★</Sticker>
            </div>
            {latestPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestPosts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            ) : (
              <SpeechBubble color="#ffd1ec">
                <p className="font-comic text-sm">no posts yet... coming soon!!</p>
              </SpeechBubble>
            )}
            <Link href="/blog" className="inline-block mt-4 font-lucky text-sm text-hotpink hover:underline">
              see all posts →
            </Link>
          </section>

          {/* Latest diary + photo dump */}
          {(latestDiary || latestPhotoDump) && (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {latestDiary && (
                <div>
                  <h3 className="font-bangers text-2xl text-hotpink outline-text mb-3">dear diary...</h3>
                  <PostCard post={latestDiary} />
                </div>
              )}
              {latestPhotoDump && (
                <div>
                  <h3 className="font-bangers text-2xl text-cyanpop outline-text mb-3">photo dump</h3>
                  <PostCard post={latestPhotoDump} />
                </div>
              )}
            </section>
          )}

          {settings.currentObsession && (
            <section className="paper-card p-4 -rotate-1">
              <h3 className="font-bangers text-xl text-magenta mb-2">currently obsessed with</h3>
              <p className="font-chewy text-lg text-inkberry">{settings.currentObsession}</p>
            </section>
          )}

          <WhatsInMyBag />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-bangers outline-text text-3xl sm:text-4xl text-grape">
                pick a page, any page!
              </h2>
              <Sticker size="text-3xl" className="anim-bounce-tiny" rotate={8}>👇</Sticker>
            </div>
            <SectionTeasers />
          </div>

          <section aria-label="random notes" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StickyNote color="#ffd1ec" rotate={-3}>
              <p className="font-marker text-sm text-inkberry">
                {settings.songOfTheWeek?.title
                  ? `song of the week: ${settings.songOfTheWeek.title} — ${settings.songOfTheWeek.artist}`
                  : "song of the week: tbd"}
              </p>
            </StickyNote>
            <StickyNote color="#c9f4ff" rotate={2}>
              <p className="font-indie text-sm text-inkberry">
                mood: {settings.mood || "unknown"} 💅
              </p>
            </StickyNote>
            <StickyNote color="#fff9ae" rotate={-1}>
              <p className="font-comic text-sm text-inkberry">
                {settings.quote || "life is a mystery to be lived, not a problem to be solved"}
              </p>
            </StickyNote>
          </section>
        </div>

        <aside className="space-y-4" aria-label="sidebar widgets">
          <MusicPlayer />
          <StatusMood mood={settings.mood} />
          <VisitorCounter />
          <DigitalClock />
          <QuoteOfTheDay quote={settings.quote} />
          <PixelPet />
          <BestFriends />
          <ObsessionWishlist obsession={settings.currentObsession} />
          <WeatherWidget />
          <CalendarWidget />
          <BlinkieWall />
        </aside>
      </div>
    </div>
  );
}
