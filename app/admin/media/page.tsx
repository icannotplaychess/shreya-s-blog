"use client";

import { useCallback, useEffect, useState } from "react";

interface Media {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default function AdminMediaPage() {
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
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/media", { method: "POST", body: form });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || `Failed to upload ${file.name}`);
          return;
        }
      }
      await load();
    } catch {
      setError("Could not upload files. Check that Vercel Blob is configured.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this media file?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    if (res.ok) load();
    else {
      const data = await res.json();
      alert(data.error || "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <label className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium cursor-pointer">
          {uploading ? "Uploading..." : "Upload files"}
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
            accept="image/*,video/*,audio/*,.pdf"
          />
        </label>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search media..."
        className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg text-sm mb-6"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((m) => (
          <div key={m.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden group">
            <div className="aspect-square bg-slate-100">
              {m.mimeType.startsWith("image/") ? (
                <img src={m.url} alt={m.originalName} className="w-full h-full object-cover" />
              ) : m.mimeType.startsWith("video/") ? (
                <video src={m.url} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 p-2 text-center">
                  {m.originalName}
                </div>
              )}
            </div>
            <div className="p-2">
              <p className="text-xs truncate text-slate-700">{m.originalName}</p>
              <p className="text-xs text-slate-400">{(m.size / 1024).toFixed(0)} KB</p>
              <button
                onClick={() => handleDelete(m.id)}
                className="text-xs text-red-600 hover:underline mt-1 opacity-0 group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {media.length === 0 && (
        <p className="text-center text-slate-500 py-12">No media uploaded yet.</p>
      )}
    </div>
  );
}
