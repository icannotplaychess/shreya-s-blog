import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { AboutMe } from "@/components/about/AboutMe";

export const metadata: Metadata = {
  title: "About Me ~ Shankie's",
  description: "the official shankie dossier. handle with care.",
};

export default function AboutPage() {
  return (
    <div>
      <EditablePageHeader page="about" />
      <AboutMe />
    </div>
  );
}
