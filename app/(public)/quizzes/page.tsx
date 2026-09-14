import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ThisOrThat } from "@/components/quizzes/ThisOrThat";
import { VibeQuiz } from "@/components/quizzes/VibeQuiz";

export const metadata: Metadata = {
  title: "Quizzes ~ Shankie's",
  description: "this or that + what's ur 2000s vibe? magazine quizzes, no scrolling to the answers page.",
};

export default function QuizzesPage() {
  return (
    <div>
      <PageHeader
        title="QUIZ TIME!"
        subtitle="like the back pages of a disney magazine, except u can't cheat by flipping to the answers."
        stickers={[
          { text: "no cheating!!", palette: 1, rotate: -5 },
          { text: "grab a gel pen", palette: 2, rotate: 4 },
        ]}
      />
      <div className="space-y-12 max-w-4xl mx-auto">
        <ThisOrThat />
        <VibeQuiz />
      </div>
    </div>
  );
}
