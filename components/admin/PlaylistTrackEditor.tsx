"use client";

import { useState } from "react";
import type { PlaylistTrackItem } from "@/lib/site-content-defaults";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";

export function PlaylistTrackEditor({
  tracks,
  onChange,
}: {
  tracks: PlaylistTrackItem[];
  onChange: (tracks: PlaylistTrackItem[]) => void;
}) {
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");

  function updateTrack(index: number, patch: Partial<PlaylistTrackItem>) {
    onChange(tracks.map((track, i) => (i === index ? { ...track, ...patch } : track)));
  }

  function addTrack() {
    onChange([...tracks, { title: "", artist: "" }]);
  }

  function removeTrack(index: number) {
    onChange(tracks.filter((_, i) => i !== index));
  }

  async function uploadAudio(index: number, file: File) {
    setUploading(index);
    setError("");
    try {
      const data = await uploadMediaFromBrowser(file);
      updateTrack(index, { audioUrl: data.url, mediaId: data.id });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload audio file");
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm">Playlist tracks</h4>
        <button
          type="button"
          onClick={addTrack}
          className="text-xs text-pink-600 hover:underline"
        >
          + Add track
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {tracks.length === 0 && (
        <p className="text-xs text-slate-500">No tracks yet. Add one and upload an MP3.</p>
      )}

      {tracks.map((track, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
          <div className="flex gap-2">
            <input
              value={track.title}
              onChange={(e) => updateTrack(index, { title: e.target.value })}
              placeholder="Song title"
              className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm"
            />
            <input
              value={track.artist}
              onChange={(e) => updateTrack(index, { artist: e.target.value })}
              placeholder="Artist"
              className="flex-1 px-2 py-1.5 border border-slate-300 rounded text-sm"
            />
            <button
              type="button"
              onClick={() => removeTrack(index)}
              className="text-xs text-red-600 px-2"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="px-3 py-1.5 bg-pink-600 text-white rounded text-xs cursor-pointer hover:bg-pink-700">
              {uploading === index ? "Uploading..." : track.audioUrl ? "Replace MP3" : "Upload MP3"}
              <input
                type="file"
                className="hidden"
                accept="audio/*,.mp3,.m4a,.wav,.ogg"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAudio(index, file);
                }}
              />
            </label>
            {track.audioUrl && (
              <span className="text-xs text-green-700 truncate">✓ audio uploaded</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
