"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A polaroid frame. `photo` is any ReactNode (we use hand-drawn SVG "photos"
 * so the site stays fully self-contained, like clip-art someone saved from
 * a 2007 internet café session).
 */
export function Polaroid({
  photo,
  caption,
  rotate = -3,
  className = "",
  onClick,
  tape = true,
}: {
  photo: ReactNode;
  caption: string;
  rotate?: number;
  className?: string;
  onClick?: () => void;
  tape?: boolean;
}) {
  return (
    <motion.figure
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
      whileTap={{ scale: 0.96 }}
      className={`polaroid relative inline-block ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ rotate: `${rotate}deg` }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
    >
      {tape && <span aria-hidden className="washi washi-lilac !w-20 !h-6 -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" />}
      <div className="overflow-hidden bg-babypink w-full aspect-square flex items-center justify-center">
        {photo}
      </div>
      <figcaption className="font-indie text-center text-sm sm:text-base pt-2 text-inkberry">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
