"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

const ITEMS = [
  { text: "learn the full kajra re choreo (incl. the eyebrow part)", done: true },
  { text: "finish one classmate notebook with ONLY good handwriting", done: false },
  { text: "beat snake ii high score 1500 (current: 1247)", done: false },
  { text: "convince papa: CD player before boards", done: true },
  { text: "make friendship bands for the whole bench row", done: true },
  { text: "watch a movie FIRST DAY FIRST SHOW (any movie. the experience.)", done: false },
  { text: "perfect the maggi timing (2 min is a LIE, it's 3:40)", done: true },
  { text: "collect all 5 boomer tattoos this summer", done: false },
  { text: "write a letter & actually post it (archies card + everything)", done: false },
  { text: "terrace sleepover with meenu & the good blanket", done: true },
];

/** Summer bucket list as an interactive sticker checklist. */
export function BucketList() {
  const [checked, setChecked] = useState<boolean[]>(ITEMS.map((i) => i.done));
  const doneCount = checked.filter(Boolean).length;

  return (
    <section className="paper-card relative p-4 sm:p-7 -rotate-[0.4deg]">
      <span aria-hidden className="washi washi-candy -top-4 right-12 rotate-[5deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text="SUMMER BUCKET LIST" size="text-2xl sm:text-4xl" />
        <WordSticker text={`${doneCount}/10 done!!`} palette={2} rotate={-5} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">
        tap the stickers to check things off! (yes u may check off MY list. we share achievements here.)
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ITEMS.map((item, i) => (
          <li key={item.text}>
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              className={`w-full flex items-start gap-2.5 text-left px-3 py-2 rounded-xl border-2 border-dashed transition-colors ${
                checked[i] ? "border-turq bg-turq/15" : "border-bubblegum bg-white/70"
              }`}
              aria-pressed={checked[i]}
            >
              <motion.span
                animate={checked[i] ? { rotate: [0, -15, 10, 0], scale: [1, 1.4, 1] } : {}}
                className="text-xl shrink-0 select-none"
                aria-hidden
              >
                {checked[i] ? "✅" : "⬜"}
              </motion.span>
              <span
                className={`font-comic text-[13px] sm:text-sm leading-snug ${
                  checked[i] ? "line-through decoration-hotpink decoration-2 text-inkberry/60" : "text-inkberry"
                }`}
              >
                {item.text}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>
    </section>
  );
}
