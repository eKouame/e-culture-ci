import type { Metadata } from "next";
import { ImmatriculationForm } from "./ImmatriculationForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Préparer mon immatriculation | e-Culture CI",
  description:
    "Rassemblez et organisez les pièces nécessaires pour vous enregistrer, seul ou en association, auprès du ministère de la Culture.",
  path: "/immatriculation",
});

export default function ImmatriculationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">Préparer mon immatriculation</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Rassemblez les pièces de votre dossier
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Individuel ou association, organisez les informations nécessaires
        pour vous enregistrer auprès du ministère de la Culture. En 5
        minutes, réparties en 3 étapes simples.
      </p>

      <div className="mt-8">
        <ImmatriculationForm />
      </div>
    </div>
  );
}
