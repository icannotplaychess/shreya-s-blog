"use client";

import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media-url";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";
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
  initialItems,
}: {
  mediaIds: string[];
  onChange: (ids: string[]) => void;
  initialItems?: MediaItem[];
}) {
  const [items, setItems] = useState<MediaItem[]>(initialItems ?? []);
  const [showPicker, setShowPicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialItems?.length) {
      setItems(initialItems.filter((m) => mediaIds.includes(m.id)));
      return;
    }
    if (!mediaIds.length) {
      setItems([]);
      return;
    }
    fetch("/api/media")
      .then((r) => (r.ok ? r.json() : []))
      .then((all: MediaItem[]) => setItems(all.filter((m) => mediaIds.includes(m.id))))
      .catch(() => setItems([]));
  }, [mediaIds, initialItems]);

  function addMedia(media: MediaItem) {
    if (!mediaIds.includes(media.id)) {
      onChange([...mediaIds, media.id]);
      setItems((prev) => [...prev, media]);
    }
    setShowPicker(false);
  }

  function remove(id: string) {
    onChange(mediaIds.filter((m) => m !== id));
    setItems((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const media = await uploadMediaFromBrowser(file);
      addMedia(media);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-sm">Attached media ({mediaIds.length})</h3>
        <div className="flex gap-2">
          <label className="text-xs text-pink-600 hover:underline cursor-pointer">
            {uploading ? "Uploading..." : "Upload file"}
            <input
              type="file"
              className="hidden"
              accept="image/*,video/*,audio/*,.mp3,.m4a,.wav,.ogg,.pdf"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <button type="button" onClick={() => setShowPicker(true)} className="text-xs text-pink-600 hover:underline">
            Pick from library
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-500">Images, MP3s, video, or PDF — works on drafts and published posts.</p>
      {error && <p className="text-xs text-red-600">{error}</p>}

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((m) => (
            <li key={m.id} className="flex items-start gap-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
              {m.mimeType.startsWith("image/") ? (
                <img src={resolveMediaUrl(m.url)} alt="" className="w-12 h-12 object-cover rounded shrink-0" />
              ) : m.mimeType.startsWith("audio/") ? (
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs font-medium truncate">{m.originalName}</p>
                  <audio src={resolveMediaUrl(m.url)} controls className="w-full h-8" />
                </div>
              ) : m.mimeType.startsWith("video/") ? (
                <video src={resolveMediaUrl(m.url)} controls className="w-24 h-16 object-cover rounded shrink-0" />
              ) : (
                <span className="text-xl w-12 text-center shrink-0">📄</span>
              )}
              {!m.mimeType.startsWith("audio/") && (
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{m.originalName}</p>
                  <p className="text-[10px] text-slate-500">{m.mimeType}</p>
                </div>
              )}
              <button type="button" onClick={() => remove(m.id)} className="text-xs text-red-600 px-2 shrink-0">✕</button>
            </li>
          ))}
        </ul>
      )}

      {showPicker && <MediaPicker onSelect={addMedia} onClose={() => setShowPicker(false)} />}
    </div>
  );
}
