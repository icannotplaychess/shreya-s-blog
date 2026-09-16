"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_SITE_CONTENT,
  mergeSiteContent,
  type SiteContent,
  type TeaserItem,
  type BagItem,
  type PageHeaderConfig,
  type MusicPlayerTrack,
  type CdMix,
  type AboutStat,
  type AboutFaq,
} from "@/lib/site-content";
import { Field, StringListEditor, SaveButton } from "@/components/admin/settings/SettingsEditors";
import { MediaUrlField } from "@/components/admin/settings/MediaUrlField";
import { uploadMediaFromBrowser } from "@/lib/upload-media-client";

type TabId =
  | "homepage"
  | "sidebar"
  | "chrome"
  | "bag"
  | "teasers"
  | "pages"
  | "music"
  | "cds"
  | "about"
  | "girlhood"
  | "collections"
  | "quizzes"
  | "style"
  | "guestbook"
  | "songOfTheWeek";

const TABS: { id: TabId; label: string }[] = [
  { id: "homepage", label: "Homepage" },
  { id: "sidebar", label: "Sidebar" },
  { id: "chrome", label: "Chrome" },
  { id: "bag", label: "Bag" },
  { id: "teasers", label: "Teasers" },
  { id: "pages", label: "Pages" },
  { id: "music", label: "Music" },
  { id: "cds", label: "CDs" },
  { id: "about", label: "About" },
  { id: "girlhood", label: "Girlhood" },
  { id: "collections", label: "Collections" },
  { id: "quizzes", label: "Quizzes" },
  { id: "style", label: "Style" },
  { id: "guestbook", label: "Guestbook" },
  { id: "songOfTheWeek", label: "Song of Week" },
];

const SAVE_KEYS: Record<TabId, keyof SiteContent> = {
  homepage: "homepage",
  sidebar: "sidebar",
  chrome: "chrome",
  bag: "bag",
  teasers: "teasers",
  pages: "pages",
  music: "musicPlayer",
  cds: "cdMixes",
  about: "about",
  girlhood: "girlhood",
  collections: "collections",
  quizzes: "quizzes",
  style: "style",
  guestbook: "guestbook",
  songOfTheWeek: "songOfTheWeek",
};

const PAGE_KEYS = [
  "blog",
  "diary",
  "photoDump",
  "playlists",
  "quizzes",
  "style",
  "girlhood",
  "collections",
  "guestbook",
  "about",
] as const;

async function saveSetting(key: string, value: unknown) {
  const res = await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || `Save failed (${res.status})`);
  }
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
      {title && <h3 className="font-medium text-slate-800">{title}</h3>}
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
      />
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-xs text-red-600 hover:underline">
      Remove
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm text-pink-600 hover:underline">
      + {label}
    </button>
  );
}

