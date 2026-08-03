import type { Metadata } from "next";
import { ImmatriculationForm } from "./ImmatriculationForm";

export const metadata: Metadata = {
  title: "Rejoindre l'annuaire | e-Culture CI",
};

export default function ImmatriculationPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary">Annuaire des organisateurs</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Rejoins l&apos;annuaire e-Culture CI
      </h1>
      <p className="mt-3 text-muted">
        Inscris-toi, seul ou en association, dans l&apos;annuaire e-Culture
        CI des organisateurs. Tu te rends visible auprès de la communauté et
        tu te prépares aux démarches officielles à venir.
      </p>

      <div className="mt-8">
        <ImmatriculationForm />
      </div>
    </div>
  );
}
