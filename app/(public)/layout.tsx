import { SiteSettingsProvider } from "@/components/providers/SiteSettings";
import { SparkleTrail } from "@/components/effects/SparkleTrail";
import { TopMarquee } from "@/components/chrome/TopMarquee";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { FxDock } from "@/components/chrome/FxDock";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteSettingsProvider>
      <SparkleTrail />
      <TopMarquee />
      <Nav />
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 pb-16">{children}</main>
      <Footer />
      <FxDock />
    </SiteSettingsProvider>
  );
}
