import { WordSticker } from "@/components/ui/Sticker";

const BUTTONS = [
  { text: "made with ♡", bg: "linear-gradient(90deg,#ff1f8f,#8a2be2)" },
  { text: "best in IE6 lol", bg: "linear-gradient(90deg,#0a51c2,#00d9ff)" },
  { text: "GIRL POWERED", bg: "linear-gradient(90deg,#e6007e,#ff8a00)" },
  { text: "anti-flat-UI club", bg: "linear-gradient(90deg,#2fe0c8,#0a9396)" },
  { text: "orkut 4eva", bg: "linear-gradient(90deg,#ff77c8,#cfa6ff)" },
  { text: "88x31 gang", bg: "linear-gradient(90deg,#ffe135,#ff8a00)" },
  { text: "no copying!!", bg: "linear-gradient(90deg,#8a2be2,#ff1f8f)" },
  { text: "dial-up warrior", bg: "linear-gradient(90deg,#3d6cb4,#87d4f5)" },
];

/** Footer with the classic 88x31 web-button wall and sign-off. */
export function Footer() {
  return (
    <footer className="relative border-t-4 border-white bg-gradient-to-b from-lilac/70 to-hotpink/50 mt-6 pb-10">
      <div className="max-w-5xl mx-auto px-4 pt-8 text-center">
        <p className="font-marker text-lg text-inkberry mb-4 -rotate-1">~ button wall (collect them all!) ~</p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BUTTONS.map((b) => (
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
          <WordSticker text="xoxo" palette={1} rotate={-8} />
          <p className="font-indie text-base sm:text-lg text-inkberry">
            hand-coded with notepad.exe, glitter &amp; maggi breaks · est. 2007 · last updated: yesterday after school
          </p>
          <WordSticker text="TTYL!" palette={2} rotate={6} />
        </div>

        <p className="font-pixel text-[9px] text-inkberry/80">
          © shankie&apos;s ★ plz don&apos;t steal my graphics, i made them in MS Paint
        </p>
      </div>
    </footer>
  );
}
