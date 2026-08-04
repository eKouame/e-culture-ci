"use client";

import { useState } from "react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { NextStepsNotice } from "@/components/ui/NextStepsNotice";
import { OptionCard } from "@/components/questionnaire/OptionCard";
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import {
  QUESTION_FREQUENCE,
  QUESTION_FINALITE,
  QUESTION_STRUCTURE,
  QUESTION_JAUGE,
  JAUGE_TO_ESTIMATE,
} from "./questions";
import {
  getOrientation,
  ReponsesQuestionnaire,
  StatutOrientation,
} from "@/lib/questionnaire-logic";

const TOTAL_STEPS = 4;

export function Questionnaire() {
  const [step, setStep] = useState(0);
  const [reponses, setReponses] = useState<Partial<ReponsesQuestionnaire>>({});

  function answer<K extends keyof ReponsesQuestionnaire>(
    key: K,
    value: ReponsesQuestionnaire[K],
  ) {
    setReponses((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (step >= TOTAL_STEPS) {
    return <Resultat reponses={reponses as ReponsesQuestionnaire} onRestart={() => {
      setReponses({});
      setStep(0);
    }} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      {step === 0 && (
        <Step
          title={QUESTION_FREQUENCE.title}
          options={QUESTION_FREQUENCE.options}
          onSelect={(v) => answer("frequence", v)}
        />
      )}
      {step === 1 && (
        <Step
          title={QUESTION_FINALITE.title}
          options={QUESTION_FINALITE.options}
          onSelect={(v) => answer("finalite", v)}
        />
      )}
      {step === 2 && (
        <Step
          title={QUESTION_STRUCTURE.title}
          options={QUESTION_STRUCTURE.options}
          onSelect={(v) => answer("structure", v)}
        />
      )}
      {step === 3 && (
        <Step
          title={QUESTION_JAUGE.title}
          options={QUESTION_JAUGE.options}
          onSelect={(v) => answer("jauge", v)}
        />
      )}

      {step > 0 && (
        <button
          type="button"
          onClick={goBack}
          className="self-start text-sm font-medium text-muted hover:text-primary"
        >
          ← Question précédente
        </button>
      )}
    </div>
  );
}

function Step<T extends string>({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: { value: T; label: string; description?: string }[];
  onSelect: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            onClick={() => onSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}

function Resultat({
  reponses,
  onRestart,
}: {
  reponses: ReponsesQuestionnaire;
  onRestart: () => void;
}) {
  const statut: StatutOrientation = getOrientation(reponses);
  const jaugeEstimee = JAUGE_TO_ESTIMATE[reponses.jauge];
  const declarationHref = `/declaration?jauge=${jaugeEstimee}&orientation=${statut}`;

  if (statut === "EXEMPTE") {
    return (
      <>
        <Card className="border-secondary/30 bg-secondary-light">
        <span className="text-3xl">✅</span>
        <h2 className="mt-2 text-xl font-extrabold text-secondary-dark">
          Bonne nouvelle : vous êtes exempté(e)
        </h2>
        <p className="mt-2 text-sm text-foreground">
          D&apos;après vos réponses, votre activité relève des événements
          occasionnels à but socio-éducatif, sportif, philanthropique ou de
          promotion culturelle. Vous n&apos;avez ni licence
          (5 000 000 FCFA) ni caution bancaire (5 000 000 FCFA) à payer.
        </p>
        <p className="mt-2 text-sm text-foreground">
          Il vous suffit de préparer une <strong>déclaration gratuite</strong>{" "}
          de votre événement et d&apos;obtenir un récapitulatif clair à
          conserver pour effectuer votre déclaration officielle.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <LinkButton href={declarationHref} size="lg">
            Préparer ma déclaration →
          </LinkButton>
          <button
            type="button"
            onClick={onRestart}
            className="text-sm font-medium text-muted hover:text-primary"
          >
            Recommencer le test
          </button>
        </div>
        <p className="mt-4 text-xs text-muted">
          Ce résultat est indicatif et ne constitue pas une décision
          administrative. Voir la{" "}
          <Link href="/ressources/faq" className="underline">
            FAQ complète
          </Link>
          .
        </p>
      </Card>
      <NextStepsNotice leadIn="Votre orientation est prête." />
      </>
    );
  }

  return (
    <>
    <Card className="border-primary/30 bg-primary-light">
      <span className="text-3xl">🎫</span>
      <h2 className="mt-2 text-xl font-extrabold text-primary-dark">
        Vous relevez du régime des acteurs professionnels
      </h2>
      <p className="mt-2 text-sm text-foreground">
        D&apos;après vos réponses, vous devez obtenir une licence
        (5 000 000 FCFA) et constituer une caution bancaire
        (5 000 000 FCFA), conformément à l&apos;article 10 du décret de
        2021.
      </p>
      <p className="mt-2 text-sm text-foreground">
        Si vous démarrez votre activité, vous pouvez d&apos;abord vous faire
        accompagner par un professionnel agréé (parrainage — 5 spectacles
        supervisés) avant d&apos;opérer en autonomie.
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <LinkButton href="/immatriculation" size="lg">
          Préparer mon dossier
        </LinkButton>
        <LinkButton href="/ressources/mentorat" variant="outline" size="lg">
          Trouver un mentor
        </LinkButton>
      </div>
      <button
        type="button"
        onClick={onRestart}
        className="mt-3 text-sm font-medium text-muted hover:text-primary"
      >
        Recommencer le test
      </button>
      <p className="mt-4 text-xs text-muted">
        Ce résultat est indicatif et ne constitue pas une décision
        administrative. Voir la{" "}
        <Link href="/ressources/faq" className="underline">
          FAQ complète
        </Link>
        .
      </p>
    </Card>
      <NextStepsNotice leadIn="Votre orientation est prête." />
      </>
  );
}
