"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
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
import { resolveMediaUrl } from "@/lib/media-url";
import { CmsHomeSections } from "@/components/content/CmsHomeSections";

export function CmsHomePage() {
  const { homepage } = useSiteContent();

  return (
    <div className="relative">
      <Hero tagline={homepage.tagline} subtitle={homepage.subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-4">
        <div className="space-y-8 min-w-0">
          <section className="paper-card relative p-4 sm:p-6 -rotate-[0.4deg]">
            <span aria-hidden className="washi -top-4 right-12 rotate-[6deg]" />
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div className="flex-1 min-w-0">
                <SpeechBubble color="#fff9ae" rotate={-1} className="mb-5">
                  <p className="font-chewy text-lg sm:text-xl text-inkberry">
                    {homepage.welcomeHeading} <span className="anim-blink text-hotpink">♥</span>
                  </p>
                  <p className="font-comic text-sm text-inkberry/90 mt-1">{homepage.welcomeMessage}</p>
                </SpeechBubble>
                <div className="flex flex-wrap gap-2 items-center">
                  <Link href="/guestbook" className="glossy inline-block px-5 py-2 font-lucky text-sm text-white bg-gradient-to-b from-hotpink to-magenta">
                    {homepage.guestbookCta}
                  </Link>
                  <Link href="/about" className="glossy inline-block px-5 py-2 font-lucky text-sm text-inkberry bg-gradient-to-b from-lemon to-tangerine">
                    {homepage.aboutCta}
                  </Link>
                  <WordSticker text="cute!!" palette={5} rotate={-8} />
                </div>
              </div>
              <div className="mx-auto md:mx-0 shrink-0 flex flex-col gap-3">
                <Polaroid
                  photo={
                    homepage.polaroidImageUrl ? (
                      <img src={resolveMediaUrl(homepage.polaroidImageUrl)} alt={homepage.polaroidCaption} className="w-full h-full object-cover" />
                    ) : (
                      <DoodlePhoto kind="butterfly" />
                    )
                  }
                  caption={homepage.polaroidCaption}
                  rotate={4}
                  className="w-40"
                />
                {homepage.stickerImageUrl ? (
                  <img src={resolveMediaUrl(homepage.stickerImageUrl)} alt="" className="w-12 h-12 self-end anim-wiggle object-contain" />
                ) : (
                  <Sticker className="self-end anim-wiggle" size="text-3xl" rotate={-10}>🧿</Sticker>
                )}
              </div>
            </div>
          </section>

          <CmsHomeSections />

          <WhatsInMyBag />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-bangers outline-text text-3xl sm:text-4xl text-grape">{homepage.sectionsHeading}</h2>
              <Sticker size="text-3xl" className="anim-bounce-tiny" rotate={8}>👇</Sticker>
            </div>
            <SectionTeasers />
          </div>

          <section aria-label="random notes" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StickyNote color="#ffd1ec" rotate={-3}>
              <p className="font-marker text-sm text-inkberry">
                {homepage.songOfTheWeek?.title
                  ? `song of the week: ${homepage.songOfTheWeek.title} — ${homepage.songOfTheWeek.artist}`
                  : "song of the week: tbd"}
              </p>
            </StickyNote>
            <StickyNote color="#c9f4ff" rotate={2}>
              <p className="font-indie text-sm text-inkberry">mood: {homepage.mood || homepage.moodStickyFallback} 💅</p>
            </StickyNote>
            <StickyNote color="#fff9ae" rotate={-1}>
              <p className="font-comic text-sm text-inkberry">{homepage.quote || homepage.quoteStickyFallback}</p>
            </StickyNote>
          </section>
        </div>

        <aside className="space-y-4" aria-label="sidebar widgets">
          <MusicPlayer />
          <StatusMood mood={homepage.mood} />
          <VisitorCounter />
          <DigitalClock />
          <QuoteOfTheDay quote={homepage.quote} />
          <PixelPet />
          <BestFriends />
          <ObsessionWishlist obsession={homepage.currentObsession} />
          <WeatherWidget />
          <CalendarWidget />
          <BlinkieWall />
        </aside>
      </div>
    </div>
  );
}
