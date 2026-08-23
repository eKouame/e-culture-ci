import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

const SITE_TITLE = "e-Culture CI | Comprendre et préparer vos démarches du spectacle vivant";
const SITE_DESCRIPTION =
  "Comprendre et préparer vos démarches du spectacle vivant, partout en Côte d'Ivoire : vérifiez si une licence vous concerne, préparez votre déclaration ou votre immatriculation — un outil indépendant.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "e-Culture CI",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <div
          style={{ display: "contents" }}
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Le carnet — un registre personnel qu'on feuillette étape par étape, jamais un formulaire d'État rempli d'un bloc.
OWN-WORLD: fond crème existant (#fafaf9), encre orange/verte existantes réinterprétées comme encre de carnet ; lignes réglées, coin de page corné, cachet circulaire pour les confirmations, numéros de dossier en chiffres tabulaires.
STORY: l'utilisateur ouvre son carnet, tourne une page à chaque étape, referme sur un cachet qui confirme sans jamais prétendre à l'officialité.
FIRST VIEWPORT: accueil — cartes de modules à coin corné, cachet autour de la statistique de réassurance, boutons et hiérarchie inchangés.
FORM: Le Carnet (direction #4/7, seed 4dcac864), enrichie du feuilletage entre étapes, d'un espace délibéré autour des montants, et d'un traitement chaleureux à la soumission.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
