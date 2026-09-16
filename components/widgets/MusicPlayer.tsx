"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { resolveMediaUrl } from "@/lib/media-url";
import { DEFAULT_MUSIC_PLAYER_TRACKS, type MusicPlayerTrack } from "@/lib/site-content-defaults";

function midiToFreq(n: number) {
  return 440 * Math.pow(2, (n - 69) / 12);
}

export function MusicPlayer({ className = "" }: { className?: string }) {
  const [tracks, setTracks] = useState<MusicPlayerTrack[]>(DEFAULT_MUSIC_PLAYER_TRACKS);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.musicPlayer?.tracks) && data.musicPlayer.tracks.length > 0) {
          setTracks(data.musicPlayer.tracks);
        }
      })
      .catch(() => {});
  }, []);

  const track = tracks[trackIdx] ?? tracks[0];
  const hasAudio = Boolean(track?.audioUrl);

  useEffect(() => {
    if (!playing || hasAudio) return;
    const ctx = (ctxRef.current ??= new AudioContext());
    void ctx.resume();
    const t = tracks[trackIdx];
    if (!t?.notes?.length) return;

    const id = setInterval(() => {
      const i = stepRef.current % t.notes!.length;
      const note = t.notes![i];
      if (note > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = midiToFreq(note);
        const tempo = t.tempo ?? 200;
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tempo / 1000);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + tempo / 1000 + 0.02);
      }
      stepRef.current = i + 1;
      setStep(i + 1);
    }, t.tempo ?? 200);

    return () => clearInterval(id);
  }, [playing, trackIdx, hasAudio, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;

    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, trackIdx, hasAudio]);

  const selectTrack = (idx: number) => {
    stepRef.current = 0;
    setStep(0);
    setPlaying(false);
    setTrackIdx(idx);
  };

  const changeTrack = (dir: 1 | -1) => {
    selectTrack((trackIdx + dir + tracks.length) % tracks.length);
  };

  const art = track?.art ?? { from: "#ff8a00", to: "#ffe135", emoji: "🎵" };
  const progress = hasAudio
    ? 0
    : track?.notes?.length
      ? (step % track.notes.length) / track.notes.length
      : 0;

  return (
    <div
      className={`rounded-2xl border-[3px] border-inkberry bg-gradient-to-b from-[#2b1d3a] to-[#120a1c] p-3 shadow-[5px_6px_0_rgba(61,18,48,0.45)] ${className}`}
    >
      <p className="font-pixel text-[8px] text-turq mb-2 tracking-wider">
        ♫ SHANKIE&apos;S PROFILE SONG PLAYER v2.0 ♫
      </p>

      {hasAudio && (
        <audio
          ref={audioRef}
          src={resolveMediaUrl(track.audioUrl)}
          onEnded={() => changeTrack(1)}
          className="hidden"
        />
      )}

      <div className="flex gap-3 items-center">
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 3.2, ease: "linear" } : { duration: 0.3 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/70 shadow-lg shrink-0 flex items-center justify-center text-2xl"
          style={{ background: `conic-gradient(from 40deg, ${art.from}, ${art.to}, ${art.from})` }}
          aria-hidden
        >
          <span className="drop-shadow">{art.emoji}</span>
          <span className="absolute w-4 h-4 rounded-full bg-[#120a1c] border-2 border-white/60" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="font-chewy text-base sm:text-lg text-babypink truncate">{track?.title}</p>
          <p className="font-comic text-[11px] text-lilac truncate">
            {track?.artist} · <i>{track?.album}</i>
          </p>

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

          <div className="h-2 mt-1.5 rounded-full bg-white/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-hotpink to-cyanpop transition-[width] duration-150"
              style={{ width: `${Math.max(progress * 100, playing ? 4 : 0)}%` }}
            />
          </div>
        </div>
      </div>

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

      <ul className="mt-3 space-y-0.5 max-h-40 overflow-y-auto">
        {tracks.map((t, i) => (
          <li key={`${t.title}-${i}`}>
            <button
              onClick={() => selectTrack(i)}
              className={`w-full text-left font-comic text-[11px] px-2 py-0.5 rounded ${
                i === trackIdx ? "bg-hotpink/40 text-lemon" : "text-babypink/80 hover:bg-white/10"
              }`}
            >
              {i === trackIdx && playing ? "♪ " : `${i + 1}. `}
              {t.title} — {t.artist}
              {t.audioUrl ? " 🎵" : ""}
            </button>
          </li>
        ))}
      </ul>
      <p className="font-indie text-[10px] text-lilac/70 mt-2 text-center">
        {hasAudio ? "(real MP3 mode!!)" : "(ringtone versions hehe... upload MP3s in admin → site settings)"}
      </p>
    </div>
  );
}
