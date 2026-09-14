"use client";

import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

const CANDY = [
  { name: "Poppins", price: "₹5", emoji: "🌈", note: "the rainbow roll. orange ones are currency.", bg: "linear-gradient(135deg,#ff8a00,#ffe135)" },
  { name: "Phantom Cigarettes", price: "₹2", emoji: "🚬", note: "minty sticks 4 looking dramatic at the bus stop.", bg: "linear-gradient(135deg,#fff,#c9f4ff)" },
  { name: "Boomer", price: "₹1", emoji: "💪", note: "comes w/ tattoo. the tattoo is the point.", bg: "linear-gradient(135deg,#ff1f8f,#ffd1ec)" },
  { name: "Big Babol", price: "₹2", emoji: "🫧", note: "bubble bigger than ur face or it doesn't count.", bg: "linear-gradient(135deg,#ff77c8,#fff)" },
  { name: "Center Shock", price: "₹1", emoji: "⚡", note: "a jump scare in chewing gum form. offer to enemies.", bg: "linear-gradient(135deg,#ffe135,#2fe0c8)" },
  { name: "Kismi", price: "₹1", emoji: "💋", note: "the elaichi toffee of romance (as per the wrapper).", bg: "linear-gradient(135deg,#e6007e,#ffb3c6)" },
  { name: "Mango Bite", price: "₹0.50", emoji: "🥭", note: "lasts one bus stop if u don't crunch. i always crunch.", bg: "linear-gradient(135deg,#ffb703,#ffe135)" },
  { name: "Melody", price: "₹1", emoji: "🍫", note: "melody itni chocolaty kyun hai? ongoing investigation.", bg: "linear-gradient(135deg,#b07d48,#ffd1ec)" },
];

/** The candy museum: hoverable wrapper cards with prices. */
export function CandyShelf() {
  return (
    <section className="paper-card relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 right-10 rotate-[6deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text="THE CANDY MUSEUM" size="text-2xl sm:text-4xl" />
        <WordSticker text="pocket money went here" palette={4} rotate={-4} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">
        curated from the school gate shop &amp; the corner store uncle who KNOWS my order.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {CANDY.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ rotate: i % 2 ? 3 : -3, scale: 1.07, y: -5 }}
            className="relative rounded-2xl border-[3px] border-inkberry p-3 text-center shadow-[4px_5px_0_rgba(61,18,48,0.3)]"
            style={{ background: c.bg, rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
          >
            <span
              className="absolute -top-2.5 -right-2 font-lucky text-[11px] bg-white border-2 border-inkberry rounded-full px-2 py-0.5 rotate-12 shadow"
              aria-hidden
            >
              {c.price}
            </span>
            <span className="text-4xl block mb-1" aria-hidden>
              {c.emoji}
            </span>
            <p className="font-lucky text-sm text-inkberry">{c.name}</p>
            <p className="font-indie text-[11px] text-inkberry/85 leading-tight mt-1">{c.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
