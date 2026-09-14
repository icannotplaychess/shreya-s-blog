"use client";

import { motion } from "framer-motion";
import { StickyNote } from "@/components/ui/SpeechBubble";
import { WordSticker } from "@/components/ui/Sticker";

const NOTES = [
  { text: "the kulfi wala remembered my order (pista, extra pista)", color: "#ffd1ec", rotate: -3, font: "font-indie" },
  { text: "found ₹10 in my raincoat pocket from LAST monsoon", color: "#fff9ae", rotate: 2, font: "font-marker" },
  { text: "amma sang along to lag jaa gale while making rotis", color: "#c9f4ff", rotate: -1, font: "font-indie" },
  { text: "priya saved me the window seat WITHOUT being asked", color: "#d4f7dc", rotate: 3, font: "font-comic" },
  { text: "new gel pen wrote its first word perfectly (it was 'hello')", color: "#e8dcff", rotate: -2, font: "font-indie" },
  { text: "power cut = whole colony on terraces = impromptu antakshari", color: "#ffe8b0", rotate: 1, font: "font-marker" },
  { text: "dog near the bus stop wagged SPECIFICALLY at me", color: "#ffd1ec", rotate: -4, font: "font-comic" },
  { text: "radio played woh lamhe RIGHT when i turned it on. fate.", color: "#c9f4ff", rotate: 2, font: "font-indie" },
];

/** Wall of tiny handwritten notes: things that made me smile. */
export function SmileNotes() {
  return (
    <section className="relative rotate-[0.3deg]" aria-label="things that made me smile">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-hotpink">things that made me smile</h2>
        <WordSticker text=":') " palette={0} rotate={8} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {NOTES.map((n, i) => (
          <motion.div
            key={n.text}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
          >
            <StickyNote color={n.color} rotate={n.rotate} className="h-full">
              <p className={`${n.font} text-[12px] sm:text-[13px] text-inkberry leading-snug`}>{n.text}</p>
            </StickyNote>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
