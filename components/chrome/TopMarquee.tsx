"use client";

import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function TopMarquee() {
  const { chrome } = useSiteContent();
  const line = chrome.marquee.items.join("  ✦  ");
  return (
    <div className="led-strip bg-gradient-to-r from-magenta via-hotpink to-grape text-white overflow-hidden border-b-4 border-white shadow-md relative z-40">
      <div className="marquee-mask py-1.5">
        <div
          className="marquee-track font-pixel text-[10px] sm:text-xs"
          style={{ "--marquee-speed": chrome.marquee.speed } as React.CSSProperties}
        >
          <span className="pr-10">{line}</span>
          <span className="pr-10" aria-hidden>{line}</span>
        </div>
      </div>
    </div>
  );
}
