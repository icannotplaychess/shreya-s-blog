import type { Metadata, Viewport } from "next";
import {
  Bangers,
  Chewy,
  Comic_Neue,
  Fredoka,
  Permanent_Marker,
  Pacifico,
  Indie_Flower,
  Luckiest_Guy,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";

const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const chewy = Chewy({ weight: "400", subsets: ["latin"], variable: "--font-chewy" });
const comic = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-comic" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });
const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const indie = Indie_Flower({ weight: "400", subsets: ["latin"], variable: "--font-indie" });
const lucky = Luckiest_Guy({ weight: "400", subsets: ["latin"], variable: "--font-lucky" });
const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel" });

export const metadata: Metadata = {
  title: "SHANKIE'S ★ your favourite corner of the internet",
  description:
    "a digital scrapbook of girlhood ~ diary pages, playlists, photo dumps, bollywood crushes & glitter. est. 2007, updated after school.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bangers.variable} ${chewy.variable} ${comic.variable} ${fredoka.variable} ${marker.variable} ${pacifico.variable} ${indie.variable} ${lucky.variable} ${pixel.variable} h-full fx-on`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
