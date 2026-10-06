"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { OptionCard } from "@/components/questionnaire/OptionCard";
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import { appareil, mesure } from "@/lib/mesure";
import {
  PARCOURS,
  feuilleDeRoute,
  orientation,
  texteCopie,
  type ParcoursId,
  type Reponses,
} from "@/lib/parcours-config";

const PHRASE_RIEN_ENREGISTRE = "Rien n'est enregistré. Vos réponses restent sur cet écran.";
const NOTE_INDEPENDANCE =
  "Information indicative et non officielle. Confirmez chaque point auprès de l'interlocuteur indiqué.";

const etiquetteStyle: Record<string, string> = {
  "À vérifier": "bg-primary-light text-primary-dark",
  "D'abord": "bg-secondary-light text-secondary-dark",
  "Si musique": "bg-secondary-light text-secondary-dark",
  Outil: "bg-secondary-light text-secondary-dark",
  "Selon votre rôle": "bg-secondary-light text-secondary-dark",
};

// Un parcours, une question par écran. Tout reste dans l'état de la page : aucune
// donnée n'est envoyée, enregistrée ni stockée (ni compte, ni cookie).
export function Parcours({ parcours }: { parcours: ParcoursId }) {
  const def = PARCOURS[parcours];
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Reponses>({});
  const [choix, setChoix] = useState<string | null>(null);
  const [fini, setFini] = useState(false);
  const [faites, setFaites] = useState<Record<string, boolean>>({});
  const [messageCopie, setMessageCopie] = useState<string | null>(null);
  const cadreRef = useRef<HTMLDivElement>(null);

  function recentrer() {
    requestAnimationFrame(() => {
      const el = cadreRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      const doux = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: doux ? "smooth" : "auto" });
    });
  }

  const question = def.questions[etape];

  function suivant() {
    if (choix === null) return;
    const nouvelles = { ...reponses, [question.cle]: choix };
    setReponses(nouvelles);
    if (etape === def.questions.length - 1) {
      mesure("parcours_termine", { parcours, appareil: appareil() });
      setFini(true);
    } else {
      const prochaine = def.questions[etape + 1];
      setEtape(etape + 1);
      setChoix(nouvelles[prochaine.cle] ?? null);
    }
    recentrer();
  }

  function retour() {
    if (fini) {
      const derniere = def.questions.length - 1;
      setFini(false);
      setEtape(derniere);
      setChoix(reponses[def.questions[derniere].cle] ?? null);
    } else {
      const precedente = Math.max(0, etape - 1);
      setEtape(precedente);
      setChoix(reponses[def.questions[precedente].cle] ?? null);
    }
    recentrer();
  }

  function recommencer() {
    setReponses({});
    setChoix(null);
    setFaites({});
    setMessageCopie(null);
    setEtape(0);
    setFini(false);
    recentrer();
  }

  async function copier(texte: string) {
    mesure("feuille_copiee", { appareil: appareil() });
    try {
      await navigator.clipboard.writeText(texte);
      setMessageCopie("Feuille de route copiée.");
    } catch {
      setMessageCopie("Copie impossible : sélectionnez le texte à la main.");
    }
  }

  const pastilles = def.questions
    .map((q) => reponses[q.cle])
    .filter(Boolean)
    .map((v) => (
      <span
        key={v}
        className="rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold text-secondary-dark"
      >
        {v}
      </span>
    ));

  return (
    <div
      ref={cadreRef}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      {!fini && (
        <div>
          <ProgressBar step={etape} total={def.questions.length} label="Question" />
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-primary-dark">
            {def.titre} · question {etape + 1} sur {def.questions.length}
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
            {question.titre}
          </h2>
          <div
            role="radiogroup"
            aria-label={question.titre}
            className="mt-5 flex max-w-[560px] flex-col gap-3"
          >
            {question.choix.map((c) => (
              <OptionCard
                key={c.label}
                label={c.label}
                description={c.description}
                selected={choix === c.label}
                onClick={() => setChoix(c.label)}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={suivant}
              disabled={choix === null}
              className="min-h-[52px] rounded-lg bg-primary-dark px-6 py-3.5 text-base font-semibold text-white transition-colors hover:brightness-90 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-muted"
            >
              {etape === def.questions.length - 1 ? "Voir le résultat" : "Continuer"}
            </button>
            {etape > 0 ? (
              <button
                type="button"
                onClick={retour}
                className="min-h-[44px] text-sm font-medium text-muted hover:text-primary-dark"
              >
                ← Question précédente
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-muted hover:text-primary-dark"
              >
                ← Accueil
              </Link>
            )}
          </div>
          <p className="mt-5 text-sm text-muted">{PHRASE_RIEN_ENREGISTRE}</p>
        </div>
      )}

      <div aria-live="polite">
        {fini && parcours === "idee" && (
          <ResultatIdee
            pastilles={pastilles}
            reponses={reponses}
            onRetour={retour}
            onRecommencer={recommencer}
          />
        )}
        {fini && parcours === "evenement" && (
          <ResultatEvenement
            pastilles={pastilles}
            reponses={reponses}
            faites={faites}
            onCocher={(id, v) => setFaites((f) => ({ ...f, [id]: v }))}
            onCopier={copier}
            messageCopie={messageCopie}
            onRetour={retour}
            onRecommencer={recommencer}
          />
        )}
      </div>
    </div>
  );
}

function ResultatIdee({
  pastilles,
  reponses,
  onRetour,
  onRecommencer,
}: {
  pastilles: React.ReactNode;
  reponses: Reponses;
  onRetour: () => void;
  onRecommencer: () => void;
}) {
  const o = orientation(reponses);
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
        Voici par où commencer
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">{pastilles}</div>

      <div className="mt-5 rounded-xl border border-border bg-background p-5">
        <h3 className="text-lg font-extrabold text-foreground">Trois choses à fixer d&apos;abord</h3>
        <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground">
          {o.afixer.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-primary" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background p-5">
        <h3 className="text-lg font-extrabold text-foreground">Ce qui vous attend</h3>
        <p className="mt-2 text-sm text-foreground">{o.attend}</p>
        <p className="mt-2 text-sm text-muted">{o.note}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/parcours/evenement"
          onClick={() => mesure("porte_cliquee", { porte: "evenement", depuis: "orientation", appareil: appareil() })}
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary-dark px-6 py-3.5 text-base font-semibold text-white transition-colors hover:brightness-90"
        >
          J&apos;ai déjà un lieu et une date : préparer mon événement
        </Link>
        <Link
          href="/outils/budget"
          onClick={() => mesure("outil_clique", { depuis: "parcours-idee", outil: "budget", emplacement: "appel", appareil: appareil() })}
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-primary px-6 py-3.5 text-base font-semibold text-primary-dark transition-colors hover:bg-primary-light"
        >
          Estimer mon budget
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onRetour}
          className="min-h-[44px] text-sm font-medium text-muted hover:text-primary-dark"
        >
          ← Modifier ma dernière réponse
        </button>
        <button
          type="button"
          onClick={onRecommencer}
          className="min-h-[44px] text-sm font-medium text-muted hover:text-primary-dark"
        >
          ↻ Recommencer
        </button>
      </div>
      <p className="mt-4 text-sm text-muted">{PHRASE_RIEN_ENREGISTRE}</p>
    </div>
  );
}

function ResultatEvenement({
  pastilles,
  reponses,
  faites,
  onCocher,
  onCopier,
  messageCopie,
  onRetour,
  onRecommencer,
}: {
  pastilles: React.ReactNode;
  reponses: Reponses;
  faites: Record<string, boolean>;
  onCocher: (id: string, valeur: boolean) => void;
  onCopier: (texte: string) => void;
  messageCopie: string | null;
  onRetour: () => void;
  onRecommencer: () => void;
}) {
  const etapes = feuilleDeRoute(reponses);
  const nbFaites = etapes.filter((e) => faites[e.id]).length;

  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
        Votre feuille de route
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">{pastilles}</div>
      <p className="mt-4 text-sm text-muted">
        {nbFaites} étape(s) faite(s) sur {etapes.length}. Cochez au fil de l&apos;eau : rien
        n&apos;est enregistré, copiez la liste pour la garder.
      </p>

      <ol className="mt-4 flex flex-col gap-3">
        {etapes.map((e) => (
          <li
            key={e.id}
            className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-border bg-background p-4"
          >
            <input
              type="checkbox"
              id={`etape-${e.id}`}
              checked={!!faites[e.id]}
              onChange={(ev) => onCocher(e.id, ev.target.checked)}
              aria-label={`Fait : ${e.titre}`}
              className="mt-1 h-[22px] w-[22px] accent-secondary"
            />
            <div className="min-w-0">
              <h3
                className={`text-base font-bold text-foreground ${
                  faites[e.id] ? "line-through opacity-60" : ""
                }`}
              >
                {e.titre}
              </h3>
              <p className="mt-1 text-sm text-muted">{e.texte}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${etiquetteStyle[e.etiquette]}`}
                >
                  {e.etiquette}
                </span>
                <span className="text-sm text-muted">Contact : {e.interlocuteur}</span>
              </p>
              {e.lien && (
                <Link
                  href={e.lien.href}
                  onClick={() =>
                    mesure("feuille_lien_clique", { etape: e.id, appareil: appareil() })
                  }
                  className="mt-3 inline-flex min-h-[44px] items-center rounded-lg border-2 border-primary px-4 py-2 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-light"
                >
                  {e.lien.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          size="lg"
          onClick={() => onCopier(texteCopie(etapes, faites))}
          className="min-h-[52px]"
        >
          Copier ma feuille de route
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={onRecommencer}
          className="min-h-[52px]"
        >
          Modifier mes réponses
        </Button>
      </div>
      {messageCopie && (
        <p role="status" className="mt-3 text-sm font-semibold text-secondary-dark">
          {messageCopie}
        </p>
      )}
      <div className="mt-4">
        <button
          type="button"
          onClick={onRetour}
          className="min-h-[44px] text-sm font-medium text-muted hover:text-primary-dark"
        >
          ← Modifier ma dernière réponse
        </button>
      </div>
      <p className="mt-4 text-sm text-muted">{NOTE_INDEPENDANCE}</p>
      <p className="mt-2 text-sm text-muted">{PHRASE_RIEN_ENREGISTRE}</p>
    </div>
  );
}
