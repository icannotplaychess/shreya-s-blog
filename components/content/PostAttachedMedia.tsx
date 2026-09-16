"use client";

import type { MediaItem } from "@/lib/post-types";
import { resolveMediaUrl } from "@/lib/media-url";
import { Polaroid } from "@/components/ui/Polaroid";

export function PostAttachedMedia({ items }: { items: { media: MediaItem; caption: string | null }[] }) {
  if (!items.length) return null;

  const images = items.filter((i) => i.media.mimeType.startsWith("image/"));
  const audio = items.filter((i) => i.media.mimeType.startsWith("audio/"));
  const video = items.filter((i) => i.media.mimeType.startsWith("video/"));
  const other = items.filter(
    (i) =>
      !i.media.mimeType.startsWith("image/") &&
      !i.media.mimeType.startsWith("audio/") &&
      !i.media.mimeType.startsWith("video/")
  );

  return (
    <section className="mt-8 space-y-6" aria-label="attached media">
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((item, i) => (
            <Polaroid
              key={item.media.id}
              photo={
                <img
                  src={resolveMediaUrl(item.media.url)}
                  alt={item.caption ?? item.media.alt ?? item.media.originalName}
                  className="w-full h-full object-cover"
                />
              }
              caption={item.caption ?? item.media.originalName}
              rotate={(i % 5) * 3 - 6}
            />
          ))}
        </div>
      )}

      {audio.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-chewy text-lg text-magenta">♫ audio</h3>
          {audio.map((item) => (
            <div key={item.media.id} className="xp-window p-3">
              <p className="font-comic text-sm mb-2">{item.caption ?? item.media.originalName}</p>
              <audio src={resolveMediaUrl(item.media.url)} controls className="w-full" />
            </div>
          ))}
        </div>
      )}

      {video.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-chewy text-lg text-grape">🎬 video</h3>
          {video.map((item) => (
            <div key={item.media.id}>
              <p className="font-comic text-sm mb-2">{item.caption ?? item.media.originalName}</p>
              <video src={resolveMediaUrl(item.media.url)} controls className="w-full max-w-lg rounded-lg border-4 border-white shadow-lg" />
            </div>
          ))}
        </div>
      )}

      {other.length > 0 && (
        <ul className="space-y-2">
          {other.map((item) => (
            <li key={item.media.id}>
              <a
                href={resolveMediaUrl(item.media.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-comic text-sm text-magenta hover:underline"
              >
                📎 {item.caption ?? item.media.originalName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
