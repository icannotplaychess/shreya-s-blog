"use client";

import { motion } from "framer-motion";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { WordSticker } from "@/components/ui/Sticker";

const CLIPPINGS = [
  {
    headline: "GET THE LOOK: bole chudiyan but for school farewell",
    source: "~ torn from stardust, pg 42 ~",
    body: "lehenga? no budget. solution: mom's dupatta + safety pins (14) + confidence (unlimited). accessorize with ritu di's bangles & the tiny bindi. teachers said 'very nice beta' = fashion week approval.",
    rotate: -1.5,
    bg: "#fff3c4",
  },
  {
    headline: "TREND ALERT: avril studded belt (DIY edition)",
    source: "~ inspired by MTV, executed by me ~",
    body: "papa's old belt + silver sketch-pen dots = basically hot topic. wore it over my school uniform sweater exactly once before ma'am confiscated it. worth it. the belt is a martyr now.",
    rotate: 1.5,
    bg: "#e8dcff",
  },
  {
    headline: "HAIR FILES: the katrina waves experiment",
    source: "~ filmfare said 'effortless'. filmfare LIED ~",
    body: "slept in 6 tight braids for 'natural waves'. woke up looking like a startled maggi packet. meenu said it was 'a look'. it was, technically, a look. moving on to butterfly clips era.",
    rotate: -1,
    bg: "#ffd1ec",
  },
];

/** Torn-magazine style fashion notes with jagged clip-path edges. */
export function StyleClippings() {
  return (
    <section aria-label="magazine clippings">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-tangerine">clippings & field notes</h2>
        <WordSticker text="glued w/ fevicol" palette={4} rotate={5} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CLIPPINGS.map((c) => (
          <motion.article
            key={c.headline}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ rotate: 0, y: -6 }}
            className="relative p-5 shadow-[5px_7px_14px_rgba(61,18,48,0.3)]"
            style={{
              background: c.bg,
              rotate: `${c.rotate}deg`,
              clipPath:
                "polygon(0% 3%, 4% 0%, 12% 2%, 22% 0%, 34% 3%, 47% 1%, 60% 3%, 74% 0%, 88% 2%, 100% 0%, 99% 15%, 100% 32%, 98% 51%, 100% 70%, 99% 88%, 100% 100%, 85% 99%, 68% 100%, 50% 98%, 32% 100%, 15% 99%, 0% 100%, 1% 80%, 0% 60%, 2% 38%, 0% 18%)",
            }}
          >
            <h3 className="font-bangers text-xl text-magenta leading-tight mb-1">{c.headline}</h3>
            <p className="font-pixel text-[7px] text-inkberry/60 mb-2">{c.source}</p>
            <p className="font-comic text-[13px] text-inkberry leading-snug">{c.body}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <SpeechBubble color="#c9f4ff" rotate={-1}>
          <p className="font-chewy text-base text-inkberry">
            style rule #1: if it doesn&apos;t sparkle, ADD SPARKLE. this applies to clothes, notebooks,
            bicycles &amp; life. ✨
          </p>
        </SpeechBubble>
      </div>
    </section>
  );
}
