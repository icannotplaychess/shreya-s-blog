import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playlists ~ Shankie's",
  description: "burned CDs, cassette rips & the sacred profile song.",
};

export default function PlaylistsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
