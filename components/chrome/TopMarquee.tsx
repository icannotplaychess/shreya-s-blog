const ITEMS = [
  "★ welcome 2 shankie's ★",
  "u are visitor no. 000247 !!",
  "plz sign my guestbook b4 u leave",
  "currently obsessed: SRK in DDLJ (again)",
  "new diary entry up!! omg",
  "best viewed in 800x600 hehe",
  "no right-clicking! respect da artist",
  "add me on orkut: shankie_angel_93",
  "brb maggi break 🍜",
  "song of da week: kabhi kabhi aditi ♫",
];

/** The blinking LED news-ticker strip pinned to the very top of every page. */
export function TopMarquee() {
  const line = ITEMS.join("  ✦  ");
  return (
    <div className="led-strip bg-gradient-to-r from-magenta via-hotpink to-grape text-white overflow-hidden border-b-4 border-white shadow-md relative z-40">
      <div className="marquee-mask py-1.5">
        <div className="marquee-track font-pixel text-[10px] sm:text-xs" style={{ "--marquee-speed": "38s" } as React.CSSProperties}>
          <span className="pr-10">{line}</span>
          <span className="pr-10" aria-hidden>
            {line}
          </span>
        </div>
      </div>
    </div>
  );
}
