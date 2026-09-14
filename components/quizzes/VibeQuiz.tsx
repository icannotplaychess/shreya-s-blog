"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

type VibeKey = "filmi" | "rockstar" | "dreamer";

interface Question {
  q: string;
  options: { text: string; vibe: VibeKey }[];
}

const QUESTIONS: Question[] = [
  {
    q: "it's sunday 9am. u are...",
    options: [
      { text: "watching rangoli on doordarshan & humming along 🎶", vibe: "filmi" },
      { text: "blasting avril & 'cleaning' ur room (air guitar) 🎸", vibe: "rockstar" },
      { text: "still in bed, decorating ur diary with gel pens ✒️", vibe: "dreamer" },
    ],
  },
  {
    q: "ur school bag's most precious item?",
    options: [
      { text: "shah rukh photo cut from filmfare, laminated 👑", vibe: "filmi" },
      { text: "burned CD labelled 'DO NOT TOUCH' 💿", vibe: "rockstar" },
      { text: "slam book with a tiny lock 🔒", vibe: "dreamer" },
    ],
  },
  {
    q: "the class function needs a performance. u sign up for...",
    options: [
      { text: "full bole-chudiyan choreography, 6 costume changes 💃", vibe: "filmi" },
      { text: "lip-sync rock show w/ badminton racket guitar 🎤", vibe: "rockstar" },
      { text: "backstage decoration committee (the REAL artists) 🎨", vibe: "dreamer" },
    ],
  },
  {
    q: "pick an after-school snack ritual:",
    options: [
      { text: "maggi + zoom tv countdown, screaming the rankings 🍜", vibe: "filmi" },
      { text: "center shock while doing cycle stunts (dangerous. cool.) ⚡", vibe: "rockstar" },
      { text: "melody + staring dramatically out the window 🌧️", vibe: "dreamer" },
    ],
  },
  {
    q: "ur orkut 'about me' says:",
    options: [
      { text: "\"palat... palat... palat...\" 🎬", vibe: "filmi" },
      { text: "\"sk8er girl. dnt msg if boring.\" 🛹", vibe: "rockstar" },
      { text: "\"⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆ dreaming ⋆｡ﾟ\"", vibe: "dreamer" },
    ],
  },
];

const RESULTS: Record<VibeKey, { title: string; emoji: string; desc: string; from: string; to: string }> = {
  filmi: {
    title: "FULL FILMI HEROINE",
    emoji: "🎬",
    desc: "ur life has background music only u can hear. train station scenes make u emotional. when it rains, it rains FOR u specifically. keep twirling, kuch kuch is always hota-ing in ur heart.",
    from: "#ff1f8f",
    to: "#ff8a00",
  },
  rockstar: {
    title: "COLONY ROCKSTAR",
    emoji: "🎸",
    desc: "avril taught u eyeliner, bon jovi taught u attitude. ur burned CDs are legendary, ur volume knob is broken (from use). the terrace is ur stadium & the pigeons are ur fans.",
    from: "#8a2be2",
    to: "#00d9ff",
  },
  dreamer: {
    title: "GEL PEN DREAMER",
    emoji: "🌙",
    desc: "ur diary has better world-building than most novels. u have 47 unfinished letters, all beautiful. u see a nice cloud and think about it for 3 days. never change, the scrapbooks need u.",
    from: "#ff77c8",
    to: "#cfa6ff",
  },
};

/** Multi-step "what's my vibe" magazine quiz with a glittery result card. */
export function VibeQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<VibeKey, number>>({ filmi: 0, rockstar: 0, dreamer: 0 });
  const finished = step >= QUESTIONS.length;

  const pick = (vibe: VibeKey) => {
    setScores((s) => ({ ...s, [vibe]: s[vibe] + 1 }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setScores({ filmi: 0, rockstar: 0, dreamer: 0 });
  };

  const winner = (Object.keys(scores) as VibeKey[]).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
  const result = RESULTS[winner];

  return (
    <section className="paper-card halftone relative p-4 sm:p-7 -rotate-[0.5deg]">
      <span aria-hidden className="washi washi-lilac -top-4 right-10 rotate-[7deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text="WHAT'S MY VIBE?" size="text-2xl sm:text-4xl" />
        <WordSticker text="v scientific" palette={3} rotate={-6} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">
        5 questions. 1 destiny. as accurate as the back page of any 2007 magazine (extremely).
      </p>

      {/* progress hearts */}
      <div className="flex gap-1.5 mb-5" aria-label={`question ${Math.min(step + 1, QUESTIONS.length)} of ${QUESTIONS.length}`}>
        {QUESTIONS.map((_, i) => (
          <span key={i} className={`text-xl transition-transform ${i < step ? "scale-100" : "scale-90 opacity-40 grayscale"}`} aria-hidden>
            💖
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -60, rotate: -2 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-chewy text-xl sm:text-2xl text-grape mb-4">
              Q{step + 1}. {QUESTIONS[step].q}
            </h3>
            <div className="grid gap-3">
              {QUESTIONS[step].options.map((opt, i) => (
                <motion.button
                  key={opt.text}
                  whileHover={{ scale: 1.03, rotate: i % 2 ? 1 : -1, x: 6 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => pick(opt.vibe)}
                  className="text-left font-comic text-sm sm:text-base px-4 py-3 rounded-2xl border-[3px] border-inkberry/60 bg-white hover:bg-gradient-to-r hover:from-lemon/60 hover:to-babypink shadow-[3px_4px_0_rgba(61,18,48,0.25)]"
                >
                  <span className="font-lucky text-magenta mr-2">{["a", "b", "c"][i]})</span>
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -1 }}
            className="rhinestone-border rounded-3xl p-5 text-center"
            style={{ background: `linear-gradient(135deg, ${result.from}33, ${result.to}44), #fffdf5` }}
          >
            <span className="text-5xl block mb-2 anim-bounce-tiny" aria-hidden>
              {result.emoji}
            </span>
            <p className="font-pixel text-[9px] text-grape mb-1">★ UR RESULT IS IN ★</p>
            <h3
              className="font-bangers text-3xl sm:text-4xl outline-text mb-2"
              style={{ color: result.from }}
            >
              {result.title}
            </h3>
            <p className="font-comic text-sm sm:text-base text-inkberry max-w-md mx-auto">{result.desc}</p>
            <button
              onClick={reset}
              className="glossy mt-4 px-5 py-2 font-lucky text-sm text-white bg-gradient-to-b from-grape to-[#5a1e96]"
            >
              retake (2 confirm accuracy)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
