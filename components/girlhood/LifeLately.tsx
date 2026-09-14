"use client";

import { motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto } from "@/components/ui/DoodlePhoto";

const UPDATES = [
  {
    tag: "reading 📖",
    text: "malory towers (again) + tinkle digest no. 143. suppandi remains the greatest philosopher of our time.",
    bg: "from-lemon/70 to-tangerine/40",
  },
  {
    tag: "watching 📺",
    text: "kasautii at 8:30 with amma (i pretend i don't care. i care SO much). also: takeshi's castle dubbed. javed jaffrey deserves an oscar.",
    bg: "from-cyanpop/50 to-turq/40",
  },
  {
    tag: "learning ✍️",
    text: "bubble letters (mastered), mehendi peacock (in progress), trigonometry (we don't talk about it).",
    bg: "from-bubblegum/60 to-lilac/50",
  },
  {
    tag: "waiting for ⏳",
    text: "the new dhoom to release, my boomer tattoo collection to complete & the class picnic list to go up.",
    bg: "from-lilac/60 to-babypink",
  },
];

/** "Life lately" diary-lite cards + a couple of polaroids. */
export function LifeLately() {
  return (
    <section className="paper-card halftone relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 left-8 rotate-[-4deg]" />
      <CutoutHeading text="LIFE LATELY" size="text-2xl sm:text-4xl" className="mb-5" />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {UPDATES.map((u, i) => (
            <motion.div
              key={u.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
              className={`rounded-2xl border-[3px] border-inkberry bg-gradient-to-br ${u.bg} p-4 shadow-[4px_5px_0_rgba(61,18,48,0.3)]`}
            >
              <p className="font-lucky text-base text-inkberry mb-1">{u.tag}</p>
              <p className="font-comic text-[13px] text-inkberry/90 leading-snug">{u.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex lg:flex-col gap-4 justify-center items-center shrink-0">
          <Polaroid photo={<DoodlePhoto kind="sunset" />} caption="terrace office" rotate={-4} className="w-36" />
          <Polaroid photo={<DoodlePhoto kind="chai" />} caption="research fuel" rotate={5} className="w-36" />
        </div>
      </div>
    </section>
  );
}
