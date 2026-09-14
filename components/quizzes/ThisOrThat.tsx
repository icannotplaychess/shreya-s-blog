"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

const PAIRS: [string, string][] = [
  ["Poppins 🍬", "Phantom cigarettes 🚬(candy!)"],
  ["Big Babol 🫧", "Center Shock ⚡"],
  ["SRK 👑", "Hrithik 🕺"],
  ["Kareena 💅", "Preity 😊"],
  ["Orkut scraps 💌", "Yahoo! Messenger 💬"],
  ["Doordarshan 📺", "Channel V 🎤"],
  ["Maggi 🍜", "Kurkure 🌶️"],
  ["Gel pen ✒️", "Apsara pencil ✏️"],
  ["Auto ride 🛺", "Cycle double-seat 🚲"],
  ["Melody 🍫", "Kismi 💋"],
];

/** Classic magazine "this or that" — pick a side, get judged lovingly. */
export function ThisOrThat() {
  const [picks, setPicks] = useState<Record<number, 0 | 1>>({});
  const done = Object.keys(picks).length === PAIRS.length;
  const leftCount = Object.values(picks).filter((v) => v === 0).length;

  return (
    <section className="paper-card checker relative p-1 rotate-[0.5deg]">
      <div className="bg-white/92 rounded-[14px] p-4 sm:p-7" style={{ background: "rgba(255,255,255,0.92)" }}>
        <span aria-hidden className="washi washi-candy -top-2 left-8 rotate-[-6deg]" />
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <CutoutHeading text="THIS or THAT" size="text-2xl sm:text-4xl" />
          <WordSticker text="choose wisely" palette={0} rotate={6} />
        </div>
        <p className="font-indie text-sm text-inkberry/80 mb-5">
          tap ur pick!! there are no wrong answers except some answers are wrong (u know which).
        </p>

        <div className="space-y-2.5">
          {PAIRS.map(([a, b], i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              {[a, b].map((opt, side) => {
                const chosen = picks[i] === side;
                const otherChosen = picks[i] !== undefined && !chosen;
                return (
                  <motion.button
                    key={side}
                    whileHover={{ scale: 1.04, rotate: side ? 1.5 : -1.5 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setPicks((p) => ({ ...p, [i]: side as 0 | 1 }))}
                    className={`flex-1 font-chewy text-sm sm:text-base px-3 py-2 rounded-xl border-[3px] transition-colors ${
                      chosen
                        ? "border-magenta bg-gradient-to-r from-hotpink to-bubblegum text-white shadow-[3px_3px_0_rgba(230,0,126,0.5)]"
                        : otherChosen
                          ? "border-inkberry/20 bg-white/60 text-inkberry/40"
                          : "border-inkberry/60 bg-white text-inkberry hover:bg-lemon/40"
                    }`}
                    aria-pressed={chosen}
                  >
                    {opt}
                    {chosen && <span className="ml-1" aria-hidden>✔</span>}
                  </motion.button>
                );
              })}
              <span className="font-lucky text-xs text-grape hidden sm:inline" aria-hidden>
                vs
              </span>
            </div>
          ))}
        </div>

        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            className="mt-5 rhinestone-border rounded-2xl bg-gradient-to-r from-lemon/80 to-babypink p-4 text-center"
          >
            <p className="font-lucky text-lg text-magenta">
              VERDICT: {leftCount >= 7 ? "classic 90s kid, respect ✊" : leftCount >= 4 ? "perfectly balanced, like a good thali 🍱" : "hmm... trendsetter or menace? either way iconic 💅"}
            </p>
            <p className="font-indie text-sm text-inkberry mt-1">
              u picked column A {leftCount}/10 times. priya got 9. we are no longer speaking.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
