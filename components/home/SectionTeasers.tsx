"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { resolveMediaUrl } from "@/lib/media-url";

export function SectionTeasers() {
  const { teasers } = useSiteContent();
  return (
    <section aria-label="site sections">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {teasers.map((t, i) => (
          <motion.div
            key={t.href}
            initial={{ opacity: 0, y: 24, rotate: t.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
            style={{ rotate: `${t.rotate}deg` }}
          >
            <Link
              href={t.href}
              className={`relative block h-full rounded-2xl border-[3px] border-inkberry bg-gradient-to-br ${t.bg} p-4 shadow-[5px_6px_0_rgba(61,18,48,0.35)]`}
            >
              <span aria-hidden className="absolute -top-3 -right-2 rotate-12 font-marker text-xs bg-lemon border-2 border-inkberry rounded-full px-2 py-0.5 shadow">
                {t.tag}
              </span>
              {t.imageUrl ? (
                <img src={resolveMediaUrl(t.imageUrl)} alt="" className="w-full h-20 object-cover rounded-lg mb-2 border-2 border-white/80" />
              ) : (
                <span className="text-4xl block mb-1" aria-hidden>{t.emoji}</span>
              )}
              <h3 className="font-lucky text-xl text-inkberry bubble-shadow mb-1">{t.title}</h3>
              <p className="font-comic text-[13px] text-inkberry/90 leading-snug">{t.blurb}</p>
              <p className="font-indie text-xs text-magenta mt-2">click me!! →</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
