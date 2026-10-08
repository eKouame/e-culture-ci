"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Pastilles } from "@/components/ui/Pastilles";
import { CATEGORIES_FAQ, FAQ, type CategorieFaq } from "@/lib/faq-config";
import { mesure } from "@/lib/mesure";

// Questions fréquentes : filtres en pastilles et questions en accordéon (une seule ouverte
// à la fois, la première au départ). Rien n'est envoyé : tout se passe dans le navigateur.
export function FaqListe() {
  const base = useId();
  const [filtre, setFiltre] = useState<"toutes" | CategorieFaq>("toutes");
  const [ouverte, setOuverte] = useState<string | null>(FAQ[0].id);

  const visibles = FAQ.filter((q) => filtre === "toutes" || q.categorie === filtre);
  const libelle = (id: CategorieFaq) => CATEGORIES_FAQ.find((c) => c.id === id)?.label ?? id;

  const pastilles = [
    { id: "toutes", label: "Toutes", compteur: FAQ.length },
    ...CATEGORIES_FAQ.map((c) => ({
      id: c.id,
      label: c.label,
      compteur: FAQ.filter((q) => q.categorie === c.id).length,
    })),
  ];

  function basculer(id: string) {
    const ouvre = ouverte !== id;
    setOuverte(ouvre ? id : null);
    if (ouvre) mesure("faq_ouverte", { question: id });
  }

  return (
    <div>
      <Pastilles
        libelle="Filtrer par thème"
        pastilles={pastilles}
        actif={filtre}
        onChoisir={(id) => {
          setFiltre(id as "toutes" | CategorieFaq);
          // La question ouverte reste ouverte si elle est encore visible, sinon la première.
          const encore = FAQ.filter((q) => id === "toutes" || q.categorie === id);
          if (!encore.some((q) => q.id === ouverte)) setOuverte(encore[0]?.id ?? null);
        }}
      />

      <ul className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        {visibles.map((q, i) => {
          const ouvert = ouverte === q.id;
          const idPanneau = `${base}-${q.id}`;
          return (
            <li key={q.id} className={i < visibles.length - 1 ? "border-b border-border" : ""}>
              <h2>
                <button
                  type="button"
                  aria-expanded={ouvert}
                  aria-controls={idPanneau}
                  onClick={() => basculer(q.id)}
                  className="flex min-h-[64px] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                      {libelle(q.categorie)}
                    </span>
                    <span className="mt-1 block text-lg font-extrabold leading-snug tracking-tight text-foreground">
                      {q.q}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors ${
                      ouvert ? "bg-hero-accent text-white" : "bg-surface-2 text-foreground"
                    }`}
                  >
                    {ouvert ? "×" : "+"}
                  </span>
                </button>
              </h2>
              <div id={idPanneau} hidden={!ouvert} className="px-5 pb-5">
                <p className="max-w-[720px] text-base leading-[1.7] text-foreground">{q.a}</p>
                {q.lien && (
                  <Link
                    href={q.lien.href}
                    onClick={() => mesure("faq_lien_clique", { question: q.id })}
                    className="mt-3 inline-flex min-h-[44px] items-center text-sm font-bold text-primary-dark underline underline-offset-2"
                  >
                    {q.lien.label}&nbsp;→
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
