"use client";

import { useCallback, useEffect, useState } from "react";

interface Media {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
}

export function MediaPicker({
  onSelect,
  onClose,
}: {
  onSelect: (media: Media) => void;
  onClose: () => void;
}) {
  const [media, setMedia] = useState<Media[]>([]);
  const [q, setQ] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await fetch(`/api/media?q=${encodeURIComponent(q)}`);
    if (res.ok) setMedia(await res.json());
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/media", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      setMedia((prev) => [data, ...prev]);
      onSelect(data);
    } catch {
      setError("Could not upload file. Check that Vercel Blob is configured.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="font-semibold">Media Library</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">✕</button>
        </div>
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        <div className="p-4 border-b border-slate-200 flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search media..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
          />
          <label className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm cursor-pointer hover:bg-pink-700">
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,audio/*,.pdf" />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {media.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect(m)}
              className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-pink-500 bg-slate-100"
            >
              {m.mimeType.startsWith("image/") ? (
                <img src={m.url} alt={m.originalName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 p-2">
                  {m.originalName}
                </div>
              )}
            </button>
          ))}
          {media.length === 0 && (
            <p className="col-span-full text-center text-slate-500 text-sm py-8">No media yet. Upload something!</p>
          )}
        </div>
      </div>
    </div>
  );
}
