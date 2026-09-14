/**
 * A library of hand-drawn-style SVG "photos" used inside polaroids, film
 * strips and photo dumps. Everything is inline SVG so the site is fully
 * self-contained — like clip-art hoarded from a 2007 cyber café session.
 */

export type DoodleKind =
  | "sunset"
  | "chai"
  | "auto"
  | "cassette"
  | "nokia"
  | "bangles"
  | "kulfi"
  | "marigold"
  | "cd"
  | "butterfly"
  | "diary"
  | "radio"
  | "camera"
  | "icecream"
  | "tv"
  | "mixtape-heart"
  | "rain"
  | "kite";

export function DoodlePhoto({ kind, className = "" }: { kind: DoodleKind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${className}`} aria-hidden>
      {ART[kind]}
    </svg>
  );
}

const ART: Record<DoodleKind, React.ReactNode> = {
  sunset: (
    <>
      <rect width="100" height="100" fill="#ffb26b" />
      <rect y="55" width="100" height="45" fill="#ff6b9d" />
      <circle cx="50" cy="55" r="18" fill="#ffe135" stroke="#ff8a00" strokeWidth="2" />
      <path d="M0 60h100M0 70h100M0 80h100" stroke="#c44569" strokeWidth="3" opacity=".5" />
      <path d="M12 40l4-6 4 6zM78 30l5-7 5 7z" fill="#8a2be2" opacity=".6" />
    </>
  ),
  chai: (
    <>
      <rect width="100" height="100" fill="#ffe8f4" />
      <path d="M28 40h40v28a12 12 0 01-12 12H40a12 12 0 01-12-12z" fill="#ffb3c6" stroke="#3d1230" strokeWidth="3" />
      <path d="M68 46h8a8 8 0 010 16h-8" fill="none" stroke="#3d1230" strokeWidth="3" />
      <path d="M38 30c0-5 5-5 5-10M50 30c0-5 5-5 5-10" stroke="#8a2be2" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="48" cy="88" rx="26" ry="4" fill="#e6a4bd" />
      <text x="36" y="66" fontSize="12" fill="#3d1230" fontFamily="cursive">chai</text>
    </>
  ),
  auto: (
    <>
      <rect width="100" height="100" fill="#c9f4ff" />
      <path d="M20 62c0-18 10-30 30-30s30 12 30 30v8H20z" fill="#ffe135" stroke="#3d1230" strokeWidth="3" />
      <path d="M32 40h20v18H28c0-8 1-14 4-18z" fill="#2fe0c8" stroke="#3d1230" strokeWidth="2.5" />
      <circle cx="32" cy="74" r="8" fill="#3d1230" />
      <circle cx="68" cy="74" r="8" fill="#3d1230" />
      <circle cx="32" cy="74" r="3" fill="#fff" />
      <circle cx="68" cy="74" r="3" fill="#fff" />
      <path d="M76 50h6" stroke="#3d1230" strokeWidth="3" strokeLinecap="round" />
      <text x="54" y="56" fontSize="9" fill="#e6007e" fontFamily="cursive">auto!</text>
    </>
  ),
  cassette: (
    <>
      <rect width="100" height="100" fill="#e8dcff" />
      <rect x="14" y="28" width="72" height="46" rx="5" fill="#ff1f8f" stroke="#3d1230" strokeWidth="3" />
      <rect x="22" y="36" width="56" height="16" rx="3" fill="#fff" />
      <circle cx="36" cy="60" r="6" fill="#fff" stroke="#3d1230" strokeWidth="2" />
      <circle cx="64" cy="60" r="6" fill="#fff" stroke="#3d1230" strokeWidth="2" />
      <path d="M42 60h16" stroke="#3d1230" strokeWidth="2" />
      <text x="26" y="47" fontSize="8" fill="#e6007e" fontFamily="cursive">luv songs ♡</text>
    </>
  ),
  nokia: (
    <>
      <rect width="100" height="100" fill="#d4f7dc" />
      <rect x="32" y="12" width="36" height="76" rx="10" fill="#3d6cb4" stroke="#3d1230" strokeWidth="3" />
      <rect x="38" y="22" width="24" height="20" rx="2" fill="#b8f5b1" stroke="#3d1230" strokeWidth="2" />
      <circle cx="50" cy="52" r="4" fill="#ffe135" />
      <g fill="#cfe0ff">
        <rect x="38" y="60" width="7" height="5" rx="1.5" />
        <rect x="47" y="60" width="7" height="5" rx="1.5" />
        <rect x="56" y="60" width="7" height="5" rx="1.5" />
        <rect x="38" y="68" width="7" height="5" rx="1.5" />
        <rect x="47" y="68" width="7" height="5" rx="1.5" />
        <rect x="56" y="68" width="7" height="5" rx="1.5" />
        <rect x="38" y="76" width="7" height="5" rx="1.5" />
        <rect x="47" y="76" width="7" height="5" rx="1.5" />
        <rect x="56" y="76" width="7" height="5" rx="1.5" />
      </g>
      <text x="40" y="34" fontSize="6" fill="#1b4332" fontFamily="monospace">snake ii</text>
    </>
  ),
  bangles: (
    <>
      <rect width="100" height="100" fill="#fff3c4" />
      <circle cx="38" cy="45" r="20" fill="none" stroke="#ff1f8f" strokeWidth="6" />
      <circle cx="55" cy="52" r="20" fill="none" stroke="#8a2be2" strokeWidth="6" />
      <circle cx="47" cy="62" r="20" fill="none" stroke="#00d9ff" strokeWidth="6" />
      <path d="M20 20l3 2M80 26l-3 2M76 78l-2-3" stroke="#ff8a00" strokeWidth="2.5" strokeLinecap="round" />
      <text x="24" y="92" fontSize="9" fill="#e6007e" fontFamily="cursive">churiyaan ✨</text>
    </>
  ),
  kulfi: (
    <>
      <rect width="100" height="100" fill="#ffd9ef" />
      <path d="M40 18h20l-3 46H43z" fill="#ffe8b0" stroke="#3d1230" strokeWidth="3" />
      <path d="M42 30h16M43 42h14" stroke="#e0a458" strokeWidth="2" />
      <rect x="47" y="64" width="6" height="22" rx="3" fill="#b07d48" />
      <circle cx="34" cy="26" r="3" fill="#ff1f8f" />
      <circle cx="70" cy="40" r="2.5" fill="#00d9ff" />
      <text x="24" y="94" fontSize="9" fill="#8a2be2" fontFamily="cursive">matka kulfi!</text>
    </>
  ),
  marigold: (
    <>
      <rect width="100" height="100" fill="#e0f7e9" />
      <g stroke="#c47f00" strokeWidth="1">
        <circle cx="50" cy="46" r="22" fill="#ff8a00" />
        <circle cx="50" cy="46" r="15" fill="#ffb703" />
        <circle cx="50" cy="46" r="8" fill="#ffe135" />
      </g>
      <path d="M50 68c0 12-4 20-10 24M50 68c2 10 8 16 12 18" stroke="#2d6a4f" strokeWidth="3" fill="none" />
      <text x="22" y="20" fontSize="9" fill="#2d6a4f" fontFamily="cursive">genda phool</text>
    </>
  ),
  cd: (
    <>
      <rect width="100" height="100" fill="#dff6ff" />
      <circle cx="50" cy="50" r="34" fill="url(#cdgrad)" stroke="#3d1230" strokeWidth="3" />
      <defs>
        <linearGradient id="cdgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f7ff" />
          <stop offset=".3" stopColor="#ffd1ec" />
          <stop offset=".6" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#d5c4ff" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="8" fill="#fff" stroke="#3d1230" strokeWidth="2" />
      <path d="M28 30l10 12M74 68L62 56" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" />
      <text x="28" y="92" fontSize="8" fill="#e6007e" fontFamily="cursive">burned 4 u ♡</text>
    </>
  ),
  butterfly: (
    <>
      <rect width="100" height="100" fill="#fff0f8" />
      <path d="M50 30c-14-18-34-10-28 6 4 12 18 14 28 12zM50 30c14-18 34-10 28 6-4 12-18 14-28 12z" fill="#cfa6ff" stroke="#8a2be2" strokeWidth="2.5" />
      <path d="M50 48c-12 0-24 6-20 16 3 8 14 8 20 0zM50 48c12 0 24 6 20 16-3 8-14 8-20 0z" fill="#ff77c8" stroke="#e6007e" strokeWidth="2.5" />
      <path d="M50 28v40" stroke="#3d1230" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M47 26c-3-4-6-6-9-7M53 26c3-4 6-6 9-7" stroke="#3d1230" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="34" cy="38" r="2.5" fill="#fff" />
      <circle cx="66" cy="38" r="2.5" fill="#fff" />
    </>
  ),
  diary: (
    <>
      <rect width="100" height="100" fill="#e8f5d0" />
      <rect x="22" y="16" width="56" height="68" rx="4" fill="#ff77c8" stroke="#3d1230" strokeWidth="3" />
      <rect x="22" y="16" width="12" height="68" fill="#e6007e" />
      <rect x="44" y="40" width="26" height="18" rx="3" fill="#ffe135" stroke="#3d1230" strokeWidth="2" />
      <circle cx="57" cy="49" r="3.5" fill="#3d1230" />
      <rect x="55.2" y="49" width="3.6" height="8" fill="#3d1230" />
      <text x="42" y="32" fontSize="8" fill="#fff" fontFamily="cursive">TOP SECRET</text>
    </>
  ),
  radio: (
    <>
      <rect width="100" height="100" fill="#fde2e4" />
      <rect x="16" y="34" width="68" height="42" rx="8" fill="#8a2be2" stroke="#3d1230" strokeWidth="3" />
      <circle cx="34" cy="55" r="11" fill="#ffe135" stroke="#3d1230" strokeWidth="2" />
      <rect x="52" y="44" width="24" height="9" rx="2" fill="#c9f4ff" stroke="#3d1230" strokeWidth="1.5" />
      <path d="M52 62h24M52 68h18" stroke="#ffd1ec" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 34L48 14" stroke="#3d1230" strokeWidth="3" strokeLinecap="round" />
      <text x="26" y="92" fontSize="8" fill="#8a2be2" fontFamily="cursive">vividh bharati</text>
    </>
  ),
  camera: (
    <>
      <rect width="100" height="100" fill="#e2ecff" />
      <rect x="18" y="34" width="64" height="42" rx="8" fill="#ff1f8f" stroke="#3d1230" strokeWidth="3" />
      <circle cx="50" cy="55" r="14" fill="#c9f4ff" stroke="#3d1230" strokeWidth="3" />
      <circle cx="50" cy="55" r="7" fill="#3d6cb4" />
      <circle cx="53" cy="52" r="2" fill="#fff" />
      <rect x="26" y="27" width="16" height="9" rx="3" fill="#ff1f8f" stroke="#3d1230" strokeWidth="2.5" />
      <circle cx="72" cy="42" r="3" fill="#ffe135" />
      <path d="M84 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#ffe135" />
    </>
  ),
  icecream: (
    <>
      <rect width="100" height="100" fill="#fff8de" />
      <path d="M38 46h24L50 88z" fill="#e0a458" stroke="#3d1230" strokeWidth="3" />
      <path d="M40 60h20M44 72h12" stroke="#b07d48" strokeWidth="2" />
      <circle cx="50" cy="36" r="16" fill="#ff77c8" stroke="#3d1230" strokeWidth="3" />
      <circle cx="42" cy="26" r="3" fill="#ffe135" />
      <circle cx="56" cy="22" r="2.5" fill="#00d9ff" />
      <circle cx="60" cy="32" r="2.5" fill="#8a2be2" />
      <text x="18" y="20" fontSize="9" fill="#e6007e" fontFamily="cursive">softy = 5 rs</text>
    </>
  ),
  tv: (
    <>
      <rect width="100" height="100" fill="#ffeccc" />
      <rect x="16" y="30" width="68" height="48" rx="8" fill="#b07d48" stroke="#3d1230" strokeWidth="3" />
      <rect x="24" y="38" width="42" height="32" rx="4" fill="#87d4f5" stroke="#3d1230" strokeWidth="2" />
      <circle cx="75" cy="46" r="4" fill="#ffe135" stroke="#3d1230" strokeWidth="1.5" />
      <circle cx="75" cy="60" r="4" fill="#ff77c8" stroke="#3d1230" strokeWidth="1.5" />
      <path d="M36 30L46 14M56 30l8-14" stroke="#3d1230" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 50c4-6 10-6 13 0 3-6 9-6 13 0" stroke="#0a51c2" strokeWidth="2.5" fill="none" />
      <text x="26" y="92" fontSize="8" fill="#b0651a" fontFamily="cursive">rangoli @ 7am</text>
    </>
  ),
  "mixtape-heart": (
    <>
      <rect width="100" height="100" fill="#ffe0f0" />
      <path d="M50 82C30 66 14 54 16 38c2-14 22-18 34-4 12-14 32-10 34 4 2 16-14 28-34 44z" fill="#ff1f8f" stroke="#3d1230" strokeWidth="3" />
      <circle cx="38" cy="46" r="6" fill="#fff" stroke="#3d1230" strokeWidth="2" />
      <circle cx="62" cy="46" r="6" fill="#fff" stroke="#3d1230" strokeWidth="2" />
      <path d="M44 46h12" stroke="#3d1230" strokeWidth="2" />
      <path d="M22 20l3 2M80 18l-3 3" stroke="#8a2be2" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  rain: (
    <>
      <rect width="100" height="100" fill="#d7e8ff" />
      <path d="M28 40a12 12 0 0110-18 15 15 0 0128 4 11 11 0 016 20H32a12 12 0 01-4-6z" fill="#fff" stroke="#3d1230" strokeWidth="3" />
      <path d="M36 58l-4 10M52 58l-4 10M68 58l-4 10M44 74l-4 10M60 74l-4 10" stroke="#0a51c2" strokeWidth="3" strokeLinecap="round" />
      <text x="22" y="22" fontSize="9" fill="#0a51c2" fontFamily="cursive">1st day of baarish</text>
    </>
  ),
  kite: (
    <>
      <rect width="100" height="100" fill="#cff3ff" />
      <path d="M50 14L78 46 50 70 22 46z" fill="#ff8a00" stroke="#3d1230" strokeWidth="3" />
      <path d="M50 14v56M22 46h56" stroke="#3d1230" strokeWidth="2" opacity=".6" />
      <path d="M50 70c-2 8 4 10 2 16s-8 6-6 12" stroke="#e6007e" strokeWidth="2.5" fill="none" />
      <path d="M14 20l3 2M86 26l-4 2" stroke="#8a2be2" strokeWidth="2.5" strokeLinecap="round" />
      <text x="56" y="90" fontSize="9" fill="#e6007e" fontFamily="cursive">patang!</text>
    </>
  ),
};
