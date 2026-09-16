"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

export function CandyShelf() {
  const { collections } = useSiteContent();
  const { candy } = collections;
  return (
    <section className="paper-card relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 right-10 rotate-[6deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text={candy.heading} size="text-2xl sm:text-4xl" />
        <WordSticker text={candy.sticker} palette={4} rotate={-4} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">{candy.intro}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {candy.items.map((c, i) => (
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
            <span className="absolute -top-2.5 -right-2 font-lucky text-[11px] bg-white border-2 border-inkberry rounded-full px-2 py-0.5 rotate-12 shadow" aria-hidden>
              {c.price}
            </span>
            <span className="text-4xl block mb-1" aria-hidden>{c.emoji}</span>
            <p className="font-lucky text-sm text-inkberry">{c.name}</p>
            <p className="font-indie text-[11px] text-inkberry/85 leading-tight mt-1">{c.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
