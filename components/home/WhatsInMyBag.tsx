"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

export function WhatsInMyBag() {
  const { bag } = useSiteContent();
  return (
    <section className="paper-card halftone relative p-4 sm:p-8 rotate-[0.6deg]">
      <span aria-hidden className="washi -top-4 left-8 rotate-[-7deg]" />
      <span aria-hidden className="washi washi-candy -top-3 right-10 rotate-[5deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <CutoutHeading text={bag.heading} size="text-2xl sm:text-4xl" />
        <WordSticker text={bag.sticker} palette={4} rotate={8} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-4 max-w-lg">{bag.intro}</p>
      <div className="relative min-h-[430px] sm:min-h-[380px]">
        <motion.div whileHover={{ rotate: -2, scale: 1.03 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[110px] sm:text-[150px] leading-none select-none" aria-hidden>🎒</div>
          <p className="font-marker text-magenta text-sm -mt-2">{bag.bagLabel}</p>
        </motion.div>
        {bag.items.map((item, i) => (
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
            <svg viewBox="0 0 60 24" className={`w-12 h-6 text-grape ${item.arrowSide === "right" ? "ml-auto" : "-scale-x-100"}`} aria-hidden>
              <path d="M2 4c18 2 36 6 52 14" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 6" />
              <path d="M44 20l12-2-7-8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
