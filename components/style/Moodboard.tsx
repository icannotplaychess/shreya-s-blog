"use client";

import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Sticker, WordSticker } from "@/components/ui/Sticker";

interface Tile {
  label: string;
  note: string;
  bg: string;
  span?: string;
  rotate: number;
  emoji: string;
}

const TILES: Tile[] = [
  { label: "glitter lip gloss", note: "strawberry, obviously", bg: "linear-gradient(135deg,#ff77c8,#ffd1ec)", rotate: -2, emoji: "💄", span: "sm:col-span-2" },
  { label: "butterfly clips", note: "minimum 6 per hairstyle", bg: "linear-gradient(135deg,#cfa6ff,#00d9ff)", rotate: 2, emoji: "🦋" },
  { label: "low-waist jeans", note: "kareena in k3g. enough said.", bg: "linear-gradient(135deg,#87d4f5,#3d6cb4)", rotate: -1, emoji: "👖" },
  { label: "bindis but tiny", note: "the aishwarya effect", bg: "linear-gradient(135deg,#e6007e,#ff8a00)", rotate: 1.5, emoji: "🔴" },
  { label: "denim on denim", note: "preity said it's fine", bg: "linear-gradient(135deg,#5b8bd4,#a8c8f0)", rotate: -2.5, emoji: "🧢", span: "sm:col-span-2" },
  { label: "friendship bands", note: "wrist inventory: 11", bg: "linear-gradient(135deg,#2fe0c8,#ffe135)", rotate: 2, emoji: "🧵" },
  { label: "mehendi weekends", note: "ritu di's masterpieces", bg: "linear-gradient(135deg,#b07d48,#e0a458)", rotate: -1, emoji: "🌿" },
  { label: "shiny dupatta drama", note: "twirl radius: maximum", bg: "linear-gradient(135deg,#8a2be2,#ff1f8f)", rotate: 1, emoji: "🧣" },
];

/** Collage-style fashion moodboard. */
export function Moodboard() {
  return (
    <section className="paper-card relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 left-10 rotate-[-6deg]" />
      <Sticker className="absolute -top-5 right-8 anim-wiggle" size="text-3xl" rotate={10}>🎀</Sticker>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <CutoutHeading text="MOODBOARD" size="text-2xl sm:text-4xl" />
        <WordSticker text="the vision™" palette={1} rotate={-5} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TILES.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.8, rotate: t.rotate }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            className={`relative rounded-xl border-[3px] border-white shadow-[4px_5px_0_rgba(61,18,48,0.3)] p-3 min-h-[110px] flex flex-col justify-end ${t.span ?? ""}`}
            style={{ background: t.bg, rotate: `${t.rotate}deg` }}
          >
            <span className="absolute top-2 right-2 text-2xl" aria-hidden>
              {t.emoji}
            </span>
            <p className="font-lucky text-sm sm:text-base text-white drop-shadow-[2px_2px_0_rgba(61,18,48,0.5)]">{t.label}</p>
            <p className="font-indie text-[11px] text-white/95">{t.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
