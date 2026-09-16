"use client";

import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { WordSticker } from "@/components/ui/Sticker";

export function Footer() {
  const { chrome } = useSiteContent();
  const { footer } = chrome;
  return (
    <footer className="relative border-t-4 border-white bg-gradient-to-b from-lilac/70 to-hotpink/50 mt-6 pb-10">
      <div className="max-w-5xl mx-auto px-4 pt-8 text-center">
        <p className="font-marker text-lg text-inkberry mb-4 -rotate-1">{footer.buttonWallTitle}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {footer.buttons.map((b) => (
            <span
              key={b.text}
              className="inline-flex items-center justify-center w-[88px] h-[31px] font-pixel text-[7px] text-white border-2 border-white shadow-[2px_2px_0_rgba(61,18,48,0.5)] select-none hover:-translate-y-1 transition-transform"
              style={{ background: b.bg }}
            >
              {b.text}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
          <WordSticker text={footer.stickerLeft} palette={1} rotate={-8} />
          <p className="font-indie text-base sm:text-lg text-inkberry">{footer.signoff}</p>
          <WordSticker text={footer.stickerRight} palette={2} rotate={6} />
        </div>
        <p className="font-pixel text-[9px] text-inkberry/80">{footer.copyright}</p>
      </div>
    </footer>
  );
}
