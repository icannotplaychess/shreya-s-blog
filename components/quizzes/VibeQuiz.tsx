"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

type VibeKey = string;

export function VibeQuiz() {
  const { quizzes } = useSiteContent();
  const { vibeQuiz } = quizzes;
  const questions = vibeQuiz.questions;
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const finished = step >= questions.length;

  const pick = (vibe: VibeKey) => {
    setScores((s) => ({ ...s, [vibe]: (s[vibe] ?? 0) + 1 }));
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setScores({});
  };

  const winner = Object.keys(scores).reduce((a, b) => ((scores[a] ?? 0) >= (scores[b] ?? 0) ? a : b), "filmi");
  const result = vibeQuiz.results[winner] ?? Object.values(vibeQuiz.results)[0];

  return (
    <section className="paper-card halftone relative p-4 sm:p-7 -rotate-[0.5deg]">
      <span aria-hidden className="washi washi-lilac -top-4 right-10 rotate-[7deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text={vibeQuiz.heading} size="text-2xl sm:text-4xl" />
        <WordSticker text={vibeQuiz.sticker} palette={3} rotate={-6} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">
        {questions.length} questions. 1 destiny. as accurate as the back page of any 2007 magazine (extremely).
      </p>
      <div className="flex gap-1.5 mb-5" aria-label={`question ${Math.min(step + 1, questions.length)} of ${questions.length}`}>
        {questions.map((_, i) => (
          <span key={i} className={`text-xl transition-transform ${i < step ? "scale-100" : "scale-90 opacity-40 grayscale"}`} aria-hidden>💖</span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div key={step} initial={{ opacity: 0, x: 60, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -60, rotate: -2 }} transition={{ duration: 0.25 }}>
            <h3 className="font-chewy text-xl sm:text-2xl text-grape mb-4">Q{step + 1}. {questions[step].q}</h3>
            <div className="grid gap-3">
              {questions[step].options.map((opt, i) => (
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
            <span className="text-5xl block mb-2 anim-bounce-tiny" aria-hidden>{result.emoji}</span>
            <p className="font-pixel text-[9px] text-grape mb-1">★ UR RESULT IS IN ★</p>
            <h3 className="font-bangers text-3xl sm:text-4xl outline-text mb-2" style={{ color: result.from }}>{result.title}</h3>
            <p className="font-comic text-sm sm:text-base text-inkberry max-w-md mx-auto">{result.desc}</p>
            <button onClick={reset} className="glossy mt-4 px-5 py-2 font-lucky text-sm text-white bg-gradient-to-b from-grape to-[#5a1e96]">
              retake (2 confirm accuracy)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
