"use client";

import { useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { OptionCard } from "@/components/questionnaire/OptionCard";
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import { QUESTIONS, getResultat, Reponses } from "./config";

const TOTAL_STEPS = 3;

export function Questionnaire() {
  const [step, setStep] = useState(0);
  const [reponses, setReponses] = useState<Partial<Reponses>>({});
  const [choix, setChoix] = useState<string | null>(null);
  const [estResultat, setEstResultat] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function recentrer() {
    const el = cardRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 90;
    const doux = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: doux ? "smooth" : "auto" });
  }

  function suivant() {
    if (choix === null) return;
    const cle = QUESTIONS[step].cle;
    const next = { ...reponses, [cle]: choix };
    setReponses(next);

    // Raccourci : une fréquence occasionnelle donne directement le résultat,
    // sans poser les questions de rôle/forme (comme dans le prototype).
    if (step === 0 && choix === "occasionnelle") {
      setEstResultat(true);
    } else if (step === TOTAL_STEPS - 1) {
      setEstResultat(true);
    } else {
      const suivantStep = step + 1;
      setStep(suivantStep);
      setChoix((next as Partial<Reponses>)[QUESTIONS[suivantStep].cle] ?? null);
    }
    requestAnimationFrame(recentrer);
  }

  function goBack() {
    if (estResultat) {
      const e = reponses.frequence === "occasionnelle" ? 0 : TOTAL_STEPS - 1;
      setEstResultat(false);
      setStep(e);
      setChoix((reponses as Partial<Reponses>)[QUESTIONS[e].cle] ?? null);
    } else {
      const prec = Math.max(0, step - 1);
      setStep(prec);
      setChoix((reponses as Partial<Reponses>)[QUESTIONS[prec].cle] ?? null);
    }
    requestAnimationFrame(recentrer);
  }

  function recommencer() {
    setReponses({});
    setChoix(null);
    setStep(0);
    setEstResultat(false);
    requestAnimationFrame(recentrer);
  }

  const labelContinuer =
    step === TOTAL_STEPS - 1 || choix === "occasionnelle"
      ? "Voir mon résultat"
      : "Continuer";

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      {!estResultat && (
        <div>
          <div className="mb-2.5 flex items-baseline justify-end gap-3">
            <span className="text-sm text-muted">Une minute environ</span>
          </div>
          <ProgressBar step={step} total={TOTAL_STEPS} label="Étape" />
          <div className="mt-6">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {QUESTIONS[step].titre}
            </h2>
            <p className="mt-2 max-w-prose text-sm text-muted">
              {QUESTIONS[step].aide}
            </p>
            <div
              role="radiogroup"
              aria-label={QUESTIONS[step].titre}
              className="mt-5 flex flex-col gap-3"
            >
              {QUESTIONS[step].options.map((opt) => (
                <OptionCard
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  selected={choix === opt.value}
                  onClick={() => setChoix(opt.value)}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={suivant}
              disabled={choix === null}
              className="min-h-[52px] rounded-lg bg-primary-dark px-6 py-3.5 text-base font-semibold text-white transition-colors hover:brightness-90 disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-muted"
            >
              {labelContinuer}
            </button>
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="text-sm font-medium text-muted hover:text-primary-dark"
              >
                ← Retour
              </button>
            )}
          </div>
        </div>
      )}

      <div aria-live="polite">
        {estResultat && (
          <Resultat reponses={reponses as Reponses} onRestart={recommencer} />
        )}
      </div>
    </div>
  );
}

function Resultat({
  reponses,
  onRestart,
}: {
  reponses: Reponses;
  onRestart: () => void;
}) {
  const res = getResultat(reponses);
  const resume = [
    QUESTIONS[0].options.find((o) => o.value === reponses.frequence)?.label,
    QUESTIONS[1].options.find((o) => o.value === reponses.role)?.label,
    QUESTIONS[2].options.find((o) => o.value === reponses.forme)?.label,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div>
      <div
        className={`rounded-2xl p-6 ${
          res.ton === "vert" ? "bg-secondary" : "bg-deep-strong"
        } text-on-deep`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-accent-on-deep">
          {res.surtitre}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
          {res.titre}
        </h2>
        <p className="mt-3 max-w-prose text-on-deep-muted">{res.chapeau}</p>
      </div>

      {res.aCategorie && (
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <div className="border-b border-border bg-background px-5 py-3 text-sm font-extrabold text-foreground">
            {res.categorieTitre}
          </div>
          {res.faits.map((f) => (
            <div
              key={f.label}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border px-5 py-3 last:border-b-0"
            >
              <span className="text-sm text-muted">{f.label}</span>
              <span className="text-sm font-bold text-foreground">
                {f.valeur}
              </span>
            </div>
          ))}
          <p className="bg-surface px-5 py-3 text-sm text-muted">
            Selon les informations publiques disponibles, à confirmer auprès
            du ministère.
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-extrabold text-foreground">
          {res.preparerTitre}
        </h3>
        <ul className="mt-3 flex flex-col gap-2.5">
          {res.preparer.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
              <span
                aria-hidden="true"
                className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-primary"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {res.notes.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {res.notes.map((n) => (
            <Card key={n.titre} className="border-l-4 border-l-primary p-4">
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary-dark">
                {n.titre}
              </p>
              <p className="mt-1 text-sm text-foreground">{n.texte}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-extrabold text-foreground">
          Pour aller plus loin
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {res.liens.map((lien) => (
            <LinkButton
              key={lien.href}
              href={lien.href}
              variant="outline"
              className="!flex-col !items-start !gap-0.5 text-left"
            >
              <span className="block text-sm font-bold text-foreground">
                {lien.label}
              </span>
              <span className="block text-xs font-normal text-muted">
                {lien.aide}
              </span>
            </LinkButton>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-deep px-5 py-4 text-on-deep">
        <p className="text-xs font-bold uppercase tracking-wide text-accent-on-deep">
          Important
        </p>
        <p className="mt-1.5 text-sm text-on-deep-muted">
          Ce résultat est une orientation, pas une décision officielle.
          e-Culture CI ne délivre aucune licence et n&apos;a pas de lien
          officiel avec le ministère. La composition du dossier est à
          demander à la Direction des affaires juridiques du ministère.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-bold text-foreground hover:bg-black/5"
        >
          ↻ Recommencer
        </button>
        <p className="text-sm text-muted">Vos réponses : {resume}</p>
      </div>
    </div>
  );
}
