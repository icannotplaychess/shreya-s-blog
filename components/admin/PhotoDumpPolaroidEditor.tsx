"use client";

import { useState } from "react";
import { resolveMediaUrl } from "@/lib/media-url";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";
import { MediaPicker } from "./MediaPicker";

export interface PolaroidMediaEntry {
  mediaId: string;
  caption: string;
  url: string;
  mimeType: string;
  originalName: string;
}

export function PhotoDumpPolaroidEditor({
  entries,
  onChange,
}: {
  entries: PolaroidMediaEntry[];
  onChange: (entries: PolaroidMediaEntry[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const added: PolaroidMediaEntry[] = [];
      for (const file of Array.from(files)) {
        const media = await uploadMediaFromBrowser(file);
        if (!media.mimeType.startsWith("image/")) {
          setError("Photo dumps use images only — each upload becomes a polaroid.");
          continue;
        }
        added.push({
          mediaId: media.id,
          caption: media.originalName.replace(/\.[^.]+$/, ""),
          url: media.url,
          mimeType: media.mimeType,
          originalName: media.originalName,
        });
      }
      if (added.length) onChange([...entries, ...added]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function addFromLibrary(media: { id: string; url: string; mimeType: string; originalName: string }) {
    if (!media.mimeType.startsWith("image/")) {
      setError("Pick an image for polaroids.");
      return;
    }
    if (entries.some((e) => e.mediaId === media.id)) return;
    onChange([
      ...entries,
      {
        mediaId: media.id,
        caption: media.originalName.replace(/\.[^.]+$/, ""),
        url: media.url,
        mimeType: media.mimeType,
        originalName: media.originalName,
      },
    ]);
    setShowPicker(false);
  }

  function updateCaption(index: number, caption: string) {
    onChange(entries.map((entry, i) => (i === index ? { ...entry, caption } : entry)));
  }

  function remove(index: number) {
    onChange(entries.filter((_, i) => i !== index));
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-sm">Polaroid photos ({entries.length})</h3>
        <div className="flex gap-2">
          <label className="text-xs text-pink-600 hover:underline cursor-pointer">
            {uploading ? "Uploading..." : "Upload photos"}
            <input
              type="file"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <button type="button" onClick={() => setShowPicker(true)} className="text-xs text-pink-600 hover:underline">
            Pick from library
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Each photo appears as a scattered polaroid on the photo dump page. Add a caption under each one.
      </p>
      {error && <p className="text-xs text-red-600">{error}</p>}

      {entries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((entry, index) => (
            <div key={entry.mediaId} className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-2">
              <div className="bg-white p-2 pb-8 shadow-md rotate-[-2deg] relative">
                <img
                  src={resolveMediaUrl(entry.url)}
                  alt={entry.caption}
                  className="w-full aspect-square object-cover"
                />
                <p className="absolute bottom-1 left-0 right-0 text-center font-marker text-xs text-slate-600 px-2 truncate">
                  {entry.caption || "caption..."}
                </p>
              </div>
              <input
                value={entry.caption}
                onChange={(e) => updateCaption(index, e.target.value)}
                placeholder="Polaroid caption"
                className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
              />
              <button type="button" onClick={() => remove(index)} className="text-xs text-red-600 hover:underline">
                Remove polaroid
              </button>
            </div>
          ))}
        </div>
      )}

      {showPicker && (
        <MediaPicker onSelect={addFromLibrary} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
