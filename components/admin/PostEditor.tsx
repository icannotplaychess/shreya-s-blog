"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { AudioBlock, VideoBlock } from "@/lib/tiptap-media-extensions";
import { CONTENT_TYPES, POST_STATUSES, type ContentTypeValue, type PostStatusValue } from "@/lib/content-types";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MediaPicker } from "./MediaPicker";
import { PlaylistTrackEditor } from "./PlaylistTrackEditor";
import { PostMediaPanel } from "./PostMediaPanel";
import { resolveMediaUrl } from "@/lib/media-url";
import { formatApiError } from "@/lib/api-errors";
import { parsePlaylistTracks, type PlaylistTrackItem } from "@/lib/site-content-defaults";

interface Category { id: string; name: string }
interface Tag { id: string; name: string }
interface Media { id: string; url: string; originalName: string; mimeType: string }

interface PostData {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: ContentTypeValue;
  status: PostStatusValue;
  coverImageId: string | null;
  coverImageUrl?: string | null;
  metadata: string;
  categoryIds: string[];
  tagIds: string[];
  mediaIds: string[];
  initialMedia?: Media[];
}

export function PostEditor({
  initial,
  categories,
  tags,
}: {
  initial?: Partial<PostData>;
  categories: Category[];
  tags: Tag[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [type, setType] = useState<ContentTypeValue>(initial?.type ?? "BLOG");
  const [status, setStatus] = useState<PostStatusValue>(initial?.status ?? "DRAFT");
  const [coverImageId, setCoverImageId] = useState<string | null>(initial?.coverImageId ?? null);
  const [coverPreview, setCoverPreview] = useState<string | null>(initial?.coverImageUrl ?? null);
  const [metadata, setMetadata] = useState(initial?.metadata ?? "{}");
  const [playlistTracks, setPlaylistTracks] = useState<PlaylistTrackItem[]>(() =>
    parsePlaylistTracks(initial?.metadata ?? "{}")
  );
  const [audioTracks, setAudioTracks] = useState<PlaylistTrackItem[]>(() => {
    try {
      const meta = JSON.parse(initial?.metadata ?? "{}") as { audioTracks?: PlaylistTrackItem[] };
      return Array.isArray(meta.audioTracks) ? meta.audioTracks : [];
    } catch {
      return [];
    }
  });
  const [categoryIds, setCategoryIds] = useState<string[]>(initial?.categoryIds ?? []);
  const [tagIds, setTagIds] = useState<string[]>(initial?.tagIds ?? []);
  const [mediaIds, setMediaIds] = useState<string[]>(initial?.mediaIds ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"cover" | "content" | "gallery">("content");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your post..." }),
      AudioBlock,
      VideoBlock,
    ],
    content: initial?.content ? JSON.parse(initial.content) : undefined,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
    },
  });

  const handleMediaSelect = useCallback(
    (media: Media) => {
      if (mediaPickerTarget === "cover") {
        setCoverImageId(media.id);
        setCoverPreview(media.url);
      } else if (mediaPickerTarget === "content" && editor) {
        const src = resolveMediaUrl(media.url);
        if (media.mimeType.startsWith("image/")) {
          editor.chain().focus().setImage({ src, alt: media.originalName }).run();
        } else if (media.mimeType.startsWith("audio/")) {
          editor.chain().focus().insertContent({ type: "audioBlock", attrs: { src, title: media.originalName } }).run();
        } else if (media.mimeType.startsWith("video/")) {
          editor.chain().focus().insertContent({ type: "videoBlock", attrs: { src, title: media.originalName } }).run();
        }
      } else if (mediaPickerTarget === "gallery") {
        setMediaIds((prev) => [...prev, media.id]);
      }
      setShowMediaPicker(false);
    },
    [editor, mediaPickerTarget]
  );

  async function save(publishNow = false) {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");
    setSavedMessage("");

    const metaPayload = JSON.stringify({
      ...metaObj,
      ...(type === "PLAYLIST" ? { playlistTracks } : {}),
      ...(type !== "PLAYLIST" && audioTracks.length > 0 ? { audioTracks } : {}),
    });

    const payload = {
      title,
      slug: slug || undefined,
      excerpt,
      content: JSON.stringify(editor?.getJSON() ?? {}),
      type,
      status: publishNow ? "PUBLISHED" : status,
      coverImageId,
      metadata: metaPayload,
      categoryIds,
      tagIds,
      mediaIds,
    };

    try {
      const url = initial?.id ? `/api/posts/${initial.id}` : "/api/posts";
      const method = initial?.id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(formatApiError(data.error ?? data));
      }

      if (!data.id) {
        throw new Error("Post saved but the server did not return an id. Check your database setup.");
      }

      const newStatus = publishNow ? "PUBLISHED" : status;
      setStatus(newStatus);
      setSavedMessage(
        publishNow || newStatus === "PUBLISHED"
          ? "Published! You can keep editing and add more media below."
          : "Draft saved."
      );

      if (!initial?.id) {
        router.push(`/admin/posts/${data.id}/edit`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type") as ContentTypeValue | null;
    if (typeParam && (CONTENT_TYPES as readonly string[]).includes(typeParam) && !initial?.id) {
      setType(typeParam);
    }
  }, [initial?.id]);

  let metaObj: Record<string, string> = {};
  try {
    metaObj = JSON.parse(metadata);
  } catch {
    metaObj = {};
  }

  function updateMeta(key: string, value: string) {
    const next = { ...metaObj, [key]: value };
    setMetadata(JSON.stringify(next));
  }

  return (
    <div className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
      {savedMessage && <div className="p-3 bg-green-50 text-green-800 rounded-lg text-sm border border-green-200">{savedMessage}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-lg font-medium"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (optional)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              placeholder="auto-generated-from-title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              placeholder="Short description for listings"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Content</label>
              <button
                type="button"
                onClick={() => {
                  setMediaPickerTarget("content");
                  setShowMediaPicker(true);
                }}
                className="text-xs text-pink-600 hover:underline"
              >
                Insert media
              </button>
            </div>
            <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
              <div className="flex gap-1 p-2 border-b border-slate-200 bg-slate-50">
                {[
                  { label: "B", action: () => editor?.chain().focus().toggleBold().run() },
                  { label: "I", action: () => editor?.chain().focus().toggleItalic().run() },
                  { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
                  { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
                  { label: "•", action: () => editor?.chain().focus().toggleBulletList().run() },
                  { label: "❝", action: () => editor?.chain().focus().toggleBlockquote().run() },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={btn.action}
                    className="px-2 py-1 text-xs bg-white border border-slate-200 rounded hover:bg-slate-100"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Publish</h3>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ContentTypeValue)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              {CONTENT_TYPES.map((t) => (
                <option key={t} value={t}>{t.replace("_", " ")}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatusValue)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
            <p className="text-xs text-slate-500">
              Set status to Published and click Save, or use Publish to go live immediately.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => save(false)}
                disabled={saving}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : status === "PUBLISHED" ? "Save changes" : "Save draft"}
              </button>
              <button
                type="button"
                onClick={() => save(true)}
                disabled={saving}
                className="flex-1 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {saving ? "Publishing..." : status === "PUBLISHED" ? "Update published" : "Publish now"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Cover image</h3>
            {coverPreview && (
              <img src={resolveMediaUrl(coverPreview)} alt="Cover" className="w-full h-32 object-cover rounded-lg" />
            )}
            <button
              type="button"
              onClick={() => {
                setMediaPickerTarget("cover");
                setShowMediaPicker(true);
              }}
              className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-600 hover:border-pink-400"
            >
              {coverImageId ? "Change cover" : "Select cover image"}
            </button>
          </div>

          <PostMediaPanel mediaIds={mediaIds} onChange={setMediaIds} initialItems={initial?.initialMedia} />

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Categories</h3>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(cat.id)}
                  onChange={(e) =>
                    setCategoryIds((prev) =>
                      e.target.checked ? [...prev, cat.id] : prev.filter((id) => id !== cat.id)
                    )
                  }
                />
                {cat.name}
              </label>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Tags</h3>
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={tagIds.includes(tag.id)}
                  onChange={(e) =>
                    setTagIds((prev) =>
                      e.target.checked ? [...prev, tag.id] : prev.filter((id) => id !== tag.id)
                    )
                  }
                />
                {tag.name}
              </label>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-sm">Type-specific fields</h3>
            {(type === "DIARY" || type === "PLAYLIST" || type === "QUIZ") && (
              <input
                value={metaObj.mood ?? ""}
                onChange={(e) => updateMeta("mood", e.target.value)}
                placeholder="Mood (e.g. dreamy ✨)"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            )}
            {type === "PLAYLIST" && (
              <>
                <input
                  value={metaObj.artist ?? ""}
                  onChange={(e) => updateMeta("artist", e.target.value)}
                  placeholder="Playlist artist / curator"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
                <PlaylistTrackEditor tracks={playlistTracks} onChange={setPlaylistTracks} />
              </>
            )}
            {type === "QUIZ" && (
              <textarea
                value={metaObj.quizData ?? ""}
                onChange={(e) => updateMeta("quizData", e.target.value)}
                placeholder='Quiz JSON: {"questions":[...],"results":[...]}'
                rows={6}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono"
              />
            )}
            {type !== "PLAYLIST" && (
              <PlaylistTrackEditor
                tracks={audioTracks}
                onChange={setAudioTracks}
                label="Audio tracks (MP3)"
                emptyHint="Add MP3s to attach audio to this post."
              />
            )}
          </div>
        </div>
      </div>

      {showMediaPicker && (
        <MediaPicker
          onSelect={handleMediaSelect}
          onClose={() => setShowMediaPicker(false)}
        />
      )}
    </div>
  );
}
