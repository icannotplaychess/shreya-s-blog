"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto } from "@/components/ui/DoodlePhoto";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { Sticker, WordSticker } from "@/components/ui/Sticker";
import {
  DEFAULT_ABOUT_FAQ,
  DEFAULT_ABOUT_STATS,
  type AboutFaq,
  type AboutStat,
} from "@/lib/site-content-defaults";

export function AboutMe() {
  const [stats, setStats] = useState<AboutStat[]>(DEFAULT_ABOUT_STATS);
  const [faq, setFaq] = useState<AboutFaq[]>(DEFAULT_ABOUT_FAQ);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.about?.stats)) setStats(data.about.stats);
        if (Array.isArray(data.about?.faq)) setFaq(data.about.faq);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <section className="paper-card relative p-5 sm:p-8 -rotate-[0.4deg]">
        <span aria-hidden className="washi -top-4 left-10 rotate-[-6deg]" />
        <span aria-hidden className="washi washi-candy -top-3 right-12 rotate-[4deg]" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="shrink-0 flex flex-col items-center gap-3 mx-auto md:mx-0">
            <Polaroid photo={<DoodlePhoto kind="butterfly" />} caption="artist's self portrait" rotate={-4} className="w-44" />
            <WordSticker text="it's giving main character" palette={5} rotate={3} />
            <Sticker size="text-3xl" className="anim-wiggle" rotate={-8}>🧿</Sticker>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-lucky text-2xl text-magenta mb-3">
              vital statistics <span className="font-indie text-sm text-inkberry/70">(slam book official)</span>
            </h2>
            <dl className="space-y-1.5">
              {stats.map((item, i) => (
                <motion.div
                  key={`${item.label}-${i}`}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.03 }}
                  className="flex gap-2 items-baseline border-b border-dashed border-bubblegum/70 pb-1"
                >
                  <dt className="font-chewy text-sm text-grape shrink-0 w-24 sm:w-28">{item.label}:</dt>
                  <dd className="font-indie text-sm text-inkberry">{item.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="frequently asked questions">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <h2 className="font-bangers outline-text text-3xl text-cyanpop">frequently asked questions</h2>
          <WordSticker text="v exclusive interview" palette={3} rotate={-4} />
        </div>
        <div className="space-y-5 max-w-2xl mx-auto">
          {faq.map((f, i) => (
            <motion.div
              key={`${f.q}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <SpeechBubble color={i % 2 ? "#ffd1ec" : "#c9f4ff"} rotate={i % 2 ? -1 : 1}>
                <p className="font-chewy text-sm text-magenta mb-1">Q: {f.q}</p>
                <p className="font-indie text-sm text-inkberry">A: {f.a}</p>
              </SpeechBubble>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
