"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { WordSticker } from "@/components/ui/Sticker";

export function StyleClippings() {
  const { style } = useSiteContent();
  const { clippings } = style;
  return (
    <section aria-label="magazine clippings">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-tangerine">{clippings.heading}</h2>
        <WordSticker text={clippings.sticker} palette={4} rotate={5} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clippings.items.map((c) => (
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
              clipPath: "polygon(0% 3%, 4% 0%, 12% 2%, 22% 0%, 34% 3%, 47% 1%, 60% 3%, 74% 0%, 88% 2%, 100% 0%, 99% 15%, 100% 32%, 98% 51%, 100% 70%, 99% 88%, 100% 100%, 85% 99%, 68% 100%, 50% 98%, 32% 100%, 15% 99%, 0% 100%, 1% 80%, 0% 60%, 2% 38%, 0% 18%)",
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
          <p className="font-chewy text-base text-inkberry">{clippings.styleRule}</p>
        </SpeechBubble>
      </div>
    </section>
  );
}
