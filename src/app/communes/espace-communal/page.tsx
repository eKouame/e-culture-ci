import type { Metadata } from "next";
import Link from "next/link";
import { BarreCommunes } from "@/components/outils/BarreCommunes";
import { DotPill } from "@/components/ui/DotPill";
import { DECLARATIONS_EXEMPLE } from "@/lib/espace-communal-exemple";

// Version d'exemple publique : lecture seule, sans connexion, données inventées. Hors
// sitemap et hors index. L'Espace communal réel reste derrière une connexion, remis à
// chaque commune à la signature de la convention.
export const metadata: Metadata = {
  title: "Espace communal, exemple fictif | e-Culture CI",
  description:
    "Aperçu, avec des données inventées, de ce que pourrait voir une mairie dans son Espace communal.",
  robots: { index: false, follow: false },
};

const dateCourte = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formater(iso: string) {
  return dateCourte.format(new Date(`${iso}T12:00:00`));
}

export default function EspaceCommunalExemplePage() {
  const lignes = DECLARATIONS_EXEMPLE;
  const jaugeTotale = lignes.reduce((n, l) => n + l.jauge, 0);

  const parType = Object.entries(
    lignes.reduce<Record<string, number>>((acc, l) => {
      acc[l.type] = (acc[l.type] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...parType.map(([, n]) => n));

  return (
    <div>
      <BarreCommunes actif="espace" />

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-sm text-muted">
            <Link href="/">Accueil</Link>
            <span>›</span>
            <Link href="/communes">Communes</Link>
            <span>›</span>
            <span className="font-semibold text-foreground">Espace communal</span>
          </nav>
          <p className="text-sm font-semibold text-primary-dark">Pour les mairies</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Espace communal
          </h1>
          <p className="mt-3 max-w-prose text-muted">
            Ce que pourrait voir une mairie : les déclarations d&apos;événements
            transmises par ses administrés, sur sa seule commune.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DotPill dot="deep">Exemple fictif</DotPill>
            <DotPill dot="secondary">Lecture seule, sans connexion</DotPill>
            <DotPill dot="primary">Document non officiel</DotPill>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <p className="rounded-xl bg-deep px-5 py-3.5 text-sm font-semibold text-on-deep">
          Exemple fictif&nbsp;: ces données sont inventées, aucune donnée réelle
          n&apos;est affichée.
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Déclarations transmises", valeur: String(lignes.length) },
            { label: "Public attendu, au total", valeur: `${jaugeTotale.toLocaleString("fr-FR")} personnes` },
            { label: "Entrée payante", valeur: `${lignes.filter((l) => l.payante).length} sur ${lignes.length}` },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                {c.label}
              </dt>
              <dd className="mt-1 text-2xl font-extrabold tabular-nums text-foreground">
                {c.valeur}
              </dd>
            </div>
          ))}
        </dl>

        <section className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="text-lg font-extrabold text-foreground">
            Répartition par type de spectacle
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {parType.map(([type, n]) => (
              <li key={type} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-foreground">{type}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(n / max) * 100}%` }}
                  />
                </span>
                <span className="w-6 shrink-0 text-right font-bold tabular-nums text-foreground">
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-extrabold text-foreground">
            Déclarations transmises
          </h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-background text-xs font-semibold uppercase tracking-wide text-muted">
                <tr>
                  <th scope="col" className="px-4 py-3">Référence</th>
                  <th scope="col" className="px-4 py-3">Date de l&apos;événement</th>
                  <th scope="col" className="px-4 py-3">Type</th>
                  <th scope="col" className="px-4 py-3">Lieu</th>
                  <th scope="col" className="px-4 py-3 text-right">Jauge</th>
                  <th scope="col" className="px-4 py-3">Entrée</th>
                  <th scope="col" className="px-4 py-3">Transmis le</th>
                </tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.reference} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 font-semibold tabular-nums text-foreground">{l.reference}</td>
                    <td className="px-4 py-3 text-foreground">{formater(l.date)}</td>
                    <td className="px-4 py-3 text-foreground">{l.type}</td>
                    <td className="px-4 py-3 text-foreground">{l.lieu}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{l.jauge}</td>
                    <td className="px-4 py-3 text-foreground">{l.payante ? "Payante" : "Libre"}</td>
                    <td className="px-4 py-3 text-muted">{formater(l.transmisLe)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            Les coordonnées personnelles des organisateurs n&apos;apparaissent
            pas dans cet aperçu.
          </p>
        </section>

        <p className="mt-8 max-w-prose text-sm leading-relaxed text-muted">
          e-Culture CI est un service d&apos;information indépendant, sans lien
          officiel avec le ministère de la Culture. La mairie reste l&apos;autorité :
          elle reçoit une information, et décide de ce qu&apos;elle en fait.
          L&apos;Espace communal réel est ouvert à chaque commune, derrière une
          connexion, à la signature de la convention.
        </p>
      </div>
    </div>
  );
}