export default function AdminSettingsPage() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [tab, setTab] = useState<TabId>("homepage");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/public/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setContent(mergeSiteContent(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function saveTab() {
    setSaving(true);
    setError("");
    try {
      const key = SAVE_KEYS[tab];
      await saveSetting(key, content[key]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  async function uploadTrackAudio(index: number, file: File) {
    setUploading(index);
    setError("");
    try {
      const data = await uploadMediaFromBrowser(file);
      patch("musicPlayer", {
        tracks: content.musicPlayer.tracks.map((track, i) =>
          i === index ? { ...track, audioUrl: data.url } : track
        ),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload audio file");
    } finally {
      setUploading(null);
    }
  }

  if (loading) {
    return <p className="text-slate-500">Loading settings...</p>;
  }

  const hp = content.homepage;
  const sb = content.sidebar;
  const ch = content.chrome;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Site Settings</h1>
      <p className="text-slate-500 text-sm mb-4">
        Edit all site content — homepage, sidebar widgets, pages, music, quizzes, and more.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mb-6 -mx-1 px-1">
        <div className="flex gap-2 min-w-max pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                tab === t.id ? "bg-pink-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 max-w-4xl">
        {/* ── Homepage ── */}
        {tab === "homepage" && (
          <>
            <h2 className="font-semibold text-lg">Homepage</h2>
            <Card title="Self portrait (welcome polaroid)">
              <p className="text-sm text-slate-500 mb-3">
                This is the polaroid on the front page welcome card — upload your photo here.
              </p>
              <Field label="Caption under photo" value={hp.polaroidCaption} onChange={(v) => patch("homepage", { ...hp, polaroidCaption: v })} />
              <MediaUrlField
                label="Your photo"
                value={hp.polaroidImageUrl}
                onChange={(v) => patch("homepage", { ...hp, polaroidImageUrl: v })}
                accept="image/*"
                hint="Upload a photo or pick one from your media library. Click Save settings when done."
              />
              <MediaUrlField label="Sticker next to polaroid (optional)" value={hp.stickerImageUrl} onChange={(v) => patch("homepage", { ...hp, stickerImageUrl: v })} accept="image/*" />
            </Card>
            <Field label="Tagline" value={hp.tagline} onChange={(v) => patch("homepage", { ...hp, tagline: v })} />
            <Field label="Subtitle" value={hp.subtitle} onChange={(v) => patch("homepage", { ...hp, subtitle: v })} textarea />
            <Field label="Welcome heading" value={hp.welcomeHeading} onChange={(v) => patch("homepage", { ...hp, welcomeHeading: v })} />
            <Field label="Welcome message" value={hp.welcomeMessage} onChange={(v) => patch("homepage", { ...hp, welcomeMessage: v })} textarea />
            <Field label="Current obsession" value={hp.currentObsession} onChange={(v) => patch("homepage", { ...hp, currentObsession: v })} />
            <Field label="Mood" value={hp.mood} onChange={(v) => patch("homepage", { ...hp, mood: v })} />
            <Field label="Quote" value={hp.quote} onChange={(v) => patch("homepage", { ...hp, quote: v })} />
            <Field label="Guestbook CTA" value={hp.guestbookCta} onChange={(v) => patch("homepage", { ...hp, guestbookCta: v })} />
            <Field label="About CTA" value={hp.aboutCta} onChange={(v) => patch("homepage", { ...hp, aboutCta: v })} />
            <Field label="Sections heading" value={hp.sectionsHeading} onChange={(v) => patch("homepage", { ...hp, sectionsHeading: v })} />
            <Field label="Mood sticky fallback" value={hp.moodStickyFallback} onChange={(v) => patch("homepage", { ...hp, moodStickyFallback: v })} />
            <Field label="Quote sticky fallback" value={hp.quoteStickyFallback} onChange={(v) => patch("homepage", { ...hp, quoteStickyFallback: v })} />
            <Card title="Song of the week">
              <Field label="Title" value={hp.songOfTheWeek.title} onChange={(v) => patch("homepage", { ...hp, songOfTheWeek: { ...hp.songOfTheWeek, title: v } })} />
              <Field label="Artist" value={hp.songOfTheWeek.artist} onChange={(v) => patch("homepage", { ...hp, songOfTheWeek: { ...hp.songOfTheWeek, artist: v } })} />
              <Field label="Note" value={hp.songOfTheWeek.note} onChange={(v) => patch("homepage", { ...hp, songOfTheWeek: { ...hp.songOfTheWeek, note: v } })} textarea />
            </Card>
          </>
        )}

        {/* ── Sidebar ── */}
        {tab === "sidebar" && (
          <>
            <h2 className="font-semibold text-lg">Sidebar widgets</h2>
            <Field label="Music player title" value={sb.musicPlayerTitle} onChange={(v) => patch("sidebar", { ...sb, musicPlayerTitle: v })} />

            <Card title="Clock">
              <Field label="Title" value={sb.clock.title} onChange={(v) => patch("sidebar", { ...sb, clock: { ...sb.clock, title: v } })} />
              <Field label="Timezone label" value={sb.clock.timezoneLabel} onChange={(v) => patch("sidebar", { ...sb, clock: { ...sb.clock, timezoneLabel: v } })} />
            </Card>

            <Card title="Visitor counter">
              <NumberField label="Start count" value={sb.visitor.startCount} onChange={(v) => patch("sidebar", { ...sb, visitor: { ...sb.visitor, startCount: v } })} />
              <Field label="Title" value={sb.visitor.title} onChange={(v) => patch("sidebar", { ...sb, visitor: { ...sb.visitor, title: v } })} />
              <Field label="Message (use {count})" value={sb.visitor.message} onChange={(v) => patch("sidebar", { ...sb, visitor: { ...sb.visitor, message: v } })} />
            </Card>

            <Card title="Status">
              <Field label="Title" value={sb.status.title} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, title: v } })} />
              <Field label="Online text" value={sb.status.onlineText} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, onlineText: v } })} />
              <Field label="Fav song" value={sb.status.favSong} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, favSong: v } })} />
              <Field label="Status message" value={sb.status.statusMsg} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, statusMsg: v } })} />
              <Field label="Last updated" value={sb.status.lastUpdated} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, lastUpdated: v } })} />
              <Field label="Mood fallback" value={sb.status.moodFallback} onChange={(v) => patch("sidebar", { ...sb, status: { ...sb.status, moodFallback: v } })} />
            </Card>

            <Card title="Quote widget">
              <Field label="Title" value={sb.quote.title} onChange={(v) => patch("sidebar", { ...sb, quote: { ...sb.quote, title: v } })} />
              <Field label="Attribution" value={sb.quote.attribution} onChange={(v) => patch("sidebar", { ...sb, quote: { ...sb.quote, attribution: v } })} />
              <Field label="Fallback" value={sb.quote.fallback} onChange={(v) => patch("sidebar", { ...sb, quote: { ...sb.quote, fallback: v } })} />
            </Card>

            <Card title="Pixel pet">
              <MediaUrlField label="Pet image" value={sb.pixelPet.imageUrl} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, imageUrl: v } })} accept="image/*" />
              <Field label="Title" value={sb.pixelPet.title} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, title: v } })} />
              <Field label="Name" value={sb.pixelPet.name} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, name: v } })} />
              <Field label="Feed button" value={sb.pixelPet.feedButton} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, feedButton: v } })} />
              <Field label="Hungry message" value={sb.pixelPet.hungryMsg} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, hungryMsg: v } })} />
              <Field label="Fed message (use {count})" value={sb.pixelPet.fedMsg} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, fedMsg: v } })} />
              <Field label="Full message" value={sb.pixelPet.fullMsg} onChange={(v) => patch("sidebar", { ...sb, pixelPet: { ...sb.pixelPet, fullMsg: v } })} />
            </Card>

            <Card title="Weather">
              <MediaUrlField label="Weather icon" value={sb.weather.iconUrl} onChange={(v) => patch("sidebar", { ...sb, weather: { ...sb.weather, iconUrl: v } })} accept="image/*" />
              <Field label="Title" value={sb.weather.title} onChange={(v) => patch("sidebar", { ...sb, weather: { ...sb.weather, title: v } })} />
              <Field label="Temperature" value={sb.weather.temp} onChange={(v) => patch("sidebar", { ...sb, weather: { ...sb.weather, temp: v } })} />
              <Field label="Description" value={sb.weather.description} onChange={(v) => patch("sidebar", { ...sb, weather: { ...sb.weather, description: v } })} />
              <StringListEditor label="Forecast" items={sb.weather.forecast} onChange={(items) => patch("sidebar", { ...sb, weather: { ...sb.weather, forecast: items } })} />
            </Card>

            <Card title="Calendar">
              <Field label="Title" value={sb.calendar.title} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, title: v } })} />
              <div className="grid grid-cols-2 gap-2">
                <NumberField label="Month (1-12)" value={sb.calendar.month ?? 7} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, month: v } })} />
                <NumberField label="Year" value={sb.calendar.year ?? 2007} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, year: v } })} />
              </div>
              <MediaUrlField label="Header image" value={sb.calendar.imageUrl} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, imageUrl: v } })} accept="image/*" />
              <Field label="Footer note" value={sb.calendar.footerNote} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, footerNote: v } })} />
              <NumberField label="Special day" value={sb.calendar.specialDay} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, specialDay: v } })} />
              <NumberField label="Heart day" value={sb.calendar.heartDay} onChange={(v) => patch("sidebar", { ...sb, calendar: { ...sb.calendar, heartDay: v } })} />
            </Card>

            <Card title="Blinkies">
              <Field label="Title" value={sb.blinkies.title} onChange={(v) => patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, title: v } })} />
              {sb.blinkies.items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Text" value={item.text} onChange={(v) => {
                    const items = [...sb.blinkies.items];
                    items[i] = { ...items[i], text: v };
                    patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, items } });
                  }} />
                  <Field label="Background CSS" value={item.bg} onChange={(v) => {
                    const items = [...sb.blinkies.items];
                    items[i] = { ...items[i], bg: v };
                    patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, items } });
                  }} />
                  <MediaUrlField label="Blinkie image (optional)" value={item.imageUrl} onChange={(v) => {
                    const items = [...sb.blinkies.items];
                    items[i] = { ...items[i], imageUrl: v };
                    patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, items } });
                  }} accept="image/*" hint="Upload a GIF/image blinkie instead of CSS gradient text." />
                  <RemoveButton onClick={() => patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, items: sb.blinkies.items.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add blinkie" onClick={() => patch("sidebar", { ...sb, blinkies: { ...sb.blinkies, items: [...sb.blinkies.items, { text: "", bg: "linear-gradient(90deg,#ff1f8f,#ff77c8)" }] } })} />
            </Card>

            <Card title="Best friends">
              <Field label="Title" value={sb.bestFriends.title} onChange={(v) => patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, title: v } })} />
              {sb.bestFriends.friends.map((friend, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Name" value={friend.name} onChange={(v) => {
                      const friends = [...sb.bestFriends.friends];
                      friends[i] = { ...friends[i], name: v };
                      patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends } });
                    }} />
                    <Field label="Emoji" value={friend.emoji} onChange={(v) => {
                      const friends = [...sb.bestFriends.friends];
                      friends[i] = { ...friends[i], emoji: v };
                      patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends } });
                    }} />
                    <Field label="Note" value={friend.note} onChange={(v) => {
                      const friends = [...sb.bestFriends.friends];
                      friends[i] = { ...friends[i], note: v };
                      patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends } });
                    }} />
                  </div>
                  <MediaUrlField label="Avatar photo" value={friend.avatarUrl} onChange={(v) => {
                    const friends = [...sb.bestFriends.friends];
                    friends[i] = { ...friends[i], avatarUrl: v };
                    patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends } });
                  }} accept="image/*" />
                  <RemoveButton onClick={() => patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends: sb.bestFriends.friends.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add friend" onClick={() => patch("sidebar", { ...sb, bestFriends: { ...sb.bestFriends, friends: [...sb.bestFriends.friends, { name: "", emoji: "👧", note: "" }] } })} />
            </Card>

            <Card title="Obsession">
              <Field label="Title" value={sb.obsession.title} onChange={(v) => patch("sidebar", { ...sb, obsession: { ...sb.obsession, title: v } })} />
              <Field label="Fallback" value={sb.obsession.fallback} onChange={(v) => patch("sidebar", { ...sb, obsession: { ...sb.obsession, fallback: v } })} />
              <StringListEditor label="Wishlist" items={sb.obsession.wishlist} onChange={(items) => patch("sidebar", { ...sb, obsession: { ...sb.obsession, wishlist: items } })} />
            </Card>
          </>
        )}

        {/* ── Chrome ── */}
        {tab === "chrome" && (
          <>
            <h2 className="font-semibold text-lg">Chrome (nav, marquee, footer)</h2>
            <Card title="Marquee">
              <StringListEditor label="Items" items={ch.marquee.items} onChange={(items) => patch("chrome", { ...ch, marquee: { ...ch.marquee, items } })} />
              <Field label="Speed (CSS duration)" value={ch.marquee.speed} onChange={(v) => patch("chrome", { ...ch, marquee: { ...ch.marquee, speed: v } })} placeholder="38s" />
            </Card>

            <Card title="Navigation">
              <Field label="Brand" value={ch.nav.brand} onChange={(v) => patch("chrome", { ...ch, nav: { ...ch.nav, brand: v } })} />
              <Field label="Menu open label" value={ch.nav.menuOpen} onChange={(v) => patch("chrome", { ...ch, nav: { ...ch.nav, menuOpen: v } })} />
              <Field label="Menu close label" value={ch.nav.menuClose} onChange={(v) => patch("chrome", { ...ch, nav: { ...ch.nav, menuClose: v } })} />
              {ch.nav.tabs.map((t, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Href" value={t.href} onChange={(v) => {
                      const tabs = [...ch.nav.tabs];
                      tabs[i] = { ...tabs[i], href: v };
                      patch("chrome", { ...ch, nav: { ...ch.nav, tabs } });
                    }} />
                    <Field label="Label" value={t.label} onChange={(v) => {
                      const tabs = [...ch.nav.tabs];
                      tabs[i] = { ...tabs[i], label: v };
                      patch("chrome", { ...ch, nav: { ...ch.nav, tabs } });
                    }} />
                    <Field label="Icon" value={t.icon} onChange={(v) => {
                      const tabs = [...ch.nav.tabs];
                      tabs[i] = { ...tabs[i], icon: v };
                      patch("chrome", { ...ch, nav: { ...ch.nav, tabs } });
                    }} />
                  </div>
                  <RemoveButton onClick={() => patch("chrome", { ...ch, nav: { ...ch.nav, tabs: ch.nav.tabs.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add nav tab" onClick={() => patch("chrome", { ...ch, nav: { ...ch.nav, tabs: [...ch.nav.tabs, { href: "/", label: "", icon: "🏠" }] } })} />
            </Card>

            <Card title="Footer">
              <Field label="Button wall title" value={ch.footer.buttonWallTitle} onChange={(v) => patch("chrome", { ...ch, footer: { ...ch.footer, buttonWallTitle: v } })} />
              <Field label="Signoff" value={ch.footer.signoff} onChange={(v) => patch("chrome", { ...ch, footer: { ...ch.footer, signoff: v } })} textarea />
              <Field label="Copyright" value={ch.footer.copyright} onChange={(v) => patch("chrome", { ...ch, footer: { ...ch.footer, copyright: v } })} />
              <Field label="Sticker left" value={ch.footer.stickerLeft} onChange={(v) => patch("chrome", { ...ch, footer: { ...ch.footer, stickerLeft: v } })} />
              <Field label="Sticker right" value={ch.footer.stickerRight} onChange={(v) => patch("chrome", { ...ch, footer: { ...ch.footer, stickerRight: v } })} />
              {ch.footer.buttons.map((btn, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Text" value={btn.text} onChange={(v) => {
                    const buttons = [...ch.footer.buttons];
                    buttons[i] = { ...buttons[i], text: v };
                    patch("chrome", { ...ch, footer: { ...ch.footer, buttons } });
                  }} />
                  <Field label="Background CSS" value={btn.bg} onChange={(v) => {
                    const buttons = [...ch.footer.buttons];
                    buttons[i] = { ...buttons[i], bg: v };
                    patch("chrome", { ...ch, footer: { ...ch.footer, buttons } });
                  }} />
                  <RemoveButton onClick={() => patch("chrome", { ...ch, footer: { ...ch.footer, buttons: ch.footer.buttons.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add footer button" onClick={() => patch("chrome", { ...ch, footer: { ...ch.footer, buttons: [...ch.footer.buttons, { text: "", bg: "linear-gradient(90deg,#ff1f8f,#8a2be2)" }] } })} />
            </Card>
          </>
        )}

        {/* ── Bag ── */}
        {tab === "bag" && (
          <>
            <h2 className="font-semibold text-lg">What&apos;s in my bag</h2>
            <Field label="Heading" value={content.bag.heading} onChange={(v) => patch("bag", { ...content.bag, heading: v })} />
            <Field label="Sticker" value={content.bag.sticker} onChange={(v) => patch("bag", { ...content.bag, sticker: v })} />
            <Field label="Intro" value={content.bag.intro} onChange={(v) => patch("bag", { ...content.bag, intro: v })} textarea />
            <Field label="Bag label" value={content.bag.bagLabel} onChange={(v) => patch("bag", { ...content.bag, bagLabel: v })} />
            {content.bag.items.map((item, i) => (
              <Card key={i} title={`Item ${i + 1}`}>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Emoji" value={item.emoji} onChange={(v) => updateBagItem(content, patch, i, { emoji: v })} />
                  <Field label="Label" value={item.label} onChange={(v) => updateBagItem(content, patch, i, { label: v })} />
                  <Field label="Note" value={item.note} onChange={(v) => updateBagItem(content, patch, i, { note: v })} />
                  <Field label="Position (CSS)" value={item.pos} onChange={(v) => updateBagItem(content, patch, i, { pos: v })} />
                  <SelectField label="Arrow side" value={item.arrowSide} options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }]} onChange={(v) => updateBagItem(content, patch, i, { arrowSide: v as "left" | "right" })} />
                </div>
                <MediaUrlField label="Item photo" value={item.imageUrl} onChange={(v) => updateBagItem(content, patch, i, { imageUrl: v })} accept="image/*" />
                <RemoveButton onClick={() => patch("bag", { ...content.bag, items: content.bag.items.filter((_, j) => j !== i) })} />
              </Card>
            ))}
            <AddButton label="Add bag item" onClick={() => patch("bag", { ...content.bag, items: [...content.bag.items, { emoji: "✏️", label: "", note: "", pos: "top-[6%] left-[2%]", arrowSide: "left" as const }] })} />
          </>
        )}

        {/* ── Teasers ── */}
        {tab === "teasers" && (
          <>
            <h2 className="font-semibold text-lg">Homepage section teasers</h2>
            {content.teasers.map((teaser, i) => (
              <Card key={i} title={`Teaser ${i + 1}`}>
                <Field label="Href" value={teaser.href} onChange={(v) => updateTeaser(content, patch, i, { href: v })} />
                <Field label="Title" value={teaser.title} onChange={(v) => updateTeaser(content, patch, i, { title: v })} />
                <Field label="Blurb" value={teaser.blurb} onChange={(v) => updateTeaser(content, patch, i, { blurb: v })} textarea />
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Emoji" value={teaser.emoji} onChange={(v) => updateTeaser(content, patch, i, { emoji: v })} />
                  <Field label="Tag" value={teaser.tag} onChange={(v) => updateTeaser(content, patch, i, { tag: v })} />
                  <Field label="Background (Tailwind)" value={teaser.bg} onChange={(v) => updateTeaser(content, patch, i, { bg: v })} />
                  <NumberField label="Rotate (deg)" value={teaser.rotate} onChange={(v) => updateTeaser(content, patch, i, { rotate: v })} />
                </div>
                <MediaUrlField label="Card image" value={teaser.imageUrl} onChange={(v) => updateTeaser(content, patch, i, { imageUrl: v })} accept="image/*" />
                <RemoveButton onClick={() => patch("teasers", content.teasers.filter((_, j) => j !== i))} />
              </Card>
            ))}
            <AddButton label="Add teaser" onClick={() => patch("teasers", [...content.teasers, { href: "/", title: "", blurb: "", emoji: "📔", bg: "from-babypink to-bubblegum", rotate: 0, tag: "" }])} />
          </>
        )}

        {/* ── Pages ── */}
        {tab === "pages" && (
          <>
            <h2 className="font-semibold text-lg">Page headers</h2>
            <Field label="Playlists sticky note" value={content.pages.playlistsStickyNote} onChange={(v) => patch("pages", { ...content.pages, playlistsStickyNote: v })} textarea />
            {PAGE_KEYS.map((pageKey) => {
              const page = content.pages[pageKey];
              return (
                <Card key={pageKey} title={pageKey}>
                  <Field label="Title" value={page.title} onChange={(v) => updatePageHeader(content, patch, pageKey, { title: v })} />
                  <Field label="Subtitle" value={page.subtitle} onChange={(v) => updatePageHeader(content, patch, pageKey, { subtitle: v })} textarea />
                  {page.stickers.map((sticker, i) => (
                    <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                      <Field label="Text" value={sticker.text} onChange={(v) => updatePageSticker(content, patch, pageKey, i, { text: v })} />
                      <div className="grid grid-cols-2 gap-2">
                        <NumberField label="Palette" value={sticker.palette} onChange={(v) => updatePageSticker(content, patch, pageKey, i, { palette: v })} />
                        <NumberField label="Rotate" value={sticker.rotate} onChange={(v) => updatePageSticker(content, patch, pageKey, i, { rotate: v })} />
                      </div>
                      <RemoveButton onClick={() => {
                        const stickers = page.stickers.filter((_, j) => j !== i);
                        updatePageHeader(content, patch, pageKey, { stickers });
                      }} />
                    </div>
                  ))}
                  <AddButton label="Add sticker" onClick={() => updatePageHeader(content, patch, pageKey, { stickers: [...page.stickers, { text: "", palette: 0, rotate: 0 }] })} />
                </Card>
              );
            })}
          </>
        )}

        {/* ── Music ── */}
        {tab === "music" && (
          <>
            <h2 className="font-semibold text-lg">Profile song player tracks</h2>
            <p className="text-sm text-slate-500">Upload MP3s for real playback on the homepage and playlists page.</p>
            {content.musicPlayer.tracks.map((track, index) => (
              <Card key={index} title={`Track ${index + 1}`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Field label="Title" value={track.title} onChange={(v) => updateMusicTrack(content, patch, index, { title: v })} />
                  <Field label="Artist" value={track.artist} onChange={(v) => updateMusicTrack(content, patch, index, { artist: v })} />
                  <Field label="Album" value={track.album} onChange={(v) => updateMusicTrack(content, patch, index, { album: v })} />
                </div>
                {track.art && (
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Art emoji" value={track.art.emoji} onChange={(v) => updateMusicTrack(content, patch, index, { art: { ...track.art!, emoji: v } })} />
                    <Field label="Art from color" value={track.art.from} onChange={(v) => updateMusicTrack(content, patch, index, { art: { ...track.art!, from: v } })} />
                    <Field label="Art to color" value={track.art.to} onChange={(v) => updateMusicTrack(content, patch, index, { art: { ...track.art!, to: v } })} />
                  </div>
                )}
                {track.art && (
                  <MediaUrlField label="Album art image" value={track.art.imageUrl} onChange={(v) => updateMusicTrack(content, patch, index, { art: { ...track.art!, imageUrl: v } })} accept="image/*" />
                )}
                <label className="inline-block px-3 py-1.5 bg-pink-600 text-white rounded text-xs cursor-pointer hover:bg-pink-700">
                  {uploading === index ? "Uploading..." : track.audioUrl ? "Replace MP3" : "Upload MP3"}
                  <input
                    type="file"
                    className="hidden"
                    accept="audio/*,.mp3,.m4a,.wav,.ogg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadTrackAudio(index, file);
                    }}
                  />
                </label>
                {track.audioUrl && <span className="text-xs text-green-700 ml-2">✓ MP3 uploaded</span>}
                <RemoveButton onClick={() => patch("musicPlayer", { tracks: content.musicPlayer.tracks.filter((_, j) => j !== index) })} />
              </Card>
            ))}
            <AddButton label="Add track" onClick={() => patch("musicPlayer", { tracks: [...content.musicPlayer.tracks, { title: "", artist: "", album: "", art: { from: "#ff8a00", to: "#ffe135", emoji: "🎵" } }] })} />
          </>
        )}

        {/* ── CDs ── */}
        {tab === "cds" && (
          <>
            <h2 className="font-semibold text-lg">Burned CD archive</h2>
            {content.cdMixes.map((mix, index) => (
              <Card key={index} title={`${mix.vol} — ${mix.title}`}>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Title" value={mix.title} onChange={(v) => updateCdMix(content, patch, index, { title: v })} />
                  <Field label="Volume" value={mix.vol} onChange={(v) => updateCdMix(content, patch, index, { vol: v })} />
                  <Field label="Emoji" value={mix.emoji} onChange={(v) => updateCdMix(content, patch, index, { emoji: v })} />
                  <Field label="Vibe" value={mix.vibe} onChange={(v) => updateCdMix(content, patch, index, { vibe: v })} />
                  <Field label="Gradient from" value={mix.from} onChange={(v) => updateCdMix(content, patch, index, { from: v })} />
                  <Field label="Gradient to" value={mix.to} onChange={(v) => updateCdMix(content, patch, index, { to: v })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tracks (one per line)</label>
                  <textarea
                    value={mix.tracks.join("\n")}
                    onChange={(e) => updateCdMix(content, patch, index, { tracks: e.target.value.split("\n").filter(Boolean) })}
                    rows={4}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm font-mono"
                  />
                </div>
                <MediaUrlField label="CD cover image" value={mix.coverImageUrl} onChange={(v) => updateCdMix(content, patch, index, { coverImageUrl: v })} accept="image/*" />
                <MediaUrlField label="Preview MP3" value={mix.audioUrl} onChange={(v) => updateCdMix(content, patch, index, { audioUrl: v })} accept="audio/*,.mp3,.m4a,.wav,.ogg" />
                <RemoveButton onClick={() => patch("cdMixes", content.cdMixes.filter((_, j) => j !== index))} />
              </Card>
            ))}
            <AddButton label="Add CD mix" onClick={() => patch("cdMixes", [...content.cdMixes, { title: "new mix", vol: `VOL. ${content.cdMixes.length + 1}`, vibe: "", from: "#ff1f8f", to: "#ff8a00", emoji: "💿", tracks: [] }])} />
          </>
        )}

        {/* ── About ── */}
        {tab === "about" && (
          <>
            <h2 className="font-semibold text-lg">About page</h2>
            <Field label="Intro heading" value={content.about.introHeading} onChange={(v) => patch("about", { ...content.about, introHeading: v })} />
            <Field label="FAQ heading" value={content.about.faqHeading} onChange={(v) => patch("about", { ...content.about, faqHeading: v })} />
            <Field label="Polaroid caption" value={content.about.polaroidCaption} onChange={(v) => patch("about", { ...content.about, polaroidCaption: v })} />
            <MediaUrlField label="Polaroid photo" value={content.about.polaroidImageUrl} onChange={(v) => patch("about", { ...content.about, polaroidImageUrl: v })} accept="image/*" />
            <Field label="Sticker text" value={content.about.stickerText} onChange={(v) => patch("about", { ...content.about, stickerText: v })} />

            <Card title="Stats">
              {content.about.stats.map((stat, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 border border-slate-200 rounded p-3 bg-white">
                  <Field label="Label" value={stat.label} onChange={(v) => updateAboutStat(content, patch, i, { label: v })} />
                  <Field label="Value" value={stat.value} onChange={(v) => updateAboutStat(content, patch, i, { value: v })} />
                  <div className="col-span-2"><RemoveButton onClick={() => patch("about", { ...content.about, stats: content.about.stats.filter((_, j) => j !== i) })} /></div>
                </div>
              ))}
              <AddButton label="Add stat" onClick={() => patch("about", { ...content.about, stats: [...content.about.stats, { label: "", value: "" }] })} />
            </Card>

            <Card title="FAQ">
              {content.about.faq.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Question" value={item.q} onChange={(v) => updateAboutFaq(content, patch, i, { q: v })} />
                  <Field label="Answer" value={item.a} onChange={(v) => updateAboutFaq(content, patch, i, { a: v })} textarea />
                  <RemoveButton onClick={() => patch("about", { ...content.about, faq: content.about.faq.filter((_, j) => j !== i) })} />
                </div>
              ))}
              <AddButton label="Add FAQ" onClick={() => patch("about", { ...content.about, faq: [...content.about.faq, { q: "", a: "" }] })} />
            </Card>
          </>
        )}

        {/* ── Girlhood ── */}
        {tab === "girlhood" && (
          <>
            <h2 className="font-semibold text-lg">Girlhood page</h2>
            <Card title="Summer bucket list">
              <Field label="Heading" value={content.girlhood.bucketList.heading} onChange={(v) => patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, heading: v } })} />
              <Field label="Sticker" value={content.girlhood.bucketList.sticker} onChange={(v) => patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, sticker: v } })} />
              <Field label="Intro" value={content.girlhood.bucketList.intro} onChange={(v) => patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, intro: v } })} textarea />
              {content.girlhood.bucketList.items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white flex gap-2 items-start">
                  <CheckboxField label="Done" checked={item.done} onChange={(v) => {
                    const items = [...content.girlhood.bucketList.items];
                    items[i] = { ...items[i], done: v };
                    patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, items } });
                  }} />
                  <Field label="Item" value={item.text} onChange={(v) => {
                    const items = [...content.girlhood.bucketList.items];
                    items[i] = { ...items[i], text: v };
                    patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, items } });
                  }} />
                  <RemoveButton onClick={() => patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, items: content.girlhood.bucketList.items.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add bucket item" onClick={() => patch("girlhood", { ...content.girlhood, bucketList: { ...content.girlhood.bucketList, items: [...content.girlhood.bucketList.items, { text: "", done: false }] } })} />
            </Card>

            <Card title="Things that made me smile">
              <Field label="Heading" value={content.girlhood.smileNotes.heading} onChange={(v) => patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, heading: v } })} />
              <Field label="Sticker" value={content.girlhood.smileNotes.sticker} onChange={(v) => patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, sticker: v } })} />
              {content.girlhood.smileNotes.notes.map((note, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Text" value={note.text} onChange={(v) => {
                    const notes = [...content.girlhood.smileNotes.notes];
                    notes[i] = { ...notes[i], text: v };
                    patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes } });
                  }} textarea />
                  <div className="grid grid-cols-3 gap-2">
                    <Field label="Color" value={note.color} onChange={(v) => {
                      const notes = [...content.girlhood.smileNotes.notes];
                      notes[i] = { ...notes[i], color: v };
                      patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes } });
                    }} />
                    <NumberField label="Rotate" value={note.rotate} onChange={(v) => {
                      const notes = [...content.girlhood.smileNotes.notes];
                      notes[i] = { ...notes[i], rotate: v };
                      patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes } });
                    }} />
                    <Field label="Font class" value={note.font} onChange={(v) => {
                      const notes = [...content.girlhood.smileNotes.notes];
                      notes[i] = { ...notes[i], font: v };
                      patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes } });
                    }} />
                  </div>
                  <RemoveButton onClick={() => patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes: content.girlhood.smileNotes.notes.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add smile note" onClick={() => patch("girlhood", { ...content.girlhood, smileNotes: { ...content.girlhood.smileNotes, notes: [...content.girlhood.smileNotes.notes, { text: "", color: "#ffd1ec", rotate: 0, font: "font-indie" }] } })} />
            </Card>

            <Card title="Life lately">
              <Field label="Heading" value={content.girlhood.lifeLately.heading} onChange={(v) => patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, heading: v } })} />
              {content.girlhood.lifeLately.updates.map((upd, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Tag" value={upd.tag} onChange={(v) => {
                    const updates = [...content.girlhood.lifeLately.updates];
                    updates[i] = { ...updates[i], tag: v };
                    patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, updates } });
                  }} />
                  <Field label="Text" value={upd.text} onChange={(v) => {
                    const updates = [...content.girlhood.lifeLately.updates];
                    updates[i] = { ...updates[i], text: v };
                    patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, updates } });
                  }} textarea />
                  <Field label="Background (Tailwind)" value={upd.bg} onChange={(v) => {
                    const updates = [...content.girlhood.lifeLately.updates];
                    updates[i] = { ...updates[i], bg: v };
                    patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, updates } });
                  }} />
                  <RemoveButton onClick={() => patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, updates: content.girlhood.lifeLately.updates.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add update" onClick={() => patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, updates: [...content.girlhood.lifeLately.updates, { tag: "", text: "", bg: "from-lemon/70 to-tangerine/40" }] } })} />
              <p className="text-sm font-medium text-slate-700 pt-2">Polaroids</p>
              {content.girlhood.lifeLately.polaroids.map((pol, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Caption" value={pol.caption} onChange={(v) => {
                      const polaroids = [...content.girlhood.lifeLately.polaroids];
                      polaroids[i] = { ...polaroids[i], caption: v };
                      patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, polaroids } });
                    }} />
                    <Field label="Doodle kind (fallback)" value={pol.kind} onChange={(v) => {
                      const polaroids = [...content.girlhood.lifeLately.polaroids];
                      polaroids[i] = { ...polaroids[i], kind: v };
                      patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, polaroids } });
                    }} />
                  </div>
                  <MediaUrlField label="Photo" value={pol.imageUrl} onChange={(v) => {
                    const polaroids = [...content.girlhood.lifeLately.polaroids];
                    polaroids[i] = { ...polaroids[i], imageUrl: v };
                    patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, polaroids } });
                  }} accept="image/*" />
                </div>
              ))}
              <AddButton label="Add polaroid" onClick={() => patch("girlhood", { ...content.girlhood, lifeLately: { ...content.girlhood.lifeLately, polaroids: [...content.girlhood.lifeLately.polaroids, { caption: "", kind: "" }] } })} />
            </Card>
          </>
        )}

        {/* ── Collections ── */}
        {tab === "collections" && (
          <>
            <h2 className="font-semibold text-lg">Collections page</h2>
            <Card title="Candy museum">
              <Field label="Heading" value={content.collections.candy.heading} onChange={(v) => patch("collections", { ...content.collections, candy: { ...content.collections.candy, heading: v } })} />
              <Field label="Sticker" value={content.collections.candy.sticker} onChange={(v) => patch("collections", { ...content.collections, candy: { ...content.collections.candy, sticker: v } })} />
              <Field label="Intro" value={content.collections.candy.intro} onChange={(v) => patch("collections", { ...content.collections, candy: { ...content.collections.candy, intro: v } })} textarea />
              {content.collections.candy.items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Name" value={item.name} onChange={(v) => updateCandyItem(content, patch, i, { name: v })} />
                    <Field label="Price" value={item.price} onChange={(v) => updateCandyItem(content, patch, i, { price: v })} />
                    <Field label="Emoji" value={item.emoji} onChange={(v) => updateCandyItem(content, patch, i, { emoji: v })} />
                    <Field label="Background" value={item.bg} onChange={(v) => updateCandyItem(content, patch, i, { bg: v })} />
                  </div>
                  <Field label="Note" value={item.note} onChange={(v) => updateCandyItem(content, patch, i, { note: v })} />
                  <MediaUrlField label="Photo" value={item.imageUrl} onChange={(v) => updateCandyItem(content, patch, i, { imageUrl: v })} accept="image/*" />
                  <RemoveButton onClick={() => patch("collections", { ...content.collections, candy: { ...content.collections.candy, items: content.collections.candy.items.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add candy" onClick={() => patch("collections", { ...content.collections, candy: { ...content.collections.candy, items: [...content.collections.candy.items, { name: "", price: "", emoji: "🍬", note: "", bg: "" }] } })} />
            </Card>

            <Card title="Treasure box">
              <Field label="Heading" value={content.collections.treasure.heading} onChange={(v) => patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, heading: v } })} />
              <Field label="Sticker" value={content.collections.treasure.sticker} onChange={(v) => patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, sticker: v } })} />
              <Field label="Valuation" value={content.collections.treasure.valuation} onChange={(v) => patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, valuation: v } })} />
              {content.collections.treasure.items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Emoji" value={item.emoji} onChange={(v) => updateTreasureItem(content, patch, i, { emoji: v })} />
                    <Field label="Name" value={item.name} onChange={(v) => updateTreasureItem(content, patch, i, { name: v })} />
                    <Field label="Rarity" value={item.rarity} onChange={(v) => updateTreasureItem(content, patch, i, { rarity: v })} />
                  </div>
                  <Field label="Detail" value={item.detail} onChange={(v) => updateTreasureItem(content, patch, i, { detail: v })} textarea />
                  <MediaUrlField label="Photo" value={item.imageUrl} onChange={(v) => updateTreasureItem(content, patch, i, { imageUrl: v })} accept="image/*" />
                  <RemoveButton onClick={() => patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, items: content.collections.treasure.items.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add treasure" onClick={() => patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, items: [...content.collections.treasure.items, { emoji: "", name: "", detail: "", rarity: "COMMON" }] } })} />
            </Card>

            <Card title="CD archive labels">
              <Field label="Archive title" value={content.collections.cdArchiveTitle} onChange={(v) => patch("collections", { ...content.collections, cdArchiveTitle: v })} />
              <Field label="Archive sticker" value={content.collections.cdArchiveSticker} onChange={(v) => patch("collections", { ...content.collections, cdArchiveSticker: v })} />
              <Field label="Mixed by label" value={content.collections.cdMixedBy} onChange={(v) => patch("collections", { ...content.collections, cdMixedBy: v })} />
            </Card>
          </>
        )}

        {/* ── Quizzes ── */}
        {tab === "quizzes" && (
          <>
            <h2 className="font-semibold text-lg">Quizzes</h2>
            <Card title="This or That">
              <Field label="Heading" value={content.quizzes.thisOrThat.heading} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, heading: v } })} />
              <Field label="Sticker" value={content.quizzes.thisOrThat.sticker} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, sticker: v } })} />
              <Field label="Intro" value={content.quizzes.thisOrThat.intro} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, intro: v } })} textarea />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pairs (one per line: A | B)</label>
                <textarea
                  value={content.quizzes.thisOrThat.pairs.map(([a, b]) => `${a} | ${b}`).join("\n")}
                  onChange={(e) => {
                    const pairs = e.target.value
                      .split("\n")
                      .filter(Boolean)
                      .map((line) => {
                        const [a, b] = line.split("|").map((s) => s.trim());
                        return [a || "", b || ""] as [string, string];
                      });
                    patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, pairs } });
                  }}
                  rows={8}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm font-mono"
                />
              </div>
              <Field label="Verdict (high score)" value={content.quizzes.thisOrThat.verdictHigh} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, verdictHigh: v } })} />
              <Field label="Verdict (mid score)" value={content.quizzes.thisOrThat.verdictMid} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, verdictMid: v } })} />
              <Field label="Verdict (low score)" value={content.quizzes.thisOrThat.verdictLow} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, verdictLow: v } })} />
              <Field label="Verdict footer (use {count})" value={content.quizzes.thisOrThat.verdictFooter} onChange={(v) => patch("quizzes", { ...content.quizzes, thisOrThat: { ...content.quizzes.thisOrThat, verdictFooter: v } })} />
            </Card>

            <Card title="Vibe quiz">
              <Field label="Heading" value={content.quizzes.vibeQuiz.heading} onChange={(v) => patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, heading: v } })} />
              <Field label="Sticker" value={content.quizzes.vibeQuiz.sticker} onChange={(v) => patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, sticker: v } })} />
              <StringListEditor
                label="Questions (one per line)"
                items={content.quizzes.vibeQuiz.questions.map((q) => q.q)}
                onChange={(lines) => {
                  const questions = lines.map((q, i) => {
                    const existing = content.quizzes.vibeQuiz.questions[i];
                    return existing ? { ...existing, q } : { q, options: [{ text: "", vibe: "filmi" }, { text: "", vibe: "rockstar" }, { text: "", vibe: "dreamer" }] };
                  });
                  patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, questions } });
                }}
              />
              {Object.entries(content.quizzes.vibeQuiz.results).map(([key, result]) => (
                <div key={key} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <p className="text-sm font-medium text-slate-700">Result: {key}</p>
                  <Field label="Title" value={result.title} onChange={(v) => {
                    patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, results: { ...content.quizzes.vibeQuiz.results, [key]: { ...result, title: v } } } });
                  }} />
                  <Field label="Emoji" value={result.emoji} onChange={(v) => {
                    patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, results: { ...content.quizzes.vibeQuiz.results, [key]: { ...result, emoji: v } } } });
                  }} />
                  <Field label="Description" value={result.desc} onChange={(v) => {
                    patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, results: { ...content.quizzes.vibeQuiz.results, [key]: { ...result, desc: v } } } });
                  }} textarea />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Gradient from" value={result.from} onChange={(v) => {
                      patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, results: { ...content.quizzes.vibeQuiz.results, [key]: { ...result, from: v } } } });
                    }} />
                    <Field label="Gradient to" value={result.to} onChange={(v) => {
                      patch("quizzes", { ...content.quizzes, vibeQuiz: { ...content.quizzes.vibeQuiz, results: { ...content.quizzes.vibeQuiz.results, [key]: { ...result, to: v } } } });
                    }} />
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

        {/* ── Style ── */}
        {tab === "style" && (
          <>
            <h2 className="font-semibold text-lg">Style files page</h2>
            <Card title="Moodboard">
              <Field label="Heading" value={content.style.moodboard.heading} onChange={(v) => patch("style", { ...content.style, moodboard: { ...content.style.moodboard, heading: v } })} />
              <Field label="Sticker" value={content.style.moodboard.sticker} onChange={(v) => patch("style", { ...content.style, moodboard: { ...content.style.moodboard, sticker: v } })} />
              {content.style.moodboard.tiles.map((tile, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Label" value={tile.label} onChange={(v) => updateMoodTile(content, patch, i, { label: v })} />
                    <Field label="Emoji" value={tile.emoji} onChange={(v) => updateMoodTile(content, patch, i, { emoji: v })} />
                    <Field label="Note" value={tile.note} onChange={(v) => updateMoodTile(content, patch, i, { note: v })} />
                    <Field label="Background" value={tile.bg} onChange={(v) => updateMoodTile(content, patch, i, { bg: v })} />
                    <NumberField label="Rotate" value={tile.rotate} onChange={(v) => updateMoodTile(content, patch, i, { rotate: v })} />
                    <Field label="Span (optional)" value={tile.span || ""} onChange={(v) => updateMoodTile(content, patch, i, { span: v || undefined })} />
                  </div>
                  <MediaUrlField label="Tile image" value={tile.imageUrl} onChange={(v) => updateMoodTile(content, patch, i, { imageUrl: v })} accept="image/*" />
                  <RemoveButton onClick={() => patch("style", { ...content.style, moodboard: { ...content.style.moodboard, tiles: content.style.moodboard.tiles.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add tile" onClick={() => patch("style", { ...content.style, moodboard: { ...content.style.moodboard, tiles: [...content.style.moodboard.tiles, { label: "", note: "", bg: "", rotate: 0, emoji: "" }] } })} />
            </Card>

            <Card title="Clippings">
              <Field label="Heading" value={content.style.clippings.heading} onChange={(v) => patch("style", { ...content.style, clippings: { ...content.style.clippings, heading: v } })} />
              <Field label="Sticker" value={content.style.clippings.sticker} onChange={(v) => patch("style", { ...content.style, clippings: { ...content.style.clippings, sticker: v } })} />
              <Field label="Style rule" value={content.style.clippings.styleRule} onChange={(v) => patch("style", { ...content.style, clippings: { ...content.style.clippings, styleRule: v } })} textarea />
              {content.style.clippings.items.map((item, i) => (
                <div key={i} className="border border-slate-200 rounded p-3 bg-white space-y-2">
                  <Field label="Headline" value={item.headline} onChange={(v) => updateClipping(content, patch, i, { headline: v })} />
                  <Field label="Source" value={item.source} onChange={(v) => updateClipping(content, patch, i, { source: v })} />
                  <Field label="Body" value={item.body} onChange={(v) => updateClipping(content, patch, i, { body: v })} textarea />
                  <div className="grid grid-cols-2 gap-2">
                    <NumberField label="Rotate" value={item.rotate} onChange={(v) => updateClipping(content, patch, i, { rotate: v })} />
                    <Field label="Background" value={item.bg} onChange={(v) => updateClipping(content, patch, i, { bg: v })} />
                  </div>
                  <RemoveButton onClick={() => patch("style", { ...content.style, clippings: { ...content.style.clippings, items: content.style.clippings.items.filter((_, j) => j !== i) } })} />
                </div>
              ))}
              <AddButton label="Add clipping" onClick={() => patch("style", { ...content.style, clippings: { ...content.style.clippings, items: [...content.style.clippings.items, { headline: "", source: "", body: "", rotate: 0, bg: "#fff3c4" }] } })} />
            </Card>
          </>
        )}

        {/* ── Guestbook ── */}
        {tab === "guestbook" && (
          <>
            <h2 className="font-semibold text-lg">Guestbook UI copy</h2>
            <StringListEditor label="Mood emojis" items={content.guestbook.moods} onChange={(moods) => patch("guestbook", { ...content.guestbook, moods })} />
            <Field label="Form title" value={content.guestbook.formTitle} onChange={(v) => patch("guestbook", { ...content.guestbook, formTitle: v })} />
            <Field label="Name label" value={content.guestbook.nameLabel} onChange={(v) => patch("guestbook", { ...content.guestbook, nameLabel: v })} />
            <Field label="Name placeholder" value={content.guestbook.namePlaceholder} onChange={(v) => patch("guestbook", { ...content.guestbook, namePlaceholder: v })} />
            <Field label="Mood label" value={content.guestbook.moodLabel} onChange={(v) => patch("guestbook", { ...content.guestbook, moodLabel: v })} />
            <Field label="Message label" value={content.guestbook.messageLabel} onChange={(v) => patch("guestbook", { ...content.guestbook, messageLabel: v })} />
            <Field label="Message placeholder" value={content.guestbook.messagePlaceholder} onChange={(v) => patch("guestbook", { ...content.guestbook, messagePlaceholder: v })} />
            <Field label="Submit text" value={content.guestbook.submitText} onChange={(v) => patch("guestbook", { ...content.guestbook, submitText: v })} />
            <Field label="Success text" value={content.guestbook.successText} onChange={(v) => patch("guestbook", { ...content.guestbook, successText: v })} />
            <Field label="List heading" value={content.guestbook.listHeading} onChange={(v) => patch("guestbook", { ...content.guestbook, listHeading: v })} />
            <Field label="Loading text" value={content.guestbook.loadingText} onChange={(v) => patch("guestbook", { ...content.guestbook, loadingText: v })} />
            <Field label="Empty text" value={content.guestbook.emptyText} onChange={(v) => patch("guestbook", { ...content.guestbook, emptyText: v })} />
          </>
        )}

        {/* ── Song of the Week widget ── */}
        {tab === "songOfTheWeek" && (
          <>
            <h2 className="font-semibold text-lg">Song of the Week widget</h2>
            <Field label="Widget title" value={content.songOfTheWeek.widgetTitle} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, widgetTitle: v })} />
            <Field label="Title" value={content.songOfTheWeek.title} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, title: v })} />
            <Field label="Artist" value={content.songOfTheWeek.artist} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, artist: v })} />
            <Field label="Note / lyrics" value={content.songOfTheWeek.note} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, note: v })} textarea />
            <Field label="Disclaimer" value={content.songOfTheWeek.disclaimer} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, disclaimer: v })} />
            <MediaUrlField label="Cover image" value={content.songOfTheWeek.coverImageUrl} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, coverImageUrl: v })} accept="image/*" />
            <MediaUrlField label="MP3 audio" value={content.songOfTheWeek.audioUrl} onChange={(v) => patch("songOfTheWeek", { ...content.songOfTheWeek, audioUrl: v })} accept="audio/*,.mp3,.m4a,.wav,.ogg" />
          </>
        )}

        <SaveButton saving={saving} saved={saved} onClick={saveTab} />
      </div>
    </div>
  );
}

