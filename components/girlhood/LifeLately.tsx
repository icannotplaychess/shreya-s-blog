"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Polaroid } from "@/components/ui/Polaroid";
import { DoodlePhoto } from "@/components/ui/DoodlePhoto";

export function LifeLately() {
  const { girlhood } = useSiteContent();
  const { lifeLately } = girlhood;
  return (
    <section className="paper-card halftone relative p-4 sm:p-7 rotate-[0.4deg]">
      <span aria-hidden className="washi -top-4 left-8 rotate-[-4deg]" />
      <CutoutHeading text={lifeLately.heading} size="text-2xl sm:text-4xl" className="mb-5" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          {lifeLately.updates.map((u, i) => (
            <motion.div
              key={u.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, rotate: i % 2 ? 1 : -1 }}
              className={`rounded-2xl border-[3px] border-inkberry bg-gradient-to-br ${u.bg} p-4 shadow-[4px_5px_0_rgba(61,18,48,0.3)]`}
            >
              <p className="font-lucky text-base text-inkberry mb-1">{u.tag}</p>
              <p className="font-comic text-[13px] text-inkberry/90 leading-snug">{u.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex lg:flex-col gap-4 justify-center items-center shrink-0">
          {lifeLately.polaroids.map((p, i) => (
            <Polaroid
              key={p.caption}
              photo={<DoodlePhoto kind={p.kind as "sunset" | "chai" | "butterfly"} />}
              caption={p.caption}
              rotate={i % 2 ? 5 : -4}
              className="w-36"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
