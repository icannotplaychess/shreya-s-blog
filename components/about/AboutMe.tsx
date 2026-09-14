"use client";

import { motion } from "framer-motion";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto } from "@/components/ui/DoodlePhoto";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { Sticker, WordSticker } from "@/components/ui/Sticker";

const STATS: [string, string][] = [
  ["name", "shankie (legal name: not ur business hehe)"],
  ["age", "14¾ (the ¾ is important)"],
  ["sign", "pisces ♓ (explains everything, says everyone)"],
  ["school", "the one with the strict uniform checks"],
  ["fav subject", "art > english > lunch > everything else"],
  ["fav movie", "kuch kuch hota hai / jab we met (don't make me pick)"],
  ["fav actor", "SRK. next question."],
  ["fav actress", "kareena AND preity AND rani (i said don't make me pick)"],
  ["fav channel", "zoom tv for gossip, pogo for dignity"],
  ["fav food", "amma's rajma chawal, golgappe (count: unlimited)"],
  ["hidden talent", "can recite the complete kal ho naa ho dialogue"],
  ["biggest fear", "the computer teacher checking browser history"],
];

const FAQ = [
  { q: "y is the site so pink?", a: "wrong question. y is everything ELSE not this pink?" },
  { q: "did u really code this urself?", a: "yes!! view-source → notepad → trial & error → crying → glory. raju uncle's café witnessed everything." },
  { q: "who is the crush the mixtape is for?", a: "next question." },
  { q: "seriously who—", a: "NEXT. QUESTION." },
  { q: "will u update regularly?", a: "every week unless exams, power cuts, or a good movie on set max. so... sometimes." },
];

/** Slam-book style about page: vitals table, polaroid, FAQ. */
export function AboutMe() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* slam book vitals */}
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
              {STATS.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ delay: i * 0.03 }}
                  className="flex gap-2 items-baseline border-b border-dashed border-bubblegum/70 pb-1"
                >
                  <dt className="font-chewy text-sm text-grape shrink-0 w-24 sm:w-28">{k}:</dt>
                  <dd className="font-indie text-sm text-inkberry">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FAQ speech bubbles */}
      <section aria-label="frequently asked questions">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <h2 className="font-bangers outline-text text-3xl text-cyanpop">frequently asked questions</h2>
          <WordSticker text="v exclusive interview" palette={3} rotate={-4} />
        </div>
        <div className="space-y-5 max-w-2xl mx-auto">
          {FAQ.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              className={`flex flex-col gap-4 ${i % 2 ? "items-end" : "items-start"}`}
            >
              <SpeechBubble color="#fff" rotate={i % 2 ? 1 : -1} className="max-w-[85%]">
                <p className="font-comic text-sm font-bold text-grape">Q: {f.q}</p>
              </SpeechBubble>
              <SpeechBubble color="#ffd1ec" rotate={i % 2 ? -1 : 1} className="max-w-[85%]">
                <p className="font-indie text-sm text-inkberry">A: {f.a}</p>
              </SpeechBubble>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
