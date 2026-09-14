"use client";

import { motion } from "framer-motion";
import { Sticker, WordSticker } from "@/components/ui/Sticker";
import { LoadingBar } from "@/components/widgets/LoadingBar";

const TITLE = "SHANKIE'S";
const LETTER_COLORS = [
  "#ff1f8f",
  "#ff8a00",
  "#ffe135",
  "#2fe0c8",
  "#00d9ff",
  "#cfa6ff",
  "#8a2be2",
  "#e6007e",
  "#ff77c8",
];

export function Hero({
  tagline = "your favourite corner of the internet ★",
  subtitle = "a little scrapbook of girlhood ~ est. 2007 ~ updated after school & homework (sometimes during)",
}: {
  tagline?: string;
  subtitle?: string;
}) {
  return (
    <header className="relative text-center pt-10 pb-6 overflow-visible">
      {/* floating deco stickers */}
      <Sticker className="absolute left-[4%] top-2 anim-floaty hidden sm:inline-block" rotate={-14} size="text-4xl">🦋</Sticker>
      <Sticker className="absolute right-[6%] top-8 anim-wiggle hidden sm:inline-block" rotate={10} size="text-4xl">🎀</Sticker>
      <Sticker className="absolute left-[12%] bottom-24 anim-twinkle hidden md:inline-block" rotate={0} size="text-3xl">✨</Sticker>
      <Sticker className="absolute right-[13%] bottom-36 anim-floaty hidden md:inline-block" rotate={-8} size="text-3xl">🌸</Sticker>
      <Sticker className="absolute left-[22%] top-24 anim-bounce-tiny hidden lg:inline-block" size="text-2xl">💿</Sticker>
      <Sticker className="absolute right-[24%] top-1 hidden lg:inline-block anim-spin-slow" size="text-2xl">🌟</Sticker>

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-pixel text-[9px] sm:text-[10px] text-grape mb-3"
      >
        ☆ﾟ.*･｡ﾟ welcome 2 my corner ﾟ｡･*.ﾟ☆
      </motion.p>

      {/* big cutout-letter title */}
      <h1 className="flex justify-center flex-wrap gap-1 sm:gap-2 mb-1 select-none" aria-label="Shankie's">
        {TITLE.split("").map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ y: -60, opacity: 0, rotate: i % 2 ? 8 : -8 }}
            animate={{ y: 0, opacity: 1, rotate: i % 2 ? 3 : -3 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 250, damping: 14 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.15 }}
            className="font-bangers outline-text-thick text-5xl sm:text-7xl md:text-8xl inline-block"
            style={{ color: LETTER_COLORS[i % LETTER_COLORS.length] }}
          >
            {ch}
          </motion.span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="font-pacifico text-xl sm:text-2xl glitter-text mb-1"
      >
        {tagline}
      </motion.p>
      <p className="font-indie text-sm sm:text-base text-inkberry/90 mb-5">
        {subtitle}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-2 mb-6">
        <WordSticker text="OMG hi!!" palette={0} rotate={-7} />
        <WordSticker text="new diary entry ♡" palette={1} rotate={4} />
        <WordSticker text="sign my guestbook!" palette={2} rotate={-3} />
        <WordSticker text="no boys allowed (jk)" palette={3} rotate={6} />
      </div>

      <LoadingBar />
    </header>
  );
}
