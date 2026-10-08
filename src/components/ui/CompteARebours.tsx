import { libelleEcheance } from "@/lib/publication";

// Bandeau de compte à rebours (« J-12 », « Demain », « Aujourd'hui »). Il disparaît seul
// après l'échéance : aucune intervention manuelle. La page qui l'affiche doit être
// régénérée au moins chaque jour (revalidate), comme les autres bascules de date du site.
export function CompteARebours({
  clotureLe,
  intitule,
  maintenant,
}: {
  clotureLe: string;
  intitule: string;
  maintenant?: Date;
}) {
  const libelle = libelleEcheance(clotureLe, maintenant);
  if (!libelle) return null;
  return (
    <p className="no-print inline-flex items-center gap-2.5 rounded-full bg-primary-light px-3.5 py-1.5 text-sm font-semibold text-primary-dark">
      <span className="rounded-full bg-hero-accent px-2 py-0.5 text-xs font-extrabold text-white">
        {libelle}
      </span>
      {intitule}
    </p>
  );
}
