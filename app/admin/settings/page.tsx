"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_ABOUT_FAQ,
  DEFAULT_ABOUT_STATS,
  DEFAULT_CD_MIXES,
  DEFAULT_MUSIC_PLAYER_TRACKS,
  type AboutFaq,
  type AboutStat,
  type CdMix,
  type MusicPlayerTrack,
} from "@/lib/site-content-defaults";

type Tab = "homepage" | "music" | "about" | "cds";

interface HomepageSettings {
  tagline: string;
  subtitle: string;
  currentObsession: string;
  songOfTheWeek: { title: string; artist: string; note: string };
  mood: string;
  quote: string;
  welcomeMessage: string;
}

const HOMEPAGE_DEFAULTS: HomepageSettings = {
  tagline: "your favourite corner of the internet ★",
  subtitle: "a little scrapbook of girlhood ~ est. 2007",
  currentObsession: "",
  songOfTheWeek: { title: "", artist: "", note: "" },
  mood: "",
  quote: "",
  welcomeMessage: "",
};

async function saveSetting(key: string, value: unknown) {
  await fetch("/api/settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
}

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("homepage");
  const [homepage, setHomepage] = useState<HomepageSettings>(HOMEPAGE_DEFAULTS);
  const [musicTracks, setMusicTracks] = useState<MusicPlayerTrack[]>(DEFAULT_MUSIC_PLAYER_TRACKS);
  const [aboutStats, setAboutStats] = useState<AboutStat[]>(DEFAULT_ABOUT_STATS);
  const [aboutFaq, setAboutFaq] = useState<AboutFaq[]>(DEFAULT_ABOUT_FAQ);
  const [cdMixes, setCdMixes] = useState<CdMix[]>(DEFAULT_CD_MIXES);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.homepage) setHomepage({ ...HOMEPAGE_DEFAULTS, ...data.homepage });
        if (data.musicPlayer?.tracks) setMusicTracks(data.musicPlayer.tracks);
        if (data.about?.stats) setAboutStats(data.about.stats);
        if (data.about?.faq) setAboutFaq(data.about.faq);
        if (data.cdMixes) setCdMixes(data.cdMixes);
      });
  }, []);

  async function save() {
    setSaving(true);
    if (tab === "homepage") await saveSetting("homepage", homepage);
    if (tab === "music") await saveSetting("musicPlayer", { tracks: musicTracks });
    if (tab === "about") await saveSetting("about", { stats: aboutStats, faq: aboutFaq });
    if (tab === "cds") await saveSetting("cdMixes", cdMixes);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function uploadTrackAudio(index: number, file: File) {
    setUploading(index);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/media", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    setUploading(null);
    if (res.ok) {
      setMusicTracks((prev) =>
        prev.map((track, i) => (i === index ? { ...track, audioUrl: data.url } : track))
      );
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "homepage", label: "Homepage" },
    { id: "music", label: "Music player" },
    { id: "about", label: "About page" },
    { id: "cds", label: "CD mixes" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Site Settings</h1>
      <p className="text-slate-500 text-sm mb-6">
        Edit the static content across the site — homepage widgets, music player, about page, and CD archive.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              tab === t.id ? "bg-pink-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 max-w-3xl">
        {tab === "homepage" && (
          <>
            <h2 className="font-semibold text-lg">Homepage</h2>
            {[
              { key: "tagline", label: "Tagline" },
              { key: "subtitle", label: "Subtitle" },
              { key: "welcomeMessage", label: "Welcome message", textarea: true },
              { key: "currentObsession", label: "Currently obsessed with" },
              { key: "mood", label: "Current mood" },
              { key: "quote", label: "Quote of the day" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                {field.textarea ? (
                  <textarea
                    value={homepage[field.key as keyof HomepageSettings] as string}
                    onChange={(e) => setHomepage({ ...homepage, [field.key]: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                ) : (
                  <input
                    value={homepage[field.key as keyof HomepageSettings] as string}
                    onChange={(e) => setHomepage({ ...homepage, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                )}
              </div>
            ))}
            <h3 className="font-medium pt-2">Song of the week</h3>
            <input
              value={homepage.songOfTheWeek.title}
              onChange={(e) =>
                setHomepage({ ...homepage, songOfTheWeek: { ...homepage.songOfTheWeek, title: e.target.value } })
              }
              placeholder="Song title"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
            <input
              value={homepage.songOfTheWeek.artist}
              onChange={(e) =>
                setHomepage({ ...homepage, songOfTheWeek: { ...homepage.songOfTheWeek, artist: e.target.value } })
              }
              placeholder="Artist"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </>
        )}

        {tab === "music" && (
          <>
            <h2 className="font-semibold text-lg">Profile song player tracks</h2>
            <p className="text-sm text-slate-500">Upload MP3s for real playback on the homepage and playlists page.</p>
            {musicTracks.map((track, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    value={track.title}
                    onChange={(e) =>
                      setMusicTracks((prev) =>
                        prev.map((t, i) => (i === index ? { ...t, title: e.target.value } : t))
                      )
                    }
                    placeholder="Title"
                    className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                  />
                  <input
                    value={track.artist}
                    onChange={(e) =>
                      setMusicTracks((prev) =>
                        prev.map((t, i) => (i === index ? { ...t, artist: e.target.value } : t))
                      )
                    }
                    placeholder="Artist"
                    className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                  />
                  <input
                    value={track.album}
                    onChange={(e) =>
                      setMusicTracks((prev) =>
                        prev.map((t, i) => (i === index ? { ...t, album: e.target.value } : t))
                      )
                    }
                    placeholder="Album"
                    className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                  />
                </div>
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
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setMusicTracks((prev) => [
                  ...prev,
                  { title: "", artist: "", album: "", art: { from: "#ff8a00", to: "#ffe135", emoji: "🎵" } },
                ])
              }
              className="text-sm text-pink-600 hover:underline"
            >
              + Add track
            </button>
          </>
        )}

        {tab === "about" && (
          <>
            <h2 className="font-semibold text-lg">About page stats</h2>
            {aboutStats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <input
                  value={stat.label}
                  onChange={(e) =>
                    setAboutStats((prev) =>
                      prev.map((s, i) => (i === index ? { ...s, label: e.target.value } : s))
                    )
                  }
                  placeholder="Label"
                  className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                />
                <input
                  value={stat.value}
                  onChange={(e) =>
                    setAboutStats((prev) =>
                      prev.map((s, i) => (i === index ? { ...s, value: e.target.value } : s))
                    )
                  }
                  placeholder="Value"
                  className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAboutStats((prev) => [...prev, { label: "", value: "" }])}
              className="text-sm text-pink-600 hover:underline"
            >
              + Add stat
            </button>

            <h2 className="font-semibold text-lg pt-4">FAQ</h2>
            {aboutFaq.map((item, index) => (
              <div key={index} className="space-y-2 border border-slate-200 rounded p-3">
                <input
                  value={item.q}
                  onChange={(e) =>
                    setAboutFaq((prev) => prev.map((f, i) => (i === index ? { ...f, q: e.target.value } : f)))
                  }
                  placeholder="Question"
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                />
                <textarea
                  value={item.a}
                  onChange={(e) =>
                    setAboutFaq((prev) => prev.map((f, i) => (i === index ? { ...f, a: e.target.value } : f)))
                  }
                  placeholder="Answer"
                  rows={2}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setAboutFaq((prev) => [...prev, { q: "", a: "" }])}
              className="text-sm text-pink-600 hover:underline"
            >
              + Add FAQ
            </button>
          </>
        )}

        {tab === "cds" && (
          <>
            <h2 className="font-semibold text-lg">Burned CD archive</h2>
            {cdMixes.map((mix, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={mix.title}
                    onChange={(e) =>
                      setCdMixes((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, title: e.target.value } : m))
                      )
                    }
                    placeholder="Mix title"
                    className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                  />
                  <input
                    value={mix.vol}
                    onChange={(e) =>
                      setCdMixes((prev) =>
                        prev.map((m, i) => (i === index ? { ...m, vol: e.target.value } : m))
                      )
                    }
                    placeholder="VOL. 1"
                    className="px-2 py-1.5 border border-slate-300 rounded text-sm"
                  />
                </div>
                <input
                  value={mix.vibe}
                  onChange={(e) =>
                    setCdMixes((prev) =>
                      prev.map((m, i) => (i === index ? { ...m, vibe: e.target.value } : m))
                    )
                  }
                  placeholder="Vibe description"
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm"
                />
                <textarea
                  value={mix.tracks.join("\n")}
                  onChange={(e) =>
                    setCdMixes((prev) =>
                      prev.map((m, i) =>
                        i === index ? { ...m, tracks: e.target.value.split("\n").filter(Boolean) } : m
                      )
                    )
                  }
                  placeholder="Tracks (one per line)"
                  rows={4}
                  className="w-full px-2 py-1.5 border border-slate-300 rounded text-sm font-mono"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCdMixes((prev) => [
                  ...prev,
                  {
                    title: "new mix",
                    vol: `VOL. ${prev.length + 1}`,
                    vibe: "",
                    from: "#ff1f8f",
                    to: "#ff8a00",
                    emoji: "💿",
                    tracks: [],
                  },
                ])
              }
              className="text-sm text-pink-600 hover:underline"
            >
              + Add CD mix
            </button>
          </>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium text-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save settings"}
        </button>
      </div>
    </div>
  );
}
