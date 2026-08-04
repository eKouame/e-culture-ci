import type { Metadata } from "next";
import { ImmatriculationForm } from "./ImmatriculationForm";

export const metadata: Metadata = {
  title: "Préparer mon immatriculation | e-Culture CI",
};

export default function ImmatriculationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Préparer mon immatriculation</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Rassemblez les pièces de votre dossier
      </h1>
      <p className="mt-3 text-muted">
        Individuel ou association, organisez les informations nécessaires
        pour vous enregistrer auprès du ministère de la Culture.
      </p>

      <div className="mt-8">
        <ImmatriculationForm />
      </div>
    </div>
  );
}
