"use client";

import { motion } from "framer-motion";

const FONTS = ["font-bangers", "font-lucky", "font-chewy", "font-marker", "font-fredoka"];
const COLORS = ["#ff1f8f", "#8a2be2", "#00a8cc", "#ff8a00", "#e6007e", "#12b886"];
const PAPERS = ["#fff", "#ffe135", "#ffd1ec", "#c9f4ff", "#e8dcff"];

/**
 * Ransom-note / magazine-cutout style heading: every letter gets its own
 * scrap of paper, font, colour and rotation — like it was snipped out of
 * a Tiger Beat issue with craft scissors.
 */
export function CutoutHeading({
  text,
  className = "",
  size = "text-3xl sm:text-5xl",
}: {
  text: string;
  className?: string;
  size?: string;
}) {
  let idx = 0;
  return (
    <h2 className={`flex flex-wrap items-baseline gap-x-0.5 gap-y-2 leading-none ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => {
        if (ch === " ") return <span key={i} className="w-3 sm:w-5" aria-hidden />;
        const j = idx++;
        const rot = ((j * 7919) % 13) - 6;
        return (
          <motion.span
            key={i}
            aria-hidden
            whileHover={{ rotate: 0, scale: 1.2, y: -4 }}
            className={`${FONTS[j % FONTS.length]} ${size} inline-block px-1 sm:px-1.5 py-0.5 border-2 border-black/70 shadow-[2px_3px_0_rgba(61,18,48,0.4)]`}
            style={{
              color: COLORS[j % COLORS.length],
              background: PAPERS[(j * 3) % PAPERS.length],
              rotate: `${rot}deg`,
              borderRadius: j % 3 === 0 ? "2px" : j % 3 === 1 ? "10px 2px 8px 3px" : "3px 9px 2px 8px",
            }}
          >
            {ch}
          </motion.span>
        );
      })}
    </h2>
  );
}
