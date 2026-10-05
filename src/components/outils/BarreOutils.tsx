import { ETIQUETTE_BARRE, OUTILS, type OutilId } from "@/lib/outils-config";
import { BarreSecondaire, type ElementBarre } from "./BarreSecondaire";

export type ActifBarre = "apercu" | OutilId;

// Barre secondaire de l'onglet Outils, visible sur toutes les pages d'outils.
export function BarreOutils({ actif }: { actif: ActifBarre }) {
  const elements: ElementBarre[] = [
    { cle: "apercu", nom: "Vue d'ensemble", href: "/outils" },
    ...OUTILS.map((o) => ({
      cle: o.id,
      nom: o.nom,
      href: o.href,
      etiquette: ETIQUETTE_BARRE[o.etat],
    })),
  ];
  return <BarreSecondaire titre="Outils" elements={elements} actif={actif} />;
}
