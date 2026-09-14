"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MySpace-profile-song style player. Autoplay is OFF — pressing play
 * synthesizes a lo-fi chiptune rendition of each "song" with WebAudio,
 * like a polyphonic Nokia ringtone version of the track.
 */

interface Track {
  title: string;
  artist: string;
  album: string;
  /** MIDI-ish note numbers (0 = rest) forming a loopable ringtone melody. */
  notes: number[];
  tempo: number;
  art: { from: string; to: string; emoji: string };
}

const TRACKS: Track[] = [
  {
    title: "Kabhi Kabhi Aditi",
    artist: "Rashid Ali",
    album: "Jaane Tu... Ya Jaane Na",
    notes: [64, 66, 67, 66, 64, 0, 62, 64, 66, 64, 62, 0, 60, 62, 64, 67, 66, 64, 62, 60],
    tempo: 200,
    art: { from: "#ff8a00", to: "#ffe135", emoji: "🌻" },
  },
  {
    title: "Woh Lamhe",
    artist: "Atif Aslam",
    album: "Zeher",
    notes: [57, 60, 62, 64, 62, 60, 57, 0, 55, 57, 60, 62, 60, 57, 55, 0],
    tempo: 260,
    art: { from: "#8a2be2", to: "#00d9ff", emoji: "🌙" },
  },
  {
    title: "Complicated",
    artist: "Avril Lavigne",
    album: "Let Go",
    notes: [67, 67, 66, 64, 0, 64, 66, 67, 71, 69, 67, 0, 66, 64, 62, 64],
    tempo: 210,
    art: { from: "#ff1f8f", to: "#3d1230", emoji: "🎸" },
  },
  {
    title: "Dhoom Machale",
    artist: "Sunidhi Chauhan",
    album: "Dhoom",
    notes: [62, 62, 65, 62, 67, 65, 62, 0, 62, 62, 65, 62, 69, 67, 65, 0],
    tempo: 170,
    art: { from: "#00d9ff", to: "#2fe0c8", emoji: "🏍️" },
  },
  {
    title: "It's My Life",
    artist: "Bon Jovi",
    album: "Crush (burned CD)",
    notes: [55, 55, 57, 55, 58, 57, 55, 53, 55, 0, 55, 57, 58, 60, 58, 57],
    tempo: 190,
    art: { from: "#ffe135", to: "#ff8a00", emoji: "🤘" },
  },
];

function midiToFreq(n: number) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

export function MusicPlayer({ className = "" }: { className?: string }) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const stepRef = useRef(0);

  const track = TRACKS[trackIdx];

  // The sequencer lives entirely in this effect: while `playing`, tick an
  // interval that beeps the current note and advances the step counter.
  useEffect(() => {
    if (!playing) return;
    const ctx = (ctxRef.current ??= new AudioContext());
    void ctx.resume();
    const t = TRACKS[trackIdx];
    const id = setInterval(() => {
      const i = stepRef.current % t.notes.length;
      const note = t.notes[i];
      if (note > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = midiToFreq(note);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t.tempo / 1000);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + t.tempo / 1000 + 0.02);
      }
      stepRef.current = i + 1;
      setStep(i + 1);
    }, t.tempo);
    return () => clearInterval(id);
  }, [playing, trackIdx]);

  const selectTrack = (idx: number) => {
    stepRef.current = 0;
    setStep(0);
    setTrackIdx(idx);
  };

  const changeTrack = (dir: 1 | -1) => {
    selectTrack((trackIdx + dir + TRACKS.length) % TRACKS.length);
  };

  const progress = (step % track.notes.length) / track.notes.length;

  return (
    <div
      className={`rounded-2xl border-[3px] border-inkberry bg-gradient-to-b from-[#2b1d3a] to-[#120a1c] p-3 shadow-[5px_6px_0_rgba(61,18,48,0.45)] ${className}`}
    >
      <p className="font-pixel text-[8px] text-turq mb-2 tracking-wider">
        ♫ SHANKIE&apos;S PROFILE SONG PLAYER v2.0 ♫
      </p>

      <div className="flex gap-3 items-center">
        {/* album art */}
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 3.2, ease: "linear" } : { duration: 0.3 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/70 shadow-lg shrink-0 flex items-center justify-center text-2xl"
          style={{ background: `conic-gradient(from 40deg, ${track.art.from}, ${track.art.to}, ${track.art.from})` }}
          aria-hidden
        >
          <span className="drop-shadow">{track.art.emoji}</span>
          <span className="absolute w-4 h-4 rounded-full bg-[#120a1c] border-2 border-white/60" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="font-chewy text-base sm:text-lg text-babypink truncate">{track.title}</p>
          <p className="font-comic text-[11px] text-lilac truncate">
            {track.artist} · <i>{track.album}</i>
          </p>

          {/* winamp-ish visualizer */}
          <div className="flex items-end gap-[3px] h-6 mt-1.5" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={i}
                animate={
                  playing
                    ? { height: [4, 6 + ((i * 7 + step * 5) % 18), 4] }
                    : { height: 4 }
                }
                transition={{ duration: 0.4, repeat: playing ? Infinity : 0, delay: i * 0.04 }}
                className="w-[5px] rounded-sm bg-gradient-to-t from-turq via-lemon to-hotpink"
              />
            ))}
          </div>

          {/* progress */}
          <div className="h-2 mt-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-hotpink to-cyanpop transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, playing ? 4 : 0)}%` }}
            />
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <button onClick={() => changeTrack(-1)} className="glossy px-3 py-1 text-white font-lucky text-xs bg-gradient-to-b from-grape to-[#5a1e96]" aria-label="previous track">
          ⏮
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="glossy px-5 py-1.5 text-white font-lucky text-sm bg-gradient-to-b from-hotpink to-magenta"
          aria-label={playing ? "pause" : "play"}
        >
          {playing ? "⏸ pause" : "▶ play"}
        </button>
        <button onClick={() => changeTrack(1)} className="glossy px-3 py-1 text-white font-lucky text-xs bg-gradient-to-b from-grape to-[#5a1e96]" aria-label="next track">
          ⏭
        </button>
      </div>

      {/* playlist */}
      <ul className="mt-3 space-y-0.5">
        {TRACKS.map((t, i) => (
          <li key={t.title}>
            <button
              onClick={() => selectTrack(i)}
              className={`w-full text-left font-comic text-[11px] px-2 py-0.5 rounded ${
                i === trackIdx ? "bg-hotpink/40 text-lemon" : "text-babypink/80 hover:bg-white/10"
              }`}
            >
              {i === trackIdx && playing ? "♪ " : `${i + 1}. `}
              {t.title} — {t.artist}
            </button>
          </li>
        ))}
      </ul>
      <p className="font-indie text-[10px] text-lilac/70 mt-2 text-center">
        (ringtone versions hehe... autoplay is off bc i&apos;m polite)
      </p>
    </div>
  );
}
