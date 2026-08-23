import type { Metadata } from "next";
import { MentoratForm } from "./MentoratForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Mentorat & parrainage | e-Culture CI",
  description:
    "Débutant dans le spectacle vivant ? Trouvez un mentor licencié pour organiser votre parrainage (Licence B).",
  path: "/ressources/mentorat",
});

export default function MentoratPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold text-primary-dark">Centre de ressources</p>
      <h1 className="mt-1 text-3xl font-extrabold text-foreground">
        Mentorat &amp; parrainage (Licence B)
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Pour démarrer votre activité en toute autonomie, la réglementation
        exige de réaliser 5 spectacles sous la supervision d&apos;un
        professionnel déjà titulaire d&apos;une licence. Décrivez votre
        profil ci-dessous, nous vous mettrons en relation avec un mentor.
      </p>

      <div className="mt-8">
        <MentoratForm />
      </div>
    </div>
  );
}
