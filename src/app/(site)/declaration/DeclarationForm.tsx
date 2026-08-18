"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  declarationSchema,
  DeclarationInput,
} from "@/lib/validation/declaration.schema";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/questionnaire/ProgressBar";
import { REGIONS_CI } from "@/lib/regions";
import { TYPE_SPECTACLE_LABELS } from "@/lib/labels";

const typeSpectacleOptions = Object.entries(TYPE_SPECTACLE_LABELS).map(
  ([value, label]) => ({ value, label }),
);
const regionOptions = REGIONS_CI.map((r) => ({ value: r, label: r }));

const STEPS: { title: string; fields: (keyof DeclarationInput)[] }[] = [
  {
    title: "Organisateur",
    fields: [
      "organisateurNom",
      "organisateurPrenom",
      "organisateurTelephone",
      "organisateurEmail",
      "organisateurStructure",
    ],
  },
  {
    title: "Événement",
    fields: [
      "titreEvenement",
      "typeSpectacle",
      "typeSpectacleAutre",
      "dateEvenement",
    ],
  },
  {
    title: "Lieu & public",
    fields: ["region", "commune", "lieu", "jaugeEstimee", "entreePayante"],
  },
];

export function DeclarationForm({
  defaultJauge,
  defaultOrientation,
}: {
  defaultJauge?: number;
  defaultOrientation?: "EXEMPTE" | "PROFESSIONNEL";
}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(declarationSchema),
    defaultValues: {
      entreePayante: false,
      jaugeEstimee: defaultJauge,
      statutOrientation: defaultOrientation,
    },
  });

  const typeSpectacle = watch("typeSpectacle");
  const isLastStep = step === STEPS.length - 1;

  async function goNext() {
    const valid = await trigger(STEPS[step].fields);
    if (valid) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(data: DeclarationInput) {
    setSubmitError(null);
    const res = await fetch("/api/declarations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setSubmitError("Une erreur est survenue. Veuillez réessayer.");
      return;
    }

    const json = await res.json();
    router.push(`/declaration/recapitulatif/${json.id}`);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLastStep) {
      await goNext();
      return;
    }
    handleSubmit(onSubmit)();
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
      <ProgressBar step={step} total={STEPS.length} label="Étape" />

      <div
        key={step}
        className="page-turn dog-ear ledger-lines flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
          {STEPS[step].title}
        </h2>

        {step === 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Nom"
                error={errors.organisateurNom?.message}
                {...register("organisateurNom")}
              />
              <Input
                label="Prénom (facultatif)"
                error={errors.organisateurPrenom?.message}
                {...register("organisateurPrenom")}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Téléphone"
                type="tel"
                error={errors.organisateurTelephone?.message}
                {...register("organisateurTelephone")}
              />
              <Input
                label="Email (facultatif)"
                type="email"
                error={errors.organisateurEmail?.message}
                {...register("organisateurEmail")}
              />
            </div>
            <Input
              label="Structure / association (facultatif)"
              error={errors.organisateurStructure?.message}
              {...register("organisateurStructure")}
            />
          </>
        )}

        {step === 1 && (
          <>
            <Input
              label="Titre de l'événement (facultatif)"
              error={errors.titreEvenement?.message}
              {...register("titreEvenement")}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Type de spectacle"
                placeholder="Choisissez un type"
                options={typeSpectacleOptions}
                error={errors.typeSpectacle?.message}
                {...register("typeSpectacle")}
              />
              <Input
                label="Date de l'événement"
                type="date"
                error={errors.dateEvenement?.message}
                {...register("dateEvenement")}
              />
            </div>
            {typeSpectacle === "AUTRE" && (
              <Input
                label="Précisez le type de spectacle"
                error={errors.typeSpectacleAutre?.message}
                {...register("typeSpectacleAutre")}
              />
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                label="Région"
                placeholder="Sélectionnez votre région"
                options={regionOptions}
                error={errors.region?.message}
                {...register("region")}
              />
              <Input
                label="Commune / Localité"
                error={errors.commune?.message}
                {...register("commune")}
              />
            </div>
            <Input
              label="Lieu précis (salle, place, quartier...)"
              error={errors.lieu?.message}
              {...register("lieu")}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="Jauge estimée (nombre de spectateurs)"
                type="number"
                min={1}
                error={errors.jaugeEstimee?.message}
                {...register("jaugeEstimee", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              <label className="flex items-center gap-2.5 self-end rounded-lg border border-border px-3.5 py-2.5">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-orange-600"
                  {...register("entreePayante")}
                />
                <span className="text-sm font-medium text-foreground">
                  Entrée payante
                </span>
              </label>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        {step > 0 && (
          <Button type="button" variant="outline" size="lg" onClick={goBack}>
            ← Retour
          </Button>
        )}
        <Button
          size="lg"
          disabled={isLastStep && isSubmitting}
          className="sm:ml-auto"
        >
          {isLastStep
            ? isSubmitting
              ? "Envoi en cours…"
              : "Préparer ma déclaration"
            : "Continuer →"}
        </Button>
      </div>
      {submitError && (
        <p className="text-sm font-medium text-danger">{submitError}</p>
      )}
    </form>
  );
}
