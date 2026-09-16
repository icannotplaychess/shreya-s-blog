"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

export function BucketList() {
  const { girlhood } = useSiteContent();
  const { bucketList } = girlhood;
  const [checked, setChecked] = useState<boolean[]>(bucketList.items.map((i) => i.done));
  useEffect(() => {
    setChecked(bucketList.items.map((i) => i.done));
  }, [bucketList.items]);
  const doneCount = checked.filter(Boolean).length;

  return (
    <section className="paper-card relative p-4 sm:p-7 -rotate-[0.4deg]">
      <span aria-hidden className="washi washi-candy -top-4 right-12 rotate-[5deg]" />
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <CutoutHeading text={bucketList.heading} size="text-2xl sm:text-4xl" />
        <WordSticker text={`${doneCount}/${bucketList.items.length} done!!`} palette={2} rotate={-5} />
      </div>
      <p className="font-indie text-sm text-inkberry/80 mb-5">{bucketList.intro}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {bucketList.items.map((item, i) => (
          <li key={item.text}>
            <motion.button
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              className={`w-full flex items-start gap-2.5 text-left px-3 py-2 rounded-xl border-2 border-dashed transition-colors ${
                checked[i] ? "border-turq bg-turq/15" : "border-bubblegum bg-white/70"
              }`}
              aria-pressed={checked[i]}
            >
              <motion.span animate={checked[i] ? { rotate: [0, -15, 10, 0], scale: [1, 1.4, 1] } : {}} className="text-xl shrink-0 select-none" aria-hidden>
                {checked[i] ? "✅" : "⬜"}
              </motion.span>
              <span className={`font-comic text-[13px] sm:text-sm leading-snug ${checked[i] ? "line-through decoration-hotpink decoration-2 text-inkberry/60" : "text-inkberry"}`}>
                {item.text}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>
    </section>
  );
}
