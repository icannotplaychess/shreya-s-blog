import { NextResponse } from "next/server";
import { getSiteSetting } from "@/lib/posts";
import {
  DEFAULT_ABOUT_FAQ,
  DEFAULT_ABOUT_STATS,
  DEFAULT_CD_MIXES,
  DEFAULT_MUSIC_PLAYER_TRACKS,
} from "@/lib/site-content-defaults";

export async function GET() {
  const [homepage, musicPlayer, cdMixes, about] = await Promise.all([
    getSiteSetting("homepage", {}),
    getSiteSetting("musicPlayer", { tracks: DEFAULT_MUSIC_PLAYER_TRACKS }),
    getSiteSetting("cdMixes", DEFAULT_CD_MIXES),
    getSiteSetting("about", { stats: DEFAULT_ABOUT_STATS, faq: DEFAULT_ABOUT_FAQ }),
  ]);

  return NextResponse.json({ homepage, musicPlayer, cdMixes, about });
}
