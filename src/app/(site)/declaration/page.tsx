import type { Metadata } from "next";
import { DeclarationForm } from "./DeclarationForm";
import { CadreDeclaration } from "./CadreDeclaration";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Préparer ma déclaration | e-Culture CI",
  description:
    "Renseignez les informations de votre événement en 3 minutes et obtenez un récapitulatif clair à conserver pour votre déclaration officielle.",
  path: "/declaration",
});

export default function DeclarationPage() {
  return (
    <CadreDeclaration
      maillons={[
        { label: "Accueil", href: "/" },
        { label: "Espace communal", href: "/communes" },
        { label: "Ma déclaration" },
      ]}
      titre="Ma déclaration"
      intro="Trois étapes pour préparer un récapitulatif de votre événement, à conserver et à présenter lors de vos échanges avec la mairie ou la préfecture."
      pastilles={[
        { texte: "Rien n'est enregistré", ton: "vert" },
        { texte: "Gratuit, sans compte", ton: "vert" },
        { texte: "Document non officiel", ton: "neutre" },
      ]}
    >
      <DeclarationForm />
    </CadreDeclaration>
  );
}
