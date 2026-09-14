import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AboutMe } from "@/components/about/AboutMe";

export const metadata: Metadata = {
  title: "About Me ~ Shankie's",
  description: "the girl behind the glitter: vital stats, crush list (redacted) & FAQ.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="ABOUT ME"
        subtitle="everything u need 2 know, formatted like the slam book page i take way too seriously."
        stickers={[
          { text: "100% me", palette: 0, rotate: -5 },
          { text: "no lies (1 lie)", palette: 2, rotate: 4 },
        ]}
      />
      <AboutMe />
    </div>
  );
}
