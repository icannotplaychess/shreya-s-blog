"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WordSticker } from "@/components/ui/Sticker";
import { DEFAULT_CD_MIXES, type CdMix } from "@/lib/site-content-defaults";

export function CdCaseGrid() {
  const [mixes, setMixes] = useState<CdMix[]>(DEFAULT_CD_MIXES);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.cdMixes) && data.cdMixes.length > 0) {
          setMixes(data.cdMixes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section aria-label="burned CD collection">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-magenta">the burned CD archive</h2>
        <WordSticker text="₹20 each @ cyber café" palette={2} rotate={-4} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {mixes.map((mix, i) => (
          <motion.div
            key={mix.title}
            initial={{ opacity: 0, y: 20, rotate: i % 2 ? 1.4 : -1.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="group rounded-xl border-[3px] border-inkberry bg-white/85 shadow-[5px_6px_0_rgba(61,18,48,0.3)] overflow-hidden"
            style={{ rotate: `${i % 2 ? 1.4 : -1.4}deg` }}
          >
            <div
              className="relative p-4 flex items-center gap-3 border-b-[3px] border-inkberry"
              style={{ background: `linear-gradient(135deg, ${mix.from}, ${mix.to})` }}
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.8 }}
                className="w-14 h-14 rounded-full shrink-0 border-[3px] border-white/80 flex items-center justify-center text-xl"
                style={{ background: `conic-gradient(from 0deg, #fff5, ${mix.to}, #fff8, ${mix.from}, #fff5)` }}
                aria-hidden
              >
                {mix.emoji}
              </motion.div>
              <div className="min-w-0">
                <p className="font-pixel text-[8px] text-white/90">{mix.vol} ~ mixed by shankie</p>
                <h3 className="font-lucky text-lg text-white drop-shadow truncate">{mix.title}</h3>
                <p className="font-indie text-xs text-white/95">{mix.vibe}</p>
              </div>
            </div>
            <ol className="lined-paper p-3 pl-9 space-y-0.5">
              {mix.tracks.map((t, j) => (
                <li key={t} className="font-indie text-[13px] text-[#3a3050] group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${j * 40}ms` }}>
                  <span className="text-magenta font-bold">{j + 1}.</span> {t}
                </li>
              ))}
            </ol>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
