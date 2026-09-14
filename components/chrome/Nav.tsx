"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const TABS: { href: string; label: string; icon: string }[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/diary", label: "Diary", icon: "📔" },
  { href: "/photo-dump", label: "Photo Dump", icon: "📸" },
  { href: "/playlists", label: "Playlists", icon: "🎧" },
  { href: "/quizzes", label: "Quizzes", icon: "❓" },
  { href: "/style", label: "Style Files", icon: "👛" },
  { href: "/girlhood", label: "Girlhood", icon: "🎀" },
  { href: "/collections", label: "Collections", icon: "🍬" },
  { href: "/guestbook", label: "Guestbook", icon: "✍️" },
  { href: "/about", label: "About Me", icon: "💖" },
];

const TAB_COLORS = [
  "from-hotpink to-magenta",
  "from-tangerine to-hotpink",
  "from-lemon to-tangerine",
  "from-turq to-cyanpop",
  "from-cyanpop to-grape",
  "from-lilac to-grape",
  "from-bubblegum to-lilac",
  "from-magenta to-grape",
  "from-turq to-lemon",
  "from-hotpink to-lilac",
];

/** MySpace-style chunky gradient tab bar, wraps on small screens. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 border-b-4 border-white bg-gradient-to-r from-babypink/95 via-lilac/90 to-babypink/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        {/* mobile toggle */}
        <div className="flex sm:hidden items-center justify-between py-2">
          <Link href="/" className="font-pacifico text-xl text-magenta bubble-shadow">
            Shankie&apos;s ✿
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="glossy bg-gradient-to-b from-hotpink to-magenta text-white font-lucky px-4 py-1.5 text-sm"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? "close ✖" : "menu ☰"}
          </button>
        </div>

        <ul
          className={`${open ? "flex" : "hidden"} sm:flex flex-wrap justify-center gap-1.5 sm:gap-2 py-2`}
        >
          {TABS.map((tab, i) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href}>
                <motion.div whileHover={{ y: -3, rotate: i % 2 ? 2 : -2 }} whileTap={{ scale: 0.93 }}>
                  <Link
                    href={tab.href}
                    onClick={() => setOpen(false)}
                    className={`glossy inline-flex items-center gap-1 px-3 py-1.5 font-lucky text-[11px] sm:text-xs tracking-wide bg-gradient-to-b ${TAB_COLORS[i % TAB_COLORS.length]} ${
                      active ? "text-lemon ring-4 ring-lemon/80 scale-105" : "text-white"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <span aria-hidden>{tab.icon}</span>
                    {tab.label}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
