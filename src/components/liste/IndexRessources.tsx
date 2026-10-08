"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pastilles } from "@/components/ui/Pastilles";
import { mesure } from "@/lib/mesure";
import {
  ETIQUETTES,
  RESSOURCES,
  TYPES,
  type EtiquetteRessource,
} from "@/lib/ressources-registre";

// Index de toutes les ressources : recherche, filtres en pastilles avec compteurs, cartes.
// Tout se passe dans le navigateur : rien n'est envoyé ni enregistré.

const ORDRE: EtiquetteRessource[] = ["comprendre", "projet", "droits", "fiscalite", "reglementation"];

// Comparaison sans accents ni majuscules : « fiscalite » trouve « Fiscalité ».
function normaliser(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function IndexRessources() {
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState<"tout" | EtiquetteRessource>("tout");

  const terme = normaliser(recherche.trim());
  const correspondRecherche = (r: (typeof RESSOURCES)[number]) =>
    terme === "" ||
    normaliser(
      `${r.titre} ${r.description} ${r.etiquettes.map((e) => ETIQUETTES[e]).join(" ")} ${(r.motsCles ?? []).join(" ")}`,
    ).includes(terme);

  // Les compteurs tiennent compte de la recherche, pour ne jamais promettre des résultats absents.
  const dansRecherche = useMemo(() => RESSOURCES.filter(correspondRecherche), [terme]); // eslint-disable-line react-hooks/exhaustive-deps
  const visibles = dansRecherche.filter((r) => filtre === "tout" || r.etiquettes.includes(filtre));

  const pastilles = [
    { id: "tout", label: "Tout", compteur: dansRecherche.length },
    ...ORDRE.map((e) => ({
      id: e,
      label: ETIQUETTES[e],
      compteur: dansRecherche.filter((r) => r.etiquettes.includes(e)).length,
    })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="relative lg:w-[360px] lg:shrink-0">
          <label htmlFor="recherche-ressources" className="sr-only">
            Rechercher une ressource
          </label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            id="recherche-ressources"
            type="search"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            onBlur={() => recherche.trim() && mesure("recherche_ressources", { resultats: visibles.length })}
            placeholder="Rechercher : licence, cachet, budget…"
            autoComplete="off"
            className="min-h-[48px] w-full rounded-xl border border-border-strong bg-surface pl-11 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted focus:border-secondary"
          />
        </div>
        <div className="flex-1">
          <Pastilles
            libelle="Filtrer par thème"
            pastilles={pastilles}
            actif={filtre}
            onChoisir={(id) => setFiltre(id as "tout" | EtiquetteRessource)}
          />
        </div>
      </div>

      <p role="status" className="mt-6 text-sm text-muted">
        {visibles.length} {visibles.length > 1 ? "contenus" : "contenu"}
      </p>

      {visibles.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border-strong px-5 py-8 text-center text-muted">
          Aucun contenu ne correspond. Essayez un autre mot, ou choisissez « Tout ».
        </p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((r) => {
            const t = TYPES[r.type];
            return (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="flex h-full flex-col gap-2.5 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                      {ETIQUETTES[r.etiquettes[0]]}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${
                        r.type === "outil" ? "bg-primary-light text-primary-dark" : "bg-surface-2 text-muted"
                      }`}
                    >
                      {t.libelle}
                    </span>
                  </span>
                  <span className="text-xl font-extrabold leading-snug tracking-tight text-foreground">{r.titre}</span>
                  <span className="flex-1 text-sm leading-relaxed text-muted">{r.description}</span>
                  <span className="text-sm font-bold text-primary-dark">{t.action}&nbsp;→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