// ── Update helpers ──

type PatchFn = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;

function updateBagItem(content: SiteContent, patch: PatchFn, i: number, partial: Partial<BagItem>) {
  const items = [...content.bag.items];
  items[i] = { ...items[i], ...partial };
  patch("bag", { ...content.bag, items });
}

function updateTeaser(content: SiteContent, patch: PatchFn, i: number, partial: Partial<TeaserItem>) {
  const teasers = [...content.teasers];
  teasers[i] = { ...teasers[i], ...partial };
  patch("teasers", teasers);
}

function updatePageHeader(
  content: SiteContent,
  patch: PatchFn,
  pageKey: keyof typeof content.pages,
  partial: Partial<PageHeaderConfig>
) {
  if (pageKey === "playlistsStickyNote") return;
  const pages = { ...content.pages };
  pages[pageKey] = { ...pages[pageKey], ...partial };
  patch("pages", pages);
}

function updatePageSticker(
  content: SiteContent,
  patch: PatchFn,
  pageKey: keyof typeof content.pages,
  i: number,
  partial: Partial<PageHeaderConfig["stickers"][number]>
) {
  if (pageKey === "playlistsStickyNote") return;
  const page = content.pages[pageKey];
  const stickers = [...page.stickers];
  stickers[i] = { ...stickers[i], ...partial };
  updatePageHeader(content, patch, pageKey, { stickers });
}

