import type { ReactNode } from "react";

/** Comic-book speech bubble with a tail. */
export function SpeechBubble({
  children,
  className = "",
  color = "#fff",
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`bubble-tail relative rounded-[24px] border-[3px] border-inkberry px-4 py-3 shadow-[4px_5px_0_rgba(61,18,48,0.3)] ${className}`}
      style={{ background: color, borderTopColor: color, rotate: `${rotate}deg` }}
    >
      {children}
    </div>
  );
}

/** A sticky note square, slightly rotated. */
export function StickyNote({
  children,
  className = "",
  color = "#fff9ae",
  rotate = -2,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`relative p-4 shadow-[3px_5px_10px_rgba(61,18,48,0.28)] ${className}`}
      style={{
        background: `linear-gradient(160deg, ${color}, ${color} 82%, rgba(0,0,0,0.09))`,
        rotate: `${rotate}deg`,
      }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 opacity-80 rotate-[-2deg]"
        style={{ background: "rgba(255,255,255,0.65)", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
      />
      {children}
    </div>
  );
}
