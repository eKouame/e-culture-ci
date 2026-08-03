import type { Metadata } from "next";
import { DeclarationForm } from "./DeclarationForm";

export const metadata: Metadata = {
  title: "Déclaration Express | e-Culture CI",
};

export default async function DeclarationPage({
  searchParams,
}: {
  searchParams: Promise<{ jauge?: string; orientation?: string }>;
}) {
  const params = await searchParams;
  const defaultJauge = params.jauge ? Number(params.jauge) : undefined;
  const defaultOrientation =
    params.orientation === "EXEMPTE" || params.orientation === "PROFESSIONNEL"
      ? params.orientation
      : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Déclaration Express</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Déclarez votre événement
      </h1>
      <p className="mt-3 text-muted">
        Gratuit et rapide (environ 3 minutes). Vous recevrez un récépissé
        numérique à présenter en mairie ou en préfecture.
      </p>

      <div className="mt-8">
        <DeclarationForm
          defaultJauge={defaultJauge}
          defaultOrientation={defaultOrientation}
        />
      </div>
    </div>
  );
}
