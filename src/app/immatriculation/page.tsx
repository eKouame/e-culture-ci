import type { Metadata } from "next";
import { ImmatriculationForm } from "./ImmatriculationForm";

export const metadata: Metadata = {
  title: "Immatriculation | e-Culture CI",
};

export default function ImmatriculationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Immatriculation</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Immatriculez-vous au ministère de la Culture
      </h1>
      <p className="mt-3 text-muted">
        Individuel ou association, formalisez votre statut auprès du
        ministère pour devenir un interlocuteur officiel et participer aux
        politiques publiques du secteur.
      </p>

      <div className="mt-8">
        <ImmatriculationForm />
      </div>
    </div>
  );
}
