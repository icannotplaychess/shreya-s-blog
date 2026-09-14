"use client";

import { motion } from "framer-motion";
import { WordSticker } from "@/components/ui/Sticker";

interface Mix {
  title: string;
  vol: string;
  vibe: string;
  from: string;
  to: string;
  emoji: string;
  tracks: string[];
}

const MIXES: Mix[] = [
  {
    title: "rakhi rewind",
    vol: "VOL. 1",
    vibe: "for the school bus window seat",
    from: "#ff1f8f",
    to: "#ff8a00",
    emoji: "🚌",
    tracks: ["Kal Ho Naa Ho — title track", "BSB — I Want It That Way", "Chura Liya (remix, sorry)", "M2M — Pretty Boy", "Kank — where's the party tonight"],
  },
  {
    title: "monsoon meltdown",
    vol: "VOL. 2",
    vibe: "crying but make it scenic",
    from: "#8a2be2",
    to: "#00d9ff",
    emoji: "🌧️",
    tracks: ["Woh Lamhe — Atif", "Avril — I'm With You", "Tum Se Hi — Jab We Met", "Westlife — My Love", "Kabhi Kabhi Aditi (sad version i imagined)"],
  },
  {
    title: "dhoom machaao",
    vol: "VOL. 3",
    vibe: "cleaning ur room dramatically",
    from: "#00d9ff",
    to: "#2fe0c8",
    emoji: "🧹",
    tracks: ["Dhoom Machale", "Kajra Re", "Britney — Toxic", "It's the Time to Disco", "Crazy Kiya Re"],
  },
  {
    title: "exam szn survival",
    vol: "VOL. 4",
    vibe: "studying (staring at wall)",
    from: "#ffe135",
    to: "#ff8a00",
    emoji: "📚",
    tracks: ["Give Me Some Sunshine (early bootleg?)", "Enrique — Hero", "Yaaron — KK", "Aadat — Jal", "Coldplay — the yellow one"],
  },
  {
    title: "shaadi practice",
    vol: "VOL. 5",
    vibe: "sangeet choreo rehearsals",
    from: "#e6007e",
    to: "#cfa6ff",
    emoji: "💃",
    tracks: ["Bole Chudiyan", "Mahi Ve", "Say Shava Shava", "Maahi Ve (yes both)", "Deewangi Deewangi"],
  },
  {
    title: "4 u <3 (never sent)",
    vol: "VOL. 6",
    vibe: "do not ask. next question.",
    from: "#ff77c8",
    to: "#8a2be2",
    emoji: "💌",
    tracks: ["Tere Liye — Veer-Zaara", "BSB — Shape of My Heart", "Pehla Nasha", "Avril — Things I'll Never Say", "Track 5: [name redacted].mp3"],
  },
];

/** Grid of burned mix-CDs in jewel cases; flips open on hover/tap. */
export function CdCaseGrid() {
  return (
    <section aria-label="burned CD collection">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-magenta">the burned CD archive</h2>
        <WordSticker text="₹20 each @ cyber café" palette={2} rotate={-4} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {MIXES.map((mix, i) => (
          <motion.div
            key={mix.title}
            initial={{ opacity: 0, y: 20, rotate: i % 2 ? 1.4 : -1.4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="group rounded-xl border-[3px] border-inkberry bg-white/85 shadow-[5px_6px_0_rgba(61,18,48,0.3)] overflow-hidden"
            style={{ rotate: `${i % 2 ? 1.4 : -1.4}deg` }}
          >
            {/* jewel case lid */}
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
              <span aria-hidden className="absolute top-1 right-2 font-marker text-[10px] text-white/80 rotate-6">
                CD-R 700MB
              </span>
            </div>
            {/* tracklist (handwritten insert) */}
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
