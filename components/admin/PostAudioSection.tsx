"use client";

import { PlaylistTrackEditor } from "./PlaylistTrackEditor";
import type { PlaylistTrackItem } from "@/lib/site-content";

export function PostAudioSection({
  type,
  tracks,
  onChange,
}: {
  type: string;
  tracks: PlaylistTrackItem[];
  onChange: (tracks: PlaylistTrackItem[]) => void;
}) {
  const label =
    type === "BLOG"
      ? "Blog MP3 audio"
      : type === "DIARY"
        ? "Diary MP3 audio"
        : "MP3 audio tracks";

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 space-y-2">
      <h3 className="font-medium text-sm text-pink-900">{label}</h3>
      <p className="text-xs text-slate-600">
        Add one or more MP3s — they appear as playable audio on the published post.
      </p>
      <PlaylistTrackEditor
        tracks={tracks}
        onChange={onChange}
        label="Tracks"
        emptyHint="Click + Add track, then upload an MP3."
      />
    </div>
  );
}
