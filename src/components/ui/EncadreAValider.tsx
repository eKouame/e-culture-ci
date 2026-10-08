import { enProduction, verificationPerimee } from "@/lib/publication";

// Encadré jaune « À valider » : les points à trancher avant publication, et l'alerte de
// fraîcheur. Il n'existe qu'en prévisualisation : en production il ne rend rien. Composant
// serveur uniquement (il lit l'environnement du déploiement).
export function EncadreAValider({
  points = [],
  verifieLe,
}: {
  points?: string[];
  verifieLe?: string;
}) {
  if (enProduction()) return null;
  const perime = verificationPerimee(verifieLe);
  if (points.length === 0 && !perime) return null;

  return (
    <aside
      aria-label="À valider (visible en prévisualisation seulement)"
      className="no-print my-6 rounded-xl border border-avalider-border bg-avalider p-4 text-avalider-text"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.12em]">
        À valider · prévisualisation seulement
      </p>
      {points.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {perime && (
        <p className="mt-2 text-sm font-semibold">
          {verifieLe
            ? `Vérification datée du ${verifieLe} : plus de six mois, à refaire.`
            : "Aucune date de vérification renseignée."}
        </p>
      )}
    </aside>
  );
}
