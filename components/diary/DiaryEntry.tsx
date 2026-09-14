"use client";

import { motion } from "framer-motion";
import { Sticker } from "@/components/ui/Sticker";
import { DoodlePhoto, type DoodleKind } from "@/components/ui/DoodlePhoto";
import { Polaroid } from "@/components/ui/Polaroid";

export interface DiaryEntryData {
  date: string;
  title: string;
  doodle: DoodleKind;
  highlight: string;
  body: string[];
  stickers: string[];
  tape: string;
}

/** A diary entry styled like a scanned lined-notebook page with tape & doodles. */
export function DiaryEntry({ entry, flip = false }: { entry: DiaryEntryData; flip?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate: flip ? 1.2 : -1.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="lined-paper relative rounded-lg border-2 border-[#d8c9b8] shadow-[6px_8px_18px_rgba(61,18,48,0.25)] p-5 sm:p-7 pl-8 sm:pl-14"
      style={{ rotate: flip ? "1.2deg" : "-1.2deg" }}
    >
      {/* tape + coffee stain */}
      <span aria-hidden className={`washi ${entry.tape} -top-4 ${flip ? "right-10" : "left-10"} rotate-[-5deg]`} />
      <span
        aria-hidden
        className="absolute rounded-full opacity-25 pointer-events-none"
        style={{
          width: 74,
          height: 74,
          right: flip ? "auto" : "8%",
          left: flip ? "6%" : "auto",
          bottom: "8%",
          border: "9px solid #b07d48",
          filter: "blur(1px)",
        }}
      />

      <header className="mb-3">
        <p className="font-comic text-xs text-[#8a7a6a]">{entry.date}</p>
        <h2 className="font-marker text-2xl sm:text-3xl text-magenta -rotate-1 inline-block">
          {entry.title}
        </h2>
        <p className="font-indie text-sm mt-1">
          <mark className="bg-lemon px-1 rounded">{entry.highlight}</mark> ✩
        </p>
      </header>

      <div className={`flex flex-col ${flip ? "sm:flex-row-reverse" : "sm:flex-row"} gap-5`}>
        <div className="flex-1 space-y-3">
          {entry.body.map((para, i) => (
            <p
              key={i}
              className="font-indie text-[15px] sm:text-base leading-[29px] text-[#3a3050]"
              dangerouslySetInnerHTML={{ __html: para.replace(/\*(.+?)\*/g, "<i>$1</i>") }}
            />
          ))}
          <div className="flex gap-2 pt-1">
            {entry.stickers.map((s, i) => (
              <Sticker key={i} size="text-2xl" rotate={i % 2 ? 8 : -8} className={i === 1 ? "anim-wiggle" : ""}>
                {s}
              </Sticker>
            ))}
          </div>
        </div>
        <div className="shrink-0 self-center sm:self-start">
          <Polaroid
            photo={<DoodlePhoto kind={entry.doodle} />}
            caption="evidence attached"
            rotate={flip ? -5 : 5}
            className="w-36"
            tape={false}
          />
          {/* pressed flower doodle */}
          <div className="text-center mt-2 text-2xl anim-floaty" aria-hidden>
            🌸
          </div>
        </div>
      </div>
    </motion.article>
  );
}
