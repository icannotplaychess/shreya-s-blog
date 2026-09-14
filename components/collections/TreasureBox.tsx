"use client";

import { motion } from "framer-motion";
import { WordSticker } from "@/components/ui/Sticker";
import { SpeechBubble } from "@/components/ui/SpeechBubble";

const TREASURES = [
  { emoji: "🃏", name: "tazos (complete pokémon set)", detail: "traded 3 lunches for the charizard one. zero regrets.", rarity: "LEGENDARY" },
  { emoji: "🖋️", name: "gel pen collection (24)", detail: "sorted by glitter density. the gold one is ceremonial.", rarity: "RARE" },
  { emoji: "📮", name: "archies cards (unsent)", detail: "bought 'thinking of you' cards for the aesthetic. thinking of no one specific. mostly.", rarity: "CLASSIFIED" },
  { emoji: "🪀", name: "wwe trump cards", detail: "undertaker card is bent but his stats remain undefeated.", rarity: "RARE" },
  { emoji: "📼", name: "recorded-from-radio tapes", detail: "each song starts 4 seconds late bc i had to run to press record.", rarity: "PRICELESS" },
  { emoji: "🎟️", name: "movie ticket stubs", detail: "including the mohabbatein one from when i was 6. it's vintage.", rarity: "VINTAGE" },
  { emoji: "🧲", name: "fridge magnet from goa", detail: "we did not go to goa. sharma aunty gave it. counts.", rarity: "COMMON" },
  { emoji: "🏅", name: "boomer tattoos (4/5)", detail: "left arm is a rotating gallery. amma disapproves (jealous).", rarity: "LIMITED" },
];

const RARITY_COLORS: Record<string, string> = {
  LEGENDARY: "bg-gradient-to-r from-tangerine to-lemon text-inkberry",
  RARE: "bg-gradient-to-r from-cyanpop to-turq text-inkberry",
  CLASSIFIED: "bg-gradient-to-r from-inkberry to-grape text-white",
  PRICELESS: "bg-gradient-to-r from-hotpink to-magenta text-white",
  VINTAGE: "bg-gradient-to-r from-[#b07d48] to-[#e0a458] text-white",
  COMMON: "bg-white text-inkberry",
  LIMITED: "bg-gradient-to-r from-grape to-lilac text-white",
};

/** The under-the-bed treasure box inventory. */
export function TreasureBox() {
  return (
    <section className="relative -rotate-[0.3deg]" aria-label="treasure box">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-grape">the under-the-bed treasure box</h2>
        <WordSticker text="amma pls don't clean" palette={0} rotate={5} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TREASURES.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ scale: 1.03, rotate: i % 2 ? 1 : -1 }}
            className="flex items-start gap-3 bg-white/85 rounded-2xl border-[3px] border-bubblegum p-3.5 shadow-[4px_5px_0_rgba(255,119,200,0.4)]"
            style={{ rotate: `${i % 2 ? 0.8 : -0.8}deg` }}
          >
            <span className="text-3xl shrink-0 anim-bounce-tiny" style={{ animationDelay: `${i * 0.2}s` }} aria-hidden>
              {t.emoji}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-chewy text-base text-inkberry">{t.name}</p>
                <span className={`font-pixel text-[7px] px-1.5 py-0.5 rounded border border-inkberry/40 ${RARITY_COLORS[t.rarity]}`}>
                  {t.rarity}
                </span>
              </div>
              <p className="font-indie text-xs text-inkberry/85 mt-0.5">{t.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 max-w-md mx-auto">
        <SpeechBubble color="#fff9ae" rotate={1}>
          <p className="font-comic text-sm text-inkberry">
            valuation note: sotheby&apos;s has not responded to my letters (sent via archies envelope,
            so we know they arrived in STYLE).
          </p>
        </SpeechBubble>
      </div>
    </section>
  );
}
