"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PostListActions({
  postId,
  status,
  slug,
}: {
  postId: string;
  status: string;
  slug: string;
}) {
  const router = useRouter();
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  async function publishDraft() {
    setPublishing(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PUBLISHED" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || "Could not publish");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish");
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-1">
      <Link href={`/admin/posts/${postId}/edit`} className="text-xs text-pink-600 hover:underline">
        Edit
      </Link>
      {status === "DRAFT" && (
        <button
          type="button"
          onClick={publishDraft}
          disabled={publishing}
          className="text-xs text-green-700 hover:underline disabled:opacity-50"
        >
          {publishing ? "Publishing..." : "Publish"}
        </button>
      )}
      {status === "PUBLISHED" && (
        <a href={`/post/${slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:underline">
          View ↗
        </a>
      )}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
