import type { Metadata } from "next";
import { Questionnaire } from "./Questionnaire";

export const metadata: Metadata = {
  title: "Suis-je concerné ? | e-Culture CI",
};

export default function SuisJeConcernePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Module d&apos;orientation</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Suis-je concerné ?
      </h1>
      <p className="mt-3 text-muted">
        Réponds à quelques questions simples pour voir en 1 minute si la
        licence te concerne — ou si, sans doute, tu n&apos;es pas concerné.
      </p>

      <div className="mt-8">
        <Questionnaire />
      </div>
    </div>
  );
}
