import type { Metadata } from "next";
import { DeclarationForm } from "../DeclarationForm";
import { CadreDeclaration } from "../CadreDeclaration";

// Page d'essai pour les mairies : hors sitemap et hors index, car elle
// présente une commune fictive.
export const metadata: Metadata = {
  title: "Essai du guichet de déclaration | e-Culture CI",
  description:
    "Essayez, avec une commune fictive, ce que voit un organisateur dont la mairie propose le guichet de déclaration. Aucune donnée n'est transmise.",
  robots: { index: false, follow: false },
};

export default function EssaiPage() {
  return (
    <CadreDeclaration
      maillons={[
        { label: "Accueil", href: "/" },
        { label: "Espace communal", href: "/communes" },
        { label: "Essai du guichet" },
      ]}
      titre="Essayez le guichet"
      intro="Parcourez l'outil comme un organisateur de votre commune, avec une commune fictive : vous voyez ce qu'il propose, et ce que la mairie recevrait."
      pastilles={[
        { texte: "Commune fictive", ton: "neutre" },
        { texte: "Aucune donnée transmise", ton: "vert" },
        { texte: "Document non officiel", ton: "neutre" },
      ]}
    >
      <DeclarationForm demo />
    </CadreDeclaration>
  );
}
