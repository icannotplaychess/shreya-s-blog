"use client";

import { useState } from "react";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";
import { resolveMediaUrl } from "@/lib/media-url";
import { MediaPicker } from "@/components/admin/MediaPicker";

export function MediaUrlField({
  label,
  value,
  onChange,
  accept = "image/*,video/*,audio/*",
  hint,
  allowLibrary = true,
  onPersist,
}: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  accept?: string;
  hint?: string;
  allowLibrary?: boolean;
  /** Called after upload/pick with the new URL (e.g. auto-save settings to database). */
  onPersist?: (url: string | undefined) => Promise<void>;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const media = await uploadMediaFromBrowser(file);
      onChange(media.url);
      if (onPersist) await onPersist(media.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const isAudio = value?.match(/\.(mp3|wav|ogg|m4a)|audio/i) || accept.includes("audio");
  const isVideo = value?.match(/\.(mp4|webm)|video/i) || (value && !isAudio && accept.includes("video"));
  const uploadLabel = isAudio
    ? uploading ? "Uploading..." : value ? "Replace audio" : "Upload audio"
    : isVideo
      ? uploading ? "Uploading..." : value ? "Replace video" : "Upload video"
      : uploading ? "Uploading..." : value ? "Replace photo" : "Upload photo";

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {value && (
        <div className="flex items-start gap-3 p-2 border border-slate-200 rounded-lg bg-slate-50">
          {value.match(/\.(mp3|wav|ogg|m4a)|audio/i) || isAudio ? (
            <audio src={resolveMediaUrl(value)} controls className="w-full max-w-xs" />
          ) : value.match(/\.(mp4|webm)|video/i) || isVideo ? (
            <video src={resolveMediaUrl(value)} controls className="w-24 h-24 object-cover rounded" />
          ) : (
            <img src={resolveMediaUrl(value)} alt="" className="w-20 h-20 object-cover rounded border border-white shadow" />
          )}
          <button type="button" onClick={() => onChange(undefined)} className="text-xs text-red-600 hover:underline shrink-0">
            Remove
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className="inline-block px-3 py-1.5 bg-pink-600 text-white rounded text-xs cursor-pointer hover:bg-pink-700">
          {uploadLabel}
          <input type="file" className="hidden" accept={accept} onChange={handleUpload} disabled={uploading} />
        </label>
        {allowLibrary && (
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="px-3 py-1.5 border border-pink-300 text-pink-700 rounded text-xs hover:bg-pink-50"
          >
            Pick from library
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {showPicker && (
        <MediaPicker
          onSelect={(media) => {
            void (async () => {
              onChange(media.url);
              setShowPicker(false);
              if (onPersist) await onPersist(media.url);
            })();
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
