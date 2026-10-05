// Barre secondaire de l'onglet Communes. Les noms et les étiquettes (« Bêta ») vivent
// ici, pas dans la mise en page. Les routes ne changent pas : `/communes` et
// `/declaration`. « Communes partenaires » s'ajoutera plus tard, quand une commune
// sera active (jamais avant : aucune commune n'est nommée sans convention signée).

export type CommunesElementId = "mairies" | "declarer";

export interface CommunesElement {
  id: CommunesElementId;
  nom: string;
  href: string;
  etiquette?: string;
}

export const COMMUNES_ONGLET: CommunesElement[] = [
  { id: "mairies", nom: "Pour les mairies", href: "/communes" },
  {
    id: "declarer",
    nom: "Déclarer à ma mairie",
    href: "/declaration",
    etiquette: "Bêta",
  },
];
