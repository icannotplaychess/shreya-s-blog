"use client";

import Link from "next/link";
import type { PostWithRelations } from "@/lib/post-types";
import { parsePostContent, parsePostMetadata } from "@/lib/post-utils";
import { CutoutHeading } from "@/components/ui/CutoutHeading";
import { Sticker, WordSticker } from "@/components/ui/Sticker";
import { Polaroid } from "@/components/ui/Polaroid";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { Starburst } from "@/components/ui/Starburst";
import { PlaylistAudioPlayer } from "@/components/music/PlaylistAudioPlayer";
import { parsePlaylistTracks } from "@/lib/site-content-defaults";
import { resolveMediaUrl } from "@/lib/media-url";

function TipTapContent({ content }: { content: string }) {
  const doc = parsePostContent(content);
  if (!doc?.content) return null;

  return (
    <div className="font-comic text-inkberry/90 space-y-4 leading-relaxed">
      {doc.content.map((node: { type: string; content?: Array<{ type: string; text?: string; marks?: Array<{ type: string }> }> }, i: number) => {
        if (node.type === "paragraph") {
          const text = node.content?.map((c) => c.text ?? "").join("") ?? "";
          if (!text) return <br key={i} />;
          return <p key={i}>{text}</p>;
        }
        if (node.type === "heading") {
          const level = (node as { attrs?: { level?: number } }).attrs?.level ?? 2;
          const text = node.content?.map((c) => c.text ?? "").join("") ?? "";
          const cls = level === 2 ? "font-bangers text-2xl text-hotpink outline-text" : "font-chewy text-xl text-grape";
          return <h2 key={i} className={cls}>{text}</h2>;
        }
        if (node.type === "blockquote") {
          const text = node.content?.map((c) => c.text ?? "").join("") ?? "";
          return (
            <blockquote key={i} className="border-l-4 border-hotpink pl-4 font-indie text-lg italic text-grape">
              {text}
            </blockquote>
          );
        }
        if (node.type === "image") {
          const src = (node as { attrs?: { src?: string; alt?: string } }).attrs?.src;
          const alt = (node as { attrs?: { alt?: string } }).attrs?.alt ?? "";
          if (!src) return null;
          return (
            <div key={i} className="my-6 flex justify-center">
              <Polaroid photo={<img src={src} alt={alt} className="w-full h-full object-cover" />} caption={alt} rotate={i % 2 ? 3 : -2} className="w-64" />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export function PostCard({ post }: { post: PostWithRelations }) {
  const meta = parsePostMetadata<Record<string, string>>(post.metadata, {});
  const href = `/post/${post.slug}`;

  return (
    <Link href={href} className="paper-card block p-4 sm:p-5 hover:scale-[1.01] transition-transform -rotate-[0.3deg] group">
      {post.coverImage && (
        <div className="mb-3 overflow-hidden rounded-lg border-4 border-white shadow-md -rotate-1">
          <img src={resolveMediaUrl(post.coverImage.url)} alt={post.title} className="w-full h-40 object-cover" />
        </div>
      )}
      <span className="font-pixel text-[9px] text-grape uppercase tracking-widest">{post.type.replace("_", " ")}</span>
      <h3 className="font-bangers text-2xl text-hotpink outline-text group-hover:text-magenta mt-1">{post.title}</h3>
      {post.excerpt && <p className="font-comic text-sm text-inkberry/80 mt-2">{post.excerpt}</p>}
      {meta.mood && <WordSticker text={meta.mood} palette={2} rotate={-4} className="mt-3" />}
      <p className="font-pixel text-[8px] text-grape/60 mt-3">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
      </p>
    </Link>
  );
}

export function PostSpread({ post }: { post: PostWithRelations }) {
  const meta = parsePostMetadata<Record<string, string>>(post.metadata, {});

  if (post.type === "DIARY") {
    return (
      <article className="relative">
        <div className="paper-card p-6 sm:p-10 -rotate-[0.5deg] bg-[#fffef8] border-4 border-white shadow-xl"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8d5f0 27px, #e8d5f0 28px)",
            backgroundSize: "100% 28px",
          }}
        >
          <span aria-hidden className="washi -top-4 left-8 rotate-[-8deg]" />
          <span aria-hidden className="washi -top-3 right-12 rotate-[12deg]" />
          <p className="font-marker text-sm text-grape mb-2">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "today"}</p>
          <CutoutHeading text={post.title} className="text-3xl sm:text-4xl mb-6" />
          {meta.mood && <WordSticker text={meta.mood} palette={1} rotate={-6} className="mb-4" />}
          <TipTapContent content={post.content} />
        </div>
      </article>
    );
  }

  if (post.type === "PHOTO_DUMP" || post.type === "MOODBOARD") {
    const images = post.mediaItems.map((m) => m.media);
    return (
      <article>
        <CutoutHeading text={post.title} className="text-4xl sm:text-5xl mb-6 justify-center" />
        {post.excerpt && (
          <SpeechBubble color="#fff9ae" rotate={1} className="max-w-md mx-auto mb-8">
            <p className="font-comic text-sm">{post.excerpt}</p>
          </SpeechBubble>
        )}
        <div className="relative min-h-[400px]">
          {images.map((img, i) => (
            <Polaroid
              key={img.id}
              photo={<img src={resolveMediaUrl(img.url)} alt={img.alt ?? ""} className="w-full h-full object-cover" />}
              caption={img.alt ?? ""}
              rotate={(i % 5) * 4 - 8}
              className={`absolute w-36 sm:w-44 ${[
                "top-0 left-[5%]",
                "top-12 right-[8%]",
                "top-40 left-[20%]",
                "top-32 right-[15%]",
                "top-64 left-[10%]",
                "top-56 right-[5%]",
              ][i % 6]}`}
            />
          ))}
        </div>
        <TipTapContent content={post.content} />
      </article>
    );
  }

  if (post.type === "PLAYLIST") {
    const tracks = parsePlaylistTracks(post.metadata);
    return (
      <>
        <PlaylistAudioPlayer
          title={post.title}
          artist={meta.artist}
          mood={meta.mood}
          tracks={tracks}
          coverUrl={post.coverImage?.url}
        />
        <div className="mt-6"><TipTapContent content={post.content} /></div>
      </>
    );
  }

  return (
    <article className="paper-card p-6 sm:p-10 -rotate-[0.2deg] relative overflow-visible">
      <div className="absolute -top-6 -right-4 anim-wiggle">
        <Starburst color="#ffe135" border="#e6007e" rotate={8}>NEW!!</Starburst>
      </div>
      {post.coverImage && (
        <div className="mb-6 -mx-2 sm:-mx-4 overflow-hidden border-4 border-white shadow-lg rotate-1">
          <img src={resolveMediaUrl(post.coverImage.url)} alt={post.title} className="w-full max-h-80 object-cover" />
        </div>
      )}
      <span className="font-pixel text-[9px] text-grape uppercase tracking-widest">{post.type.replace("_", " ")}</span>
      <CutoutHeading text={post.title} className="text-4xl sm:text-5xl mt-2 mb-4" />
      {post.excerpt && <p className="font-indie text-lg text-grape mb-6">{post.excerpt}</p>}
      {meta.mood && <WordSticker text={meta.mood} palette={0} rotate={-5} className="mb-4" />}
      <TipTapContent content={post.content} />
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-4 border-t-2 border-dashed border-hotpink/30">
          {post.tags.map((tag) => (
            <WordSticker key={tag.id} text={`#${tag.name}`} palette={3} rotate={Math.random() * 10 - 5} />
          ))}
        </div>
      )}
    </article>
  );
}

export function PostList({ posts, title }: { posts: PostWithRelations[]; title: string }) {
  return (
    <div>
      <CutoutHeading text={title} className="text-4xl sm:text-5xl mb-8 justify-center" />
      {posts.length === 0 ? (
        <SpeechBubble color="#ffd1ec" className="max-w-md mx-auto text-center">
          <p className="font-comic">nothing here yet... check back soon!! ★</p>
        </SpeechBubble>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}
