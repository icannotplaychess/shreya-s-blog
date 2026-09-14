"use client";

import { useEffect, useState } from "react";

/** Fake dial-up loading bar that chugs to 99% and gets stuck (as tradition demands). */
export function LoadingBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        if (p >= 99) return 99;
        const jump = p < 60 ? 7 : p < 90 ? 3 : 1;
        return Math.min(p + Math.ceil(Math.random() * jump), 99);
      });
    }, 240);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between font-pixel text-[8px] text-inkberry mb-1">
        <span>loading glitter...</span>
        <span>{pct}%</span>
      </div>
      <div className="h-4 rounded border-2 border-inkberry bg-white/80 p-[2px]">
        <div
          className="h-full rounded-sm transition-[width] duration-200"
          style={{
            width: `${pct}%`,
            background: "repeating-linear-gradient(90deg,#0a51c2 0 8px,#3f8cf3 8px 16px)",
          }}
        />
      </div>
      <p className="font-indie text-[10px] text-inkberry/70 mt-0.5 text-center">
        (stuck at 99% since 2007. do not refresh.)
      </p>
    </div>
  );
}
