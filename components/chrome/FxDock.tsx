"use client";

import { motion } from "framer-motion";
import { useSiteSettings } from "@/components/providers/SiteSettings";

/** Floating dock with the sparkle-FX toggle and the XP "night theme" switch. */
export function FxDock() {
  const { fxEnabled, theme, toggleFx, toggleTheme } = useSiteSettings();

  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col gap-2 items-end">
      <motion.button
        whileHover={{ scale: 1.08, rotate: -3 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleFx}
        className="glossy px-3 py-1.5 font-lucky text-[11px] text-white bg-gradient-to-b from-hotpink to-magenta"
        title="toggle sparkle cursor effects"
      >
        {fxEnabled ? "✨ sparkles: ON" : "sparkles: off :("}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        className="glossy px-3 py-1.5 font-lucky text-[11px] text-white bg-gradient-to-b from-[#3f8cf3] to-[#0a51c2]"
        title="switch to windows xp night theme"
      >
        {theme === "day" ? "🌙 XP night mode" : "🌞 day mode"}
      </motion.button>
    </div>
  );
}
