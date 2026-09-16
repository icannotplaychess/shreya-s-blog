"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function WidgetWindow({
  title,
  children,
  className = "",
  rotate = 0,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.section
      initial={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      className={`xp-window ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="xp-titlebar">
        <span className="font-fredoka text-xs sm:text-sm font-semibold drop-shadow">{title}</span>
        <span className="flex gap-1" aria-hidden>
          <span className="w-4 h-4 rounded bg-[#7aa8ef] border border-white/70 text-[9px] leading-3 text-center text-white">_</span>
          <span className="w-4 h-4 rounded bg-[#e8623d] border border-white/70 text-[9px] leading-3 text-center text-white">✕</span>
        </span>
      </div>
      <div className="p-3">{children}</div>
    </motion.section>
  );
}

export function DigitalClock() {
  const { sidebar } = useSiteContent();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setNow(new Date());
    const raf = requestAnimationFrame(update);
    const id = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const t = now
    ? now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    : "--:--:--";
  return (
    <WidgetWindow title={sidebar.clock.title} rotate={-1}>
      <div className="bg-[#1a2a12] rounded-md border-2 border-[#3d5233] px-2 py-2 text-center">
        <span className="font-pixel text-[13px] text-[#9dff5e] [text-shadow:0_0_8px_#9dff5e]">{t}</span>
      </div>
      <p className="font-indie text-xs text-center mt-1.5 text-inkberry">{sidebar.clock.timezoneLabel}</p>
    </WidgetWindow>
  );
}

export function VisitorCounter() {
  const { sidebar } = useSiteContent();
  const [count, setCount] = useState(sidebar.visitor.startCount);
  useEffect(() => {
    setCount(sidebar.visitor.startCount);
  }, [sidebar.visitor.startCount]);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + (Math.random() < 0.4 ? 1 : 0)), 2600);
    return () => clearInterval(id);
  }, []);
  const digits = String(count).padStart(6, "0").split("");
  const message = sidebar.visitor.message.replace("{count}", String(count));
  return (
    <WidgetWindow title={sidebar.visitor.title} rotate={1}>
      <div className="flex justify-center gap-0.5">
        {digits.map((d, i) => (
          <span
            key={i}
            className="font-pixel text-sm text-lemon bg-black border border-[#555] px-1.5 py-1.5 [text-shadow:0_0_6px_#ffe135]"
          >
            {d}
          </span>
        ))}
      </div>
      <p className="font-indie text-xs text-center mt-1.5 text-inkberry">
        {message} <span className="anim-blink text-hotpink">♥</span>
      </p>
    </WidgetWindow>
  );
}

export function StatusMood({ mood }: { mood?: string }) {
  const { sidebar } = useSiteContent();
  const displayMood = mood || sidebar.status.moodFallback;
  return (
    <WidgetWindow title={sidebar.status.title} rotate={-1.5}>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-3 h-3 rounded-full bg-[#2ecc40] anim-softblink shadow-[0_0_6px_#2ecc40]" aria-hidden />
        <span className="font-fredoka text-sm font-semibold text-[#1b7a2e]">{sidebar.status.onlineText}</span>
      </div>
      <ul className="font-comic text-[13px] space-y-1 text-inkberry">
        <li><b className="text-magenta">mood:</b> {displayMood}</li>
        <li><b className="text-grape">fav song:</b> {sidebar.status.favSong}</li>
        <li><b className="text-[#0a51c2]">status msg:</b> <span className="font-indie">{sidebar.status.statusMsg}</span></li>
        <li><b className="text-tangerine">last updated:</b> {sidebar.status.lastUpdated}</li>
      </ul>
    </WidgetWindow>
  );
}

export function QuoteOfTheDay({ quote }: { quote?: string }) {
  const { sidebar } = useSiteContent();
  const displayQuote = quote || sidebar.quote.fallback;
  return (
    <WidgetWindow title={sidebar.quote.title} rotate={1.5}>
      <div className="lined-paper rounded-md border border-babypink p-3 pl-6">
        <p className="font-indie text-sm text-inkberry leading-snug">&ldquo;{displayQuote}&rdquo; 💗</p>
        <p className="font-comic text-[11px] text-right text-magenta mt-1">{sidebar.quote.attribution}</p>
      </div>
    </WidgetWindow>
  );
}

export function PixelPet() {
  const { sidebar } = useSiteContent();
  const [fed, setFed] = useState(0);
  const [bounce, setBounce] = useState(false);
  const feed = () => {
    setFed((f) => f + 1);
    setBounce(true);
    setTimeout(() => setBounce(false), 700);
  };
  const face = fed === 0 ? "(・_・)" : fed < 3 ? "(＾▽＾)" : fed < 6 ? "(≧◡≦)" : "(￣﹃￣)";
  const statusMsg = fed === 0 ? sidebar.pixelPet.hungryMsg : fed < 6 ? sidebar.pixelPet.fedMsg.replace("{count}", String(fed)) : sidebar.pixelPet.fullMsg;
  return (
    <WidgetWindow title={sidebar.pixelPet.title} rotate={-1}>
      <div className="bg-gradient-to-b from-[#d8f8ff] to-[#a8e6ff] rounded-md border-2 border-[#5599cc] p-3 text-center">
        <motion.div
          animate={bounce ? { y: [0, -12, 0], rotate: [0, -8, 8, 0] } : { y: [0, -3, 0] }}
          transition={bounce ? { duration: 0.6 } : { duration: 2, repeat: Infinity }}
          className="text-2xl font-pixel select-none"
          aria-label={`pixel pet ${sidebar.pixelPet.name}`}
        >
          🐹
        </motion.div>
        <p className="font-pixel text-[9px] mt-1 text-[#20536e]">{face}</p>
        <button
          onClick={feed}
          className="glossy mt-2 px-3 py-1 font-lucky text-[10px] text-white bg-gradient-to-b from-tangerine to-[#e05c00]"
        >
          {sidebar.pixelPet.feedButton}
        </button>
        <p className="font-indie text-[11px] mt-1 text-[#20536e]">{statusMsg}</p>
      </div>
    </WidgetWindow>
  );
}

export function WeatherWidget() {
  const { sidebar } = useSiteContent();
  return (
    <WidgetWindow title={sidebar.weather.title} rotate={1}>
      <div className="flex items-center gap-3">
        <span className="text-4xl anim-floaty" aria-hidden>🌤️</span>
        <div>
          <p className="font-lucky text-xl text-tangerine">{sidebar.weather.temp}</p>
          <p className="font-comic text-xs text-inkberry">{sidebar.weather.description}</p>
        </div>
      </div>
      <div className="mt-2 flex justify-between font-pixel text-[8px] text-inkberry/80">
        {sidebar.weather.forecast.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </WidgetWindow>
  );
}

export function CalendarWidget() {
  const { sidebar } = useSiteContent();
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const { specialDay, heartDay } = sidebar.calendar;
  return (
    <WidgetWindow title={sidebar.calendar.title} rotate={-1.5}>
      <table className="w-full text-center font-fredoka text-[11px]">
        <thead>
          <tr>
            {days.map((d, i) => (
              <th key={i} className="text-magenta pb-1">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4].map((w) => (
            <tr key={w}>
              {days.map((_, d) => {
                const n = w * 7 + d;
                const day = n + 1;
                if (day > 31) return <td key={d} />;
                const special = day === specialDay;
                const heart = day === heartDay;
                return (
                  <td key={d} className="py-0.5">
                    <span
                      className={`inline-block w-5 h-5 leading-5 rounded-full ${
                        special ? "bg-hotpink text-white font-bold ring-2 ring-lemon" : heart ? "bg-lilac text-white" : "text-inkberry"
                      }`}
                    >
                      {day}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-indie text-[11px] text-center text-magenta mt-1">{sidebar.calendar.footerNote}</p>
    </WidgetWindow>
  );
}

export function BlinkieWall() {
  const { sidebar } = useSiteContent();
  return (
    <WidgetWindow title={sidebar.blinkies.title} rotate={1}>
      <div className="flex flex-col gap-1.5 items-center">
        {sidebar.blinkies.items.map((b, i) => (
          <span
            key={b.text}
            className={`w-full max-w-[210px] text-center font-pixel text-[8px] text-white py-1.5 border-2 border-white shadow-[2px_2px_0_rgba(61,18,48,0.4)] ${i % 2 ? "anim-softblink" : ""}`}
            style={{ background: b.bg }}
          >
            {b.text}
          </span>
        ))}
      </div>
    </WidgetWindow>
  );
}

export function BestFriends() {
  const { sidebar } = useSiteContent();
  return (
    <WidgetWindow title={sidebar.bestFriends.title} rotate={-1}>
      <div className="grid grid-cols-2 gap-2">
        {sidebar.bestFriends.friends.map((f) => (
          <motion.div
            key={f.name}
            whileHover={{ scale: 1.06, rotate: -2 }}
            className="bg-white/80 rounded-lg border-2 border-bubblegum p-2 text-center"
          >
            <span className="text-2xl" aria-hidden>{f.emoji}</span>
            <p className="font-chewy text-sm text-magenta">{f.name}</p>
            <p className="font-indie text-[10px] text-inkberry">{f.note}</p>
          </motion.div>
        ))}
      </div>
    </WidgetWindow>
  );
}

export function ObsessionWishlist({ obsession }: { obsession?: string }) {
  const { sidebar } = useSiteContent();
  const displayObsession = obsession || sidebar.obsession.fallback;
  return (
    <WidgetWindow title={sidebar.obsession.title} rotate={1.5}>
      <div className="checker rounded-lg p-0.5">
        <div className="bg-white/90 rounded-md p-2.5">
          <p className="font-marker text-sm text-hotpink">{displayObsession}</p>
          <hr className="my-2 border-dashed border-bubblegum" />
          <p className="font-lucky text-[11px] text-grape mb-1">WISHLIST ✩</p>
          <ul className="font-comic text-[12px] text-inkberry space-y-0.5 list-none">
            {sidebar.obsession.wishlist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </WidgetWindow>
  );
}
