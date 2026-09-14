"use client";

import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

interface BagItem {
  emoji: string;
  label: string;
  note: string;
  pos: string;
  arrowSide: "left" | "right";
}

const ITEMS: BagItem[] = [
  { emoji: "✏️", label: "Natraj pencil (chewed)", note: "the red-black stripes r iconic", pos: "top-[6%] left-[2%]", arrowSide: "right" },
  { emoji: "📐", label: "Camlin geometry box", note: "compass = weapon of choice", pos: "top-[4%] right-[2%]", arrowSide: "left" },
  { emoji: "📓", label: "Classmate notebook", note: "brown plastic cover DONE BY PAPA", pos: "top-[36%] left-[0%]", arrowSide: "right" },
  { emoji: "🍬", label: "Poppins + Mango Bite", note: "will share ONLY if ur nice", pos: "top-[34%] right-[0%]", arrowSide: "left" },
  { emoji: "🖊️", label: "gel pens (glitter blue)", note: "borrowed... never returning", pos: "bottom-[26%] left-[1%]", arrowSide: "right" },
  { emoji: "💿", label: "mix CD vol. 6", note: "burned @ raju cyber café, ₹20", pos: "bottom-[24%] right-[1%]", arrowSide: "left" },
  { emoji: "📔", label: "slam book", note: "TOP SECRET. do not open.", pos: "bottom-[2%] left-[4%]", arrowSide: "right" },
  { emoji: "🧴", label: "strawberry lip balm", note: "smells like heaven tbh", pos: "bottom-[0%] right-[4%]", arrowSide: "left" },
];

/** Magazine spread: annotated "what's in my school bag" with arrows pointing in. */
export function WhatsInMyBag() {
  return (
    <section className="paper-card halftone relative p-4 sm:p-8 rotate-[0.6deg]">
      <span aria-hidden className="washi -top-4 left-8 rotate-[-7deg]" />
      <span aria-hidden className="washi washi-candy -top-3 right-10 rotate-[5deg]" />

      <div className="flex flex-wrap items-center gap-3 mb-2">
        <CutoutHeading text="WHAT'S IN MY BAG?" size="text-2xl sm:text-4xl" />
        <WordSticker text="snoop alert!" palette={4} rotate={8} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-4 max-w-lg">
        as demanded by priya. yes everything smells faintly of mango bite. no i will not apologise.
      </p>

      <div className="relative min-h-[430px] sm:min-h-[380px]">
        {/* the bag */}
        <motion.div
          whileHover={{ rotate: -2, scale: 1.03 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <div className="text-[110px] sm:text-[150px] leading-none select-none" aria-hidden>🎒</div>
          <p className="font-marker text-magenta text-sm -mt-2">my trusty basta</p>
        </motion.div>

        {/* annotated items with hand-drawn arrows */}
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.1, rotate: item.arrowSide === "right" ? -3 : 3, zIndex: 10 }}
            className={`absolute ${item.pos} max-w-[150px] sm:max-w-[180px]`}
          >
            <div className="bg-white/95 border-2 border-dashed border-hotpink rounded-xl p-2 shadow-[3px_3px_0_rgba(255,31,143,0.35)]">
              <p className="font-chewy text-[12px] sm:text-sm text-inkberry leading-tight">
                <span aria-hidden>{item.emoji}</span> {item.label}
              </p>
              <p className="font-indie text-[10px] sm:text-[11px] text-magenta leading-tight">{item.note}</p>
            </div>
            <svg
              viewBox="0 0 60 24"
              className={`w-12 h-6 text-grape ${item.arrowSide === "right" ? "ml-auto" : "-scale-x-100"}`}
              aria-hidden
            >
              <path d="M2 4c18 2 36 6 52 14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 6" />
              <path d="M44 20l12-2-7-8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
