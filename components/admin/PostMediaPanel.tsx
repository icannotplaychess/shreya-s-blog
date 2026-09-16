"use client";

import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media-url";
import { MediaPicker } from "./MediaPicker";

interface MediaItem {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
}

export function PostMediaPanel({
  mediaIds,
  onChange,
}: {
  mediaIds: string[];
  onChange: (ids: string[]) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!mediaIds.length) {
      setItems([]);
      return;
    }
    fetch("/api/media")
      .then((r) => (r.ok ? r.json() : []))
      .then((all: MediaItem[]) => setItems(all.filter((m) => mediaIds.includes(m.id))))
      .catch(() => setItems([]));
  }, [mediaIds]);

  function addMedia(media: MediaItem) {
    if (!mediaIds.includes(media.id)) {
      onChange([...mediaIds, media.id]);
    }
    setShowPicker(false);
  }

  function remove(id: string) {
    onChange(mediaIds.filter((m) => m !== id));
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Attached media ({mediaIds.length})</h3>
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="text-xs text-pink-600 hover:underline"
        >
          + Add media
        </button>
      </div>
      <p className="text-xs text-slate-500">Images, audio (MP3), video, or PDF — any post type.</p>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((m) => (
            <li key={m.id} className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
              {m.mimeType.startsWith("image/") ? (
                <img src={resolveMediaUrl(m.url)} alt="" className="w-12 h-12 object-cover rounded" />
              ) : m.mimeType.startsWith("audio/") ? (
                <span className="text-xl w-12 text-center">🎵</span>
              ) : m.mimeType.startsWith("video/") ? (
                <span className="text-xl w-12 text-center">🎬</span>
              ) : (
                <span className="text-xl w-12 text-center">📄</span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{m.originalName}</p>
                <p className="text-[10px] text-slate-500">{m.mimeType}</p>
              </div>
              <button type="button" onClick={() => remove(m.id)} className="text-xs text-red-600 px-2">✕</button>
            </li>
          ))}
        </ul>
      )}

      {showPicker && <MediaPicker onSelect={addMedia} onClose={() => setShowPicker(false)} />}
    </div>
  );
}
