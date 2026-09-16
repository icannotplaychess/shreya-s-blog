"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Sticker, WordSticker } from "@/components/ui/Sticker";
import { resolveMediaUrl } from "@/lib/media-url";

export function Moodboard() {
  const { style } = useSiteContent();
  const { moodboard } = style;
  return (
    <section className="paper-card relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 left-10 rotate-[-6deg]" />
      <Sticker className="absolute -top-5 right-8 anim-wiggle" size="text-3xl" rotate={10}>🎀</Sticker>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <CutoutHeading text={moodboard.heading} size="text-2xl sm:text-4xl" />
        <WordSticker text={moodboard.sticker} palette={1} rotate={-5} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moodboard.tiles.map((t, i) => (
          <motion.div
            key={t.label}
            initial={{ opacity: 0, scale: 0.8, rotate: t.rotate }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            className={`relative rounded-xl border-[3px] border-white shadow-[4px_5px_0_rgba(61,18,48,0.3)] p-3 min-h-[110px] flex flex-col justify-end ${t.span ?? ""}`}
            style={t.imageUrl ? { rotate: `${t.rotate}deg` } : { background: t.bg, rotate: `${t.rotate}deg` }}
          >
            {t.imageUrl ? (
              <img src={resolveMediaUrl(t.imageUrl)} alt={t.label} className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-90" />
            ) : (
              <span className="absolute top-2 right-2 text-2xl" aria-hidden>{t.emoji}</span>
            )}
            <p className="font-lucky text-sm text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.4)]">{t.label}</p>
            <p className="font-indie text-[11px] text-white/90">{t.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