function updateMusicTrack(content: SiteContent, patch: PatchFn, i: number, partial: Partial<MusicPlayerTrack>) {
  const tracks = [...content.musicPlayer.tracks];
  tracks[i] = { ...tracks[i], ...partial };
  patch("musicPlayer", { tracks });
}

function updateCdMix(content: SiteContent, patch: PatchFn, i: number, partial: Partial<CdMix>) {
  const cdMixes = [...content.cdMixes];
  cdMixes[i] = { ...cdMixes[i], ...partial };
  patch("cdMixes", cdMixes);
}

function updateAboutStat(content: SiteContent, patch: PatchFn, i: number, partial: Partial<AboutStat>) {
  const stats = [...content.about.stats];
  stats[i] = { ...stats[i], ...partial };
  patch("about", { ...content.about, stats });
}

function updateAboutFaq(content: SiteContent, patch: PatchFn, i: number, partial: Partial<AboutFaq>) {
  const faq = [...content.about.faq];
  faq[i] = { ...faq[i], ...partial };
  patch("about", { ...content.about, faq });
}

function updateCandyItem(
  content: SiteContent,
  patch: PatchFn,
  i: number,
  partial: Partial<SiteContent["collections"]["candy"]["items"][number]>
) {
  const items = [...content.collections.candy.items];
  items[i] = { ...items[i], ...partial };
  patch("collections", { ...content.collections, candy: { ...content.collections.candy, items } });
}

function updateTreasureItem(
  content: SiteContent,
  patch: PatchFn,
  i: number,
  partial: Partial<SiteContent["collections"]["treasure"]["items"][number]>
) {
  const items = [...content.collections.treasure.items];
  items[i] = { ...items[i], ...partial };
  patch("collections", { ...content.collections, treasure: { ...content.collections.treasure, items } });
}

function updateMoodTile(
  content: SiteContent,
  patch: PatchFn,
  i: number,
  partial: Partial<SiteContent["style"]["moodboard"]["tiles"][number]>
) {
  const tiles = [...content.style.moodboard.tiles];
  tiles[i] = { ...tiles[i], ...partial };
  patch("style", { ...content.style, moodboard: { ...content.style.moodboard, tiles } });
}

function updateClipping(
  content: SiteContent,
  patch: PatchFn,
  i: number,
  partial: Partial<SiteContent["style"]["clippings"]["items"][number]>
) {
  const items = [...content.style.clippings.items];
  items[i] = { ...items[i], ...partial };
  patch("style", { ...content.style, clippings: { ...content.style.clippings, items } });
}
