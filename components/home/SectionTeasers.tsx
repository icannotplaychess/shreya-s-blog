"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const TEASERS = [
  {
    href: "/diary",
    title: "dear diary...",
    blurb: "scanned pages from my top-secret notebook. washi tape included.",
    emoji: "📔",
    bg: "from-babypink to-bubblegum",
    rotate: -2,
    tag: "juicy!!",
  },
  {
    href: "/photo-dump",
    title: "photo dump",
    blurb: "polaroids, film strips & my messy collage wall. click 4 lightbox!",
    emoji: "📸",
    bg: "from-cyanpop/60 to-turq/60",
    rotate: 1.5,
    tag: "so cute",
  },
  {
    href: "/playlists",
    title: "playlists + winamp",
    blurb: "bollywood x avril x backstreet boys. burned CDs 4 lyf.",
    emoji: "🎧",
    bg: "from-lilac to-grape/50",
    rotate: -1,
    tag: "♫♫♫",
  },
  {
    href: "/quizzes",
    title: "quizzes: this or that",
    blurb: "what's ur vibe? poppins or phantom? take the quiz RIGHT NOW.",
    emoji: "❓",
    bg: "from-lemon to-tangerine/60",
    rotate: 2,
    tag: "OMG",
  },
  {
    href: "/style",
    title: "style files",
    blurb: "moodboards, magazine clippings & kareena-core fashion notes.",
    emoji: "👛",
    bg: "from-bubblegum to-lilac",
    rotate: -1.5,
    tag: "sooo fetch",
  },
  {
    href: "/girlhood",
    title: "girlhood ♡",
    blurb: "summer bucket list, things that made me smile, life lately.",
    emoji: "🎀",
    bg: "from-babypink to-lemon/70",
    rotate: 1,
    tag: "dreaming...",
  },
];

/** Grid of scrapbook cards teasing each magazine section. */
export function SectionTeasers() {
  return (
    <section aria-label="site sections">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TEASERS.map((t, i) => (
          <motion.div
            key={t.href}
            initial={{ opacity: 0, y: 24, rotate: t.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
            style={{ rotate: `${t.rotate}deg` }}
          >
            <Link
              href={t.href}
              className={`relative block h-full rounded-2xl border-[3px] border-inkberry bg-gradient-to-br ${t.bg} p-4 shadow-[5px_6px_0_rgba(61,18,48,0.35)]`}
            >
              <span
                aria-hidden
                className="absolute -top-3 -right-2 rotate-12 font-marker text-xs bg-lemon border-2 border-inkberry rounded-full px-2 py-0.5 shadow"
              >
                {t.tag}
              </span>
              <span className="text-4xl block mb-1" aria-hidden>
                {t.emoji}
              </span>
              <h3 className="font-lucky text-xl text-inkberry bubble-shadow mb-1">{t.title}</h3>
              <p className="font-comic text-[13px] text-inkberry/90 leading-snug">{t.blurb}</p>
              <p className="font-indie text-xs text-magenta mt-2">click me!! →</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
