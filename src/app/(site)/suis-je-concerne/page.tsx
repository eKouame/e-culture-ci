import type { Metadata } from "next";
import { Questionnaire } from "./Questionnaire";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Suis-je concerné ? | e-Culture CI",
  description:
    "Répondez à 4 questions simples pour savoir en 1 minute si vous devez une licence, ou si vous en êtes exempté(e).",
  path: "/suis-je-concerne",
});

export default function SuisJeConcernePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">Module d&apos;orientation</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Suis-je concerné ?
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Répondez à 4 questions simples pour savoir immédiatement si vous
        devez une licence, ou si vous en êtes exempté(e).
      </p>

      <div className="mt-8">
        <Questionnaire />
      </div>
    </div>
  );
}
