"use client";

import { useState } from "react";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";
import { resolveMediaUrl } from "@/lib/media-url";

export function MediaUrlField({
  label,
  value,
  onChange,
  accept = "image/*,video/*,audio/*",
  hint,
}: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  accept?: string;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const media = await uploadMediaFromBrowser(file);
      onChange(media.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const isAudio = value?.includes("audio") || accept.includes("audio");
  const isVideo = value?.includes("video") || (value && !isAudio && accept.includes("video"));

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
      <label className="inline-block px-3 py-1.5 bg-pink-600 text-white rounded text-xs cursor-pointer hover:bg-pink-700">
        {uploading ? "Uploading..." : value ? "Replace file" : "Upload file"}
        <input type="file" className="hidden" accept={accept} onChange={handleUpload} disabled={uploading} />
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
