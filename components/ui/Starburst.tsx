/** Tiger Beat / J-14 style starburst badge */
export function Starburst({
  children,
  color = "#ffe135",
  border = "#ff1f8f",
  className = "",
  rotate = 0,
}: {
  children: React.ReactNode;
  color?: string;
  border?: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={`inline-block font-bangers text-sm sm:text-base px-4 py-2 text-center ${className}`}
      style={{
        background: color,
        color: "#4a0e4e",
        border: `3px solid ${border}`,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(2px 3px 0 rgba(0,0,0,0.2))",
      }}
    >
      {children}
    </span>
  );
}
