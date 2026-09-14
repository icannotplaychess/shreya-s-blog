"use client";

import { useEffect, useRef } from "react";
import { useSiteSettings } from "@/components/providers/SiteSettings";

const GLYPHS = ["✦", "✧", "★", "♡", "🦋", "✿", "･ﾟ", "❀", "💗", "⭐"];
const COLORS = ["#ff1f8f", "#00d9ff", "#ffe135", "#cfa6ff", "#ff8a00", "#2fe0c8"];

/**
 * Classic 2000s "sparkle trail" cursor effect: tiny stars, hearts and
 * butterflies spawn under the mouse and drift away. Honours the FX toggle
 * and prefers-reduced-motion.
 */
export function SparkleTrail() {
  const { fxEnabled } = useSiteSettings();
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (!fxEnabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spawn = (x: number, y: number) => {
      const el = document.createElement("span");
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      const size = 10 + Math.random() * 12;
      const drift = (Math.random() - 0.5) * 60;
      el.style.cssText = [
        "position:fixed",
        `left:${x}px`,
        `top:${y}px`,
        `font-size:${size}px`,
        `color:${COLORS[Math.floor(Math.random() * COLORS.length)]}`,
        "pointer-events:none",
        "z-index:9999",
        "user-select:none",
        "will-change:transform,opacity",
        "text-shadow:0 0 6px rgba(255,255,255,.9)",
      ].join(";");
      document.body.appendChild(el);
      const anim = el.animate(
        [
          { transform: "translate(-50%,-50%) scale(1) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${drift}px), calc(-50% - ${40 + Math.random() * 50}px)) scale(0.2) rotate(${(Math.random() - 0.5) * 220}deg)`,
            opacity: 0,
          },
        ],
        { duration: 750 + Math.random() * 550, easing: "ease-out" }
      );
      anim.onfinish = () => el.remove();
    };

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 45) return;
      lastSpawn.current = now;
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [fxEnabled]);

  return null;
}
