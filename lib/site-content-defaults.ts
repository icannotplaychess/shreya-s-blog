export interface MusicPlayerTrack {
  title: string;
  artist: string;
  album: string;
  audioUrl?: string;
  notes?: number[];
  tempo?: number;
  art?: { from: string; to: string; emoji: string };
}

export interface CdMix {
  title: string;
  vol: string;
  vibe: string;
  from: string;
  to: string;
  emoji: string;
  tracks: string[];
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface AboutFaq {
  q: string;
  a: string;
}

export const DEFAULT_MUSIC_PLAYER_TRACKS: MusicPlayerTrack[] = [
  {
    title: "Kabhi Kabhi Aditi",
    artist: "Rashid Ali",
    album: "Jaane Tu... Ya Jaane Na",
    notes: [64, 66, 67, 66, 64, 0, 62, 64, 66, 64, 62, 0, 60, 62, 64, 67, 66, 64, 62, 60],
    tempo: 200,
    art: { from: "#ff8a00", to: "#ffe135", emoji: "🌻" },
  },
  {
    title: "Woh Lamhe",
    artist: "Atif Aslam",
    album: "Zeher",
    notes: [57, 60, 62, 64, 62, 60, 57, 0, 55, 57, 60, 62, 60, 57, 55, 0],
    tempo: 260,
    art: { from: "#8a2be2", to: "#00d9ff", emoji: "🌙" },
  },
  {
    title: "Complicated",
    artist: "Avril Lavigne",
    album: "Let Go",
    notes: [67, 67, 66, 64, 0, 64, 66, 67, 71, 69, 67, 0, 66, 64, 62, 64],
    tempo: 210,
    art: { from: "#ff1f8f", to: "#3d1230", emoji: "🎸" },
  },
];

export const DEFAULT_CD_MIXES: CdMix[] = [
  {
    title: "rakhi rewind",
    vol: "VOL. 1",
    vibe: "for the school bus window seat",
    from: "#ff1f8f",
    to: "#ff8a00",
    emoji: "🚌",
    tracks: ["Kal Ho Naa Ho — title track", "BSB — I Want It That Way", "Chura Liya (remix, sorry)"],
  },
  {
    title: "monsoon meltdown",
    vol: "VOL. 2",
    vibe: "crying but make it scenic",
    from: "#8a2be2",
    to: "#00d9ff",
    emoji: "🌧️",
    tracks: ["Woh Lamhe — Atif", "Avril — I'm With You", "Tum Se Hi — Jab We Met"],
  },
];

export const DEFAULT_ABOUT_STATS: AboutStat[] = [
  { label: "name", value: "shankie (legal name: not ur business hehe)" },
  { label: "age", value: "14¾ (the ¾ is important)" },
  { label: "sign", value: "pisces ♓ (explains everything, says everyone)" },
  { label: "fav movie", value: "kuch kuch hota hai / jab we met (don't make me pick)" },
  { label: "fav actor", value: "SRK. next question." },
];

export const DEFAULT_ABOUT_FAQ: AboutFaq[] = [
  { q: "y is the site so pink?", a: "wrong question. y is everything ELSE not this pink?" },
  { q: "did u really code this urself?", a: "yes!! view-source → notepad → trial & error → crying → glory." },
  { q: "who is the crush the mixtape is for?", a: "next question." },
];

export interface PlaylistTrackItem {
  title: string;
  artist: string;
  audioUrl?: string;
  mediaId?: string;
}

export function parsePlaylistTracks(metadata: string): PlaylistTrackItem[] {
  try {
    const meta = JSON.parse(metadata) as { playlistTracks?: PlaylistTrackItem[]; tracks?: string };
    if (Array.isArray(meta.playlistTracks)) return meta.playlistTracks;
    if (meta.tracks) {
      return meta.tracks
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [title, artist] = line.split(" — ");
          return { title: title?.trim() || line.trim(), artist: artist?.trim() || "" };
        });
    }
  } catch {
    // fall through
  }
  return [];
}
