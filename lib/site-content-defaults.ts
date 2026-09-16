/** @deprecated Import from @/lib/site-content instead */
export {
  type MusicPlayerTrack,
  type CdMix,
  type AboutStat,
  type AboutFaq,
  type PlaylistTrackItem,
  parsePlaylistTracks,
  DEFAULT_SITE_CONTENT,
} from "./site-content";

import { DEFAULT_SITE_CONTENT } from "./site-content";

export const DEFAULT_MUSIC_PLAYER_TRACKS = DEFAULT_SITE_CONTENT.musicPlayer.tracks;
export const DEFAULT_CD_MIXES = DEFAULT_SITE_CONTENT.cdMixes;
export const DEFAULT_ABOUT_STATS = DEFAULT_SITE_CONTENT.about.stats;
export const DEFAULT_ABOUT_FAQ = DEFAULT_SITE_CONTENT.about.faq;
