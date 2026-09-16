"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { StickyNote } from "@/components/ui/SpeechBubble";
import { WordSticker } from "@/components/ui/Sticker";

export function SmileNotes() {
  const { girlhood } = useSiteContent();
  const { smileNotes } = girlhood;
  return (
    <section className="relative rotate-[0.3deg]" aria-label="things that made me smile">
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h2 className="font-bangers outline-text text-3xl text-hotpink">{smileNotes.heading}</h2>
        <WordSticker text={smileNotes.sticker} palette={0} rotate={8} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {smileNotes.notes.map((n, i) => (
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
