import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeEtat, type EtatBadge } from "@/components/ui/BadgeEtat";
import { BandeauResultat } from "@/components/ui/BandeauResultat";
import { CarteContenu } from "@/components/ui/CarteContenu";
import { CompteARebours } from "@/components/ui/CompteARebours";
import { EncadreAValider } from "@/components/ui/EncadreAValider";
import { EncadreNote } from "@/components/ui/EncadreNote";
import { FilAriane } from "@/components/ui/FilAriane";
import { TableauFaits } from "@/components/ui/TableauFaits";
import { enProduction } from "@/lib/publication";
import { Interactifs } from "./Interactifs";

// Page de démonstration interne des composants du socle (lot 0). Prévisualisation
// seulement : inexistante en production, jamais indexée.
export const metadata: Metadata = {
  title: "Composants (interne) | e-Culture CI",
  robots: { index: false, follow: false },
};

const JETONS = [
  ["background", "#f7f3ec"],
  ["surface", "#fffdf9"],
  ["surface-2", "#efe9de"],
  ["foreground", "#18231e"],
  ["muted", "#5b6b63"],
  ["border", "#e3dccf"],
  ["border-strong", "#d6cdbd"],
  ["secondary", "#0f5a4b"],
  ["deep", "#0b3a31"],
  ["deep-strong", "#08281f"],
  ["primary-dark", "#c2560f"],
  ["hero-accent", "#b04e0c"],
  ["accent-on-deep", "#ffa84f"],
  ["avalider", "#fff4c2"],
] as const;

const ETATS: EtatBadge[] = [
  "nouveau",
  "bientot",
  "disponible",
  "actu-secteur",
  "sur-le-site",
  "directe",
  "approximative",
  "faible",
  "aucune",
];

function Bloc({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="text-lg font-extrabold text-foreground">{titre}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ComposantsPage() {
  if (enProduction()) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <FilAriane
        maillons={[
          { label: "Accueil", href: "/" },
          { label: "Interne", href: "/interne/composants" },
          { label: "Composants" },
        ]}
      />
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Composants du socle
      </h1>
      <p className="mt-2 max-w-prose text-muted">
        Page interne, visible en prévisualisation seulement : thème, composants de base et règles de
        publication du lot 0.
      </p>

      <EncadreAValider
        points={["Exemple de point à trancher avant publication.", "Un second point, pour voir la liste."]}
      />

      <Bloc titre="Jetons de couleur">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {JETONS.map(([nom, valeur]) => (
            <li key={nom} className="flex items-center gap-3 text-sm">
              <span className={`h-9 w-9 shrink-0 rounded-lg border border-border-strong`} style={{ background: valeur }} />
              <span>
                <span className="block font-semibold text-foreground">{nom}</span>
                <span className="text-muted">{valeur}</span>
              </span>
            </li>
          ))}
        </ul>
      </Bloc>

      <Bloc titre="Typographie (Public Sans)">
        <p className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl">
          Le spectacle vivant, expliqué simplement.
        </p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-secondary">Sur-titre en capitales</p>
        <p className="mt-2 max-w-prose text-base text-muted">
          Texte courant de 16 px. Graisses 400 à 800, interlettrage négatif sur les titres.
        </p>
      </Bloc>

      <Bloc titre="Badges d'état">
        <div className="flex flex-wrap gap-2">
          {ETATS.map((e) => (
            <BadgeEtat key={e} etat={e} />
          ))}
        </div>
      </Bloc>

      <Bloc titre="Cartes de contenu (standard, mise en avant, bientôt)">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CarteContenu titre="Déclarer et payer vos artistes" texte="Retenue à la source, cotisations et paiements." href="/ressources/payer-artistes" etat="disponible" />
          <CarteContenu titre="Calculez votre point d'équilibre" texte="Le calculateur de budget, en direct." href="/outils/budget" etat="nouveau" miseEnAvant action="Essayer →" />
          <CarteContenu titre="Mes budgets" texte="Retrouvez vos budgets enregistrés." etat="bientot" />
        </div>
      </Bloc>

      <Bloc titre="Compte à rebours">
        <CompteARebours
          clotureLe="2026-10-15"
          maintenant={new Date("2026-10-03T00:00:00Z")}
          intitule="avant la clôture de l'appel (date de démonstration)"
        />
      </Bloc>

      <Bloc titre="Bandeau de résultat (ton vert, ton foncé)">
        <div className="grid gap-4 md:grid-cols-2">
          <BandeauResultat surtitre="Licence B" titre="Producteur de spectacles">
            Texte d&apos;explication du résultat.
          </BandeauResultat>
          <BandeauResultat ton="fonce" surtitre="Appel clos" titre="Vous êtes hors du champ">
            Texte d&apos;explication du résultat.
          </BandeauResultat>
        </div>
      </Bloc>

      <Bloc titre="Tableau de faits et encadré note">
        <div className="grid gap-4 md:grid-cols-2">
          <TableauFaits
            titre="Licence B"
            lignes={[
              { label: "Frais", valeur: "5 000 000 FCFA" },
              { label: "Caution bancaire", valeur: "5 000 000 FCFA" },
              { label: "Durée", valeur: "3 ans" },
            ]}
            note="Selon l'arrêté, à confirmer auprès du ministère."
          />
          <EncadreNote titre="À savoir">
            La licence est personnelle et incessible. Cet encadré porte les précisions importantes.
          </EncadreNote>
        </div>
      </Bloc>

      <Bloc titre="Composants interactifs">
        <Interactifs />
      </Bloc>
    </div>
  );
}
