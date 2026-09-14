"use client";

import { useEffect, useState } from "react";

interface HomepageSettings {
  tagline: string;
  subtitle: string;
  currentObsession: string;
  songOfTheWeek: { title: string; artist: string; note: string };
  mood: string;
  quote: string;
  welcomeMessage: string;
}

const DEFAULTS: HomepageSettings = {
  tagline: "your favourite corner of the internet ★",
  subtitle: "a little scrapbook of girlhood ~ est. 2007",
  currentObsession: "",
  songOfTheWeek: { title: "", artist: "", note: "" },
  mood: "",
  quote: "",
  welcomeMessage: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<HomepageSettings>(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.homepage) setSettings({ ...DEFAULTS, ...data.homepage });
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "homepage", value: settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 max-w-2xl">
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
                value={settings[field.key as keyof HomepageSettings] as string}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            ) : (
              <input
                value={settings[field.key as keyof HomepageSettings] as string}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            )}
          </div>
        ))}

        <h3 className="font-medium pt-2">Song of the week</h3>
        <input
          value={settings.songOfTheWeek.title}
          onChange={(e) =>
            setSettings({ ...settings, songOfTheWeek: { ...settings.songOfTheWeek, title: e.target.value } })
          }
          placeholder="Song title"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />
        <input
          value={settings.songOfTheWeek.artist}
          onChange={(e) =>
            setSettings({ ...settings, songOfTheWeek: { ...settings.songOfTheWeek, artist: e.target.value } })
          }
          placeholder="Artist"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />

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
