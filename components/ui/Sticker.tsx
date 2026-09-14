"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** An emoji / text sticker with a white die-cut edge that wiggles on hover. */
export function Sticker({
  children,
  className = "",
  style,
  size = "text-3xl",
  rotate = 0,
  title,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: string;
  rotate?: number;
  title?: string;
}) {
  return (
    <motion.span
      title={title}
      initial={{ rotate }}
      whileHover={{ rotate: rotate + 12, scale: 1.25 }}
      whileTap={{ scale: 0.85 }}
      className={`sticker-cut inline-block select-none ${size} ${className}`}
      style={style}
      aria-hidden
    >
      {children}
    </motion.span>
  );
}

/** A word-sticker like "OMG!" or "cute!!" in a loud pill. */
export function WordSticker({
  text,
  className = "",
  palette = 0,
  rotate = -6,
}: {
  text: string;
  className?: string;
  palette?: number;
  rotate?: number;
}) {
  const palettes = [
    "bg-lemon text-magenta",
    "bg-hotpink text-white",
    "bg-cyanpop text-inkberry",
    "bg-grape text-lemon",
    "bg-tangerine text-white",
    "bg-white text-hotpink",
  ];
  return (
    <motion.span
      initial={{ rotate }}
      whileHover={{ rotate: rotate * -1, scale: 1.18 }}
      className={`font-lucky inline-block px-2.5 py-1 text-sm sm:text-base border-[3px] border-white rounded-xl shadow-[3px_3px_0_rgba(61,18,48,0.45)] tracking-wide select-none ${palettes[palette % palettes.length]} ${className}`}
    >
      {text}
    </motion.span>
  );
}
