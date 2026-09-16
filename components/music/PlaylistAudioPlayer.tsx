"use client";

import { resolveMediaUrl } from "@/lib/media-url";
import type { PlaylistTrackItem } from "@/lib/site-content-defaults";

export function PlaylistAudioPlayer({
  title,
  artist,
  tracks,
  coverUrl,
  mood,
}: {
  title: string;
  artist?: string;
  tracks: PlaylistTrackItem[];
  coverUrl?: string | null;
  mood?: string;
}) {
  if (tracks.length === 0) return null;

  return (
    <article className="paper-card p-6 sm:p-8 -rotate-[0.3deg]">
      <div className="flex items-start gap-6 mb-6">
        {coverUrl && (
          <div className="shrink-0 w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg -rotate-3">
            <img src={resolveMediaUrl(coverUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <h2 className="font-bangers outline-text text-3xl sm:text-4xl text-hotpink">{title}</h2>
          {artist && <p className="font-chewy text-xl text-grape mt-1">{artist}</p>}
          {mood && <p className="font-comic text-sm text-grape/80 mt-2">{mood}</p>}
        </div>
      </div>

      <div className="space-y-4">
        {tracks.map((track, i) => (
          <div
            key={`${track.title}-${i}`}
            className="rounded-xl border-2 border-white bg-gradient-to-r from-[#2b1d3a] to-[#120a1c] p-4 shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="font-pixel text-[10px] text-turq">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <p className="font-chewy text-base text-babypink truncate">{track.title}</p>
                {track.artist && (
                  <p className="font-comic text-[11px] text-lilac truncate">{track.artist}</p>
                )}
              </div>
            </div>
            {track.audioUrl ? (
              <audio
                controls
                preload="metadata"
                className="w-full h-10"
                src={resolveMediaUrl(track.audioUrl)}
              >
                Your browser does not support audio playback.
              </audio>
            ) : (
              <p className="font-indie text-xs text-lilac/80">no audio file uploaded for this track yet</p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
