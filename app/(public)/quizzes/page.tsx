import type { Metadata } from "next";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";
import { ThisOrThat } from "@/components/quizzes/ThisOrThat";
import { VibeQuiz } from "@/components/quizzes/VibeQuiz";

export const metadata: Metadata = {
  title: "Quizzes ~ Shankie's",
  description: "this or that, vibe checks & magazine-style personality tests.",
};

export default function QuizzesPage() {
  return (
    <div>
      <EditablePageHeader page="quizzes" />
      <div className="space-y-10">
        <ThisOrThat />
        <VibeQuiz />
      </div>
    </div>
  );
}
