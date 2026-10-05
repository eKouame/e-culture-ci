import { COMMUNES_ONGLET, type CommunesElementId } from "@/lib/communes-nav-config";
import { BarreSecondaire, type ElementBarre } from "./BarreSecondaire";

// Barre secondaire de l'onglet Communes : même composant que les Outils.
export function BarreCommunes({ actif }: { actif: CommunesElementId }) {
  const elements: ElementBarre[] = COMMUNES_ONGLET.map((e) => ({
    cle: e.id,
    nom: e.nom,
    href: e.href,
    etiquette: e.etiquette,
  }));
  return <BarreSecondaire titre="Communes" elements={elements} actif={actif} />;
}
