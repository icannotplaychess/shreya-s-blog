"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto, type DoodleKind } from "@/components/ui/DoodlePhoto";
import { WordSticker, Sticker } from "@/components/ui/Sticker";

interface Photo {
  kind: DoodleKind;
  caption: string;
  story: string;
  rotate: number;
}

const WALL: Photo[] = [
  { kind: "sunset", caption: "terrace @ 6:45pm", rotate: -4, story: "the sky did THIS and everyone in the colony came up to their terrace like it was a scheduled event. pigeons also attended." },
  { kind: "auto", caption: "sharma uncle's auto", rotate: 3, story: "the auto with the best decorations in the whole area: fairy lights, a mini ganesha, AND a poster of hrithik. 10/10 ride experience." },
  { kind: "chai", caption: "adrak chai szn", rotate: -2, story: "amma's monsoon special. one sip and you understand why poets exist." },
  { kind: "kulfi", caption: "matka kulfi!!", rotate: 5, story: "the kulfi wala rings his bell at exactly 4pm and the whole gali goes into a frenzy. pistachio on top if he likes you." },
  { kind: "bangles", caption: "ritu di's churiyaan", rotate: -5, story: "borrowed for the school function. returned exactly one short. we do not speak of it." },
  { kind: "marigold", caption: "genda phool", rotate: 2, story: "from the diwali decorations. pressed it in my science textbook between 'photosynthesis' and 'respiration'. it belongs there." },
  { kind: "tv", caption: "sunday rangoli @ 7am", rotate: -3, story: "waking up early on SUNDAY to watch rangoli on doordarshan. the dedication of a true old-songs enjoyer." },
  { kind: "kite", caption: "patang war champion", rotate: 4, story: "cut THREE kites this makar sankranti. the terrace next door still hasn't recovered emotionally." },
  { kind: "radio", caption: "the family murphy", rotate: -2, story: "dadaji's radio. vividh bharati in the morning, cricket commentary in the afternoon. it has never once been turned off." },
];

const FILM: Photo[] = [
  { kind: "cd", caption: "mix cd vol. 6", rotate: 0, story: "burned at the cyber café. track 3 skips but that's character." },
  { kind: "cassette", caption: "RIP side B", rotate: 0, story: "the walkman's victim. a moment of silence." },
  { kind: "nokia", caption: "snake ii: 1247", rotate: 0, story: "my magnum opus. my legacy. my 1247." },
  { kind: "camera", caption: "the kodak kb10", rotate: 0, story: "36 exposures of pure chaos, and 4 of someone's thumb." },
  { kind: "mixtape-heart", caption: "4 u <3", rotate: 0, story: "a mixtape i made and never gave to anyone. it's the thought that counts (the thought was scary)." },
  { kind: "diary", caption: "do NOT open", rotate: 0, story: "pictured: the diary. not pictured: the lock that priya picked with a hairpin in 4 seconds." },
];

/** Scrapbook photo wall: polaroid grid + film strip, with a cute lightbox. */
export function PhotoWall() {
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-10">
      {/* polaroid wall */}
      <section className="paper-card relative p-5 sm:p-8 rotate-[0.4deg]">
        <span aria-hidden className="washi -top-4 left-1/2 -translate-x-1/2 rotate-[3deg]" />
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <h2 className="font-bangers outline-text text-3xl text-hotpink">the polaroid wall</h2>
          <WordSticker text="memoriezz" palette={3} rotate={-5} />
          <Sticker size="text-2xl" className="anim-twinkle">✨</Sticker>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-7 justify-items-center">
          {WALL.map((p) => (
            <Polaroid
              key={p.caption}
              photo={<DoodlePhoto kind={p.kind} />}
              caption={p.caption}
              rotate={p.rotate}
              className="w-full max-w-[190px]"
              onClick={() => setSelected(p)}
            />
          ))}
        </div>
      </section>

      {/* film strip */}
      <section className="relative -rotate-[0.6deg]">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-bangers outline-text text-3xl text-grape">one roll, no regrets</h2>
          <WordSticker text="35mm babyy" palette={1} rotate={6} />
        </div>
        <div className="film-strip rounded-lg overflow-x-auto">
          <div className="flex gap-3 px-2 w-max">
            {FILM.map((p) => (
              <motion.button
                key={p.caption}
                whileHover={{ scale: 1.07, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelected(p)}
                className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 border-4 border-[#3a333d] bg-babypink overflow-hidden"
                aria-label={`open photo: ${p.caption}`}
              >
                <DoodlePhoto kind={p.kind} />
              </motion.button>
            ))}
          </div>
        </div>
        <p className="font-indie text-sm text-inkberry/80 mt-2 text-center">
          ↑ scroll the strip! the studio uncle said &ldquo;very artistic&rdquo; which i choose to believe
        </p>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-inkberry/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -6, y: 40 }}
              animate={{ scale: 1, rotate: -1, y: 0 }}
              exit={{ scale: 0.7, rotate: 6, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="polaroid relative max-w-sm w-full !p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span aria-hidden className="washi washi-lilac -top-4 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
              <div className="aspect-square bg-babypink overflow-hidden mb-3">
                <DoodlePhoto kind={selected.kind} />
              </div>
              <p className="font-marker text-lg text-magenta text-center">{selected.caption}</p>
              <p className="font-indie text-sm text-inkberry text-center mt-1">{selected.story}</p>
              <button
                onClick={() => setSelected(null)}
                className="glossy mt-3 mx-auto block px-5 py-1.5 font-lucky text-xs text-white bg-gradient-to-b from-hotpink to-magenta"
              >
                close ✖ (bye photo)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
