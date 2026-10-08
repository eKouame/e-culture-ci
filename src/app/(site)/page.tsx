import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { HeroAccueil } from "@/components/parcours/HeroAccueil";
import { BlocActualites } from "@/components/parcours/BlocActualites";
import { FriseRessources } from "@/components/accueil/FriseRessources";
import { BandeauCommunal } from "@/components/accueil/BandeauCommunal";
import { lireActualites } from "@/lib/actualites";

export const metadata: Metadata = pageMetadata({
  title: "e-Culture CI — Comprendre et préparer vos démarches du spectacle vivant",
  description:
    "Service culturel de proximité, indépendant et gratuit, pour comprendre la réglementation du spectacle vivant et préparer vos démarches, partout en Côte d'Ivoire.",
  path: "/",
});

// Accueil refondu (maquettes du 8 octobre), identique sur ordinateur et sur mobile : le
// héro avec les deux portes, les actualités, la frise des ressources, puis l'entrée des
// autorités locales. Seule la mise en page change avec la largeur d'écran.
export default async function Home() {
  const actualites = await lireActualites();

  return (
    <div>
      <HeroAccueil />
      <BlocActualites items={actualites} />
      <FriseRessources />
      <BandeauCommunal />
    </div>
  );
}
