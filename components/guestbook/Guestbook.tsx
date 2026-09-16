"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { WordSticker } from "@/components/ui/Sticker";

interface Entry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export function Guestbook() {
  const { guestbook } = useSiteContent();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState(guestbook.moods[0] ?? "💖");
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const res = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), message: `${mood} ${message.trim()}` }),
    });
    if (res.ok) {
      const entry = await res.json();
      setEntries((prev) => [entry, ...prev]);
      setName("");
      setMessage("");
      setSigned(true);
      setTimeout(() => setSigned(false), 3200);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={submit} className="paper-card p-5 sm:p-6 mb-8 -rotate-[0.3deg] space-y-4">
        <h2 className="font-bangers text-2xl text-hotpink outline-text">{guestbook.formTitle}</h2>
        <div>
          <label className="font-comic text-sm text-inkberry block mb-1">{guestbook.nameLabel}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={guestbook.namePlaceholder} className="w-full px-3 py-2 border-3 border-hotpink rounded-lg font-comic text-sm bg-white/90" maxLength={80} />
        </div>
        <div>
          <label className="font-comic text-sm text-inkberry block mb-1">{guestbook.moodLabel}</label>
          <div className="flex flex-wrap gap-2">
            {guestbook.moods.map((m) => (
              <button key={m} type="button" onClick={() => setMood(m)} className={`text-xl p-1 rounded-lg border-2 ${mood === m ? "border-hotpink bg-babypink scale-110" : "border-transparent"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="font-comic text-sm text-inkberry block mb-1">{guestbook.messageLabel}</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder={guestbook.messagePlaceholder} className="w-full px-3 py-2 border-3 border-hotpink rounded-lg font-comic text-sm bg-white/90 resize-none" maxLength={1000} />
        </div>
        <button type="submit" className="glossy px-6 py-2 font-lucky text-white bg-gradient-to-b from-hotpink to-magenta">
          {guestbook.submitText}
        </button>
        <AnimatePresence>
          {signed && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-chewy text-magenta">
              {guestbook.successText}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
      <div className="space-y-4">
        <h2 className="font-bangers text-xl text-grape text-center mb-4">{guestbook.listHeading}</h2>
        {loading ? (
          <p className="font-comic text-center text-inkberry/60">{guestbook.loadingText}</p>
        ) : entries.length === 0 ? (
          <p className="font-comic text-center text-inkberry/60">{guestbook.emptyText}</p>
        ) : (
          entries.map((entry, i) => (
            <motion.article key={entry.id} initial={{ opacity: 0, x: i % 2 ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={`paper-card p-4 sm:p-5 ${i % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-chewy text-lg text-magenta">{entry.name}</p>
                <WordSticker text={new Date(entry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} palette={i % 5} rotate={i % 2 ? 3 : -3} />
              </div>
              <p className="font-comic text-sm text-inkberry leading-relaxed">{entry.message}</p>
            </motion.article>
          ))
        )}
      </div>
    </div>
  );
}
