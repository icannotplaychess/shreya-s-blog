/** Decorative washi/scotch tape strip */
export function Tape({
  className = "",
  color = "rgba(255,255,255,0.55)",
  rotate = 0,
}: {
  className?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={`absolute block w-16 h-6 pointer-events-none ${className}`}
      style={{
        background: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        opacity: 0.85,
      }}
    />
  );
}
