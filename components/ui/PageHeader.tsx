import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { WordSticker } from "@/components/ui/Sticker";

/** Shared magazine-style page header for the inner sections. */
export function PageHeader({
  title,
  subtitle,
  stickers = [],
}: {
  title: string;
  subtitle: string;
  stickers?: { text: string; palette?: number; rotate?: number }[];
}) {
  return (
    <header className="pt-8 pb-6 text-center">
      <div className="flex justify-center mb-2">
        <CutoutHeading text={title} className="justify-center" />
      </div>
      <p className="font-indie text-base sm:text-lg text-inkberry/90 max-w-xl mx-auto">{subtitle}</p>
      {stickers.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
          {stickers.map((s) => (
            <WordSticker key={s.text} text={s.text} palette={s.palette} rotate={s.rotate} />
          ))}
        </div>
      )}
    </header>
  );
}
